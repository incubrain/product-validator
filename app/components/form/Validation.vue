<script setup lang="ts">
import { z } from 'zod';
import type { Offer } from '#types';
import { STAGE_CONFIG } from '#stage-config';

interface Props {
  location: string;
  offer: Offer;
  layout?: 'stacked' | 'horizontal';
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'stacked',
});

const { currentStage } = useDevTools();
const { isAvailable } = useOfferStock(props.offer.stock, props.offer.slug);

// Determine offer state
const offerState = computed<'available' | 'coming_soon' | 'unavailable'>(() => {
  if (!isAvailable.value) return 'unavailable';
  
  // Check stage config
  const target = STAGE_CONFIG.conversionTarget[currentStage.value as StageKey];
  if (target === 'waitlist') return 'coming_soon';
  
  return 'available';
});

// Determine form type
const formType = computed<'magnet' | 'waitlist'>(() => {
  // Secondary offer (direct) doesn't use forms
  if (props.offer.slug === STAGE_CONFIG.offers.secondary) {
    return 'magnet'; // Won't render anyway
  }
  
  return offerState.value === 'available' ? 'magnet' : 'waitlist';
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

// Get messaging from offer config
const messaging = computed<MessagingType | null>(() => {
  if (formType.value === 'waitlist') {
    const reason = offerState.value === 'unavailable' ? 'unavailable' : 'coming_soon';
    const waitlistMsg = props.offer.waitlist?.[reason];
    if (!waitlistMsg) return null;
    
    return {
      badge: waitlistMsg.badge,
      description: waitlistMsg.description,
      cta: waitlistMsg.cta,
      success: waitlistMsg.success,
    };
  }
  
  // Magnet form uses offer CTA
  return {
    cta: {
      label: props.offer.cta.label,
      icon: props.offer.cta.icon || 'i-lucide-mail',
    },
    note: props.offer.cta.note || undefined,
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
    customerStage: formType.value === 'magnet' ? 'email_captured' : 'interest_expressed',
  },
});

const handleSubmit = async () => {
  await submit(state);
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
    <!-- Form -->
    <div 
      v-if="!isSuccess" 
      :class="[
        'space-y-4',
        isWaitlist && 'bg-neutral-900/50 border border-neutral-800 rounded-lg p-6'
      ]"
    >
      <!-- Waitlist badge/description -->
      <div v-if="isWaitlist && messaging.badge" class="text-center space-y-2">
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
            :disabled="!is_valid_email || isSubmitting"
            variant="solid"
            :color="isWaitlist ? 'neutral' : 'primary'"
            class="text-toned font-black cursor-pointer disabled:cursor-not-allowed"
          >
            {{ messaging.cta.label }}
          </UButton>
        </div>
      </UForm>
      
      <!-- Optional note (magnet only) -->
      <p v-if="messaging.note" class="text-xs text-muted text-center">
        {{ messaging.note }}
      </p>
    </div>
    
    <!-- Success State -->
    <div 
      v-else 
      :class="[
        'rounded-lg p-6 text-center space-y-3',
        isWaitlist 
          ? 'bg-neutral-900/50 border border-success/20' 
          : 'bg-success/10 border border-success/20'
      ]"
    >
      <UIcon 
        name="i-lucide-check-circle" 
        class="w-12 h-12 text-success mx-auto" 
      />
      <h3 v-if="messaging.success" class="text-lg font-semibold text-white">
        {{ messaging.success.title }}
      </h3>
      <p v-if="messaging.success" class="text-sm text-muted">
        {{ messaging.success.message }}
      </p>
    </div>
  </div>
</template>