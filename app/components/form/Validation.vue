<!-- app/components/form/Validation.vue -->
<script setup lang="ts">
import { z } from 'zod';
import type { Offer, CtaName } from '#types';
import { STAGE_CONFIG } from '#stage-config';

interface Props {
  location: string;
  offer: Offer;
  layout?: 'stacked' | 'horizontal';
  ctaName?: CtaName;
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'stacked',
  ctaName: 'funnel',
});

const { currentStage } = useDevTools();
const { isAvailable } = useOfferStock(props.offer.stock, props.offer.slug);

// Determine offer state
const offerState = computed<'available' | 'coming_soon' | 'unavailable'>(() => {
  if (!isAvailable.value) return 'unavailable';
  
  const target = STAGE_CONFIG.conversionTarget[currentStage.value as StageKey];
  if (target === 'waitlist') return 'coming_soon';
  
  return 'available';
});

// Determine form type
const formType = computed<'waitlist'>(() => {
  return 'waitlist';
});

// ✅ Get CTA config from offer
const cta = computed(() => {
  if (!props.offer.ctas) return null;
  return props.offer.ctas[props.ctaName];
});

// Messaging type
type MessagingType = {
  badge?: {
    label: string;
    color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
    variant: 'solid' | 'outline' | 'subtle' | 'soft';
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  };
  description?: string;
  cta: {
    label: string;
    icon: string;
  };
  success?: {
    title: string;
    message: string;
  };
  note?: string;
};

// Get messaging
// app/components/form/Validation.vue - Replace messaging computed
const messaging = computed<MessagingType | null>(() => {
  if (formType.value === 'waitlist') {
    const reason = offerState.value === 'unavailable' ? 'unavailable' : 'coming_soon';
    const waitlistMsg = props.offer.waitlist?.[reason];
    if (!waitlistMsg) return null;
    
    return {
      badge: waitlistMsg.badge,
      description: waitlistMsg.description,
      // ✅ Computed CTA - no longer from YAML
      cta: {
        label: reason === 'unavailable' ? 'Join Waitlist' : 'Get Early Access',
        icon: reason === 'unavailable' ? 'i-lucide-clock' : 'i-lucide-bell',
      },
      success: waitlistMsg.success,
    };
  }
  
  // Normal flow unchanged
  if (!cta.value) return null;
  return {
    cta: {
      label: cta.value.label,
      icon: cta.value.icon || 'i-lucide-mail',
    },
    note: cta.value.note,
    success: {
      title: "You're in!",
      message: "Check your email to get started.",
    },
  };
});

// Schema
const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const state = reactive({ email: '' });

// Real-time validation
const is_valid_email = computed(() => {
  try {
    schema.parse({ email: state.email });
    return true;
  } catch {
    return false;
  }
});

// Form submission
const { submit, isSubmitting, isSuccess } = useFormSubmission({
  formId: formType.value,
  schema,
  location: props.location,
  metadata: {
    reason: offerState.value,
    offerId: props.offer.slug,
    customerStage: 'interest_expressed',
  },
});

const handleSubmit = async () => {
  await submit(state);
  
  // ✅ Redirect to success page after successful submission
  if (isSuccess.value) {
    navigateTo(`/products/${props.offer.slug}-success`);
  }
};

// Dynamic classes
const isWaitlist = computed(() => formType.value === 'waitlist');
const formClasses = computed(() => 
  props.layout === 'horizontal' 
    ? 'flex flex-col sm:flex-row gap-3' 
    : 'space-y-3'
);
</script>

<template>
  <div v-if="messaging" class="w-full">
    <!-- Waitlist badge/description -->
    <div v-if="isWaitlist && messaging.badge" class="text-center space-y-2 mb-4">
      <UBadge 
        :color="messaging.badge.color" 
        :variant="messaging.badge.variant" 
        :size="messaging.badge.size"
      >
        {{ messaging.badge.label }}
      </UBadge>
      <p class="text-sm text-muted">{{ messaging.description }}</p>
    </div>
    
    <!-- Universal form -->
    <UForm ref="formRef" :state="state" :schema="schema" @submit="handleSubmit">
      <div :class="formClasses">
        <UFormField name="email">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="your@email.com"
            size="xl"
            :disabled="isSubmitting"
            :class="layout === 'horizontal' ? 'flex-1' : 'w-full'"
          />
        </UFormField>
        <UButton
          type="submit"
          size="xl"
          :block="layout === 'stacked'"
          :loading="isSubmitting"
          :disabled="state.email && (!is_valid_email || isSubmitting)"
          variant="solid"
          :color="isWaitlist ? 'neutral' : 'primary'"
          :class="['cursor-pointer disabled:cursor-not-allowed', isWaitlist ? '' : 'text-toned font-black']"
        >
          {{ messaging.cta.label }}
        </UButton>
      </div>
    </UForm>
    
    <!-- Optional note -->
    <p v-if="messaging.note" class="text-xs text-muted text-center mt-3">
      {{ messaging.note }}
    </p>
  </div>
</template>