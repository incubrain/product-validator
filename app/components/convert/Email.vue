<!-- app/components/convert/Email.vue -->
<script setup lang="ts">
import { z } from 'zod';
import type { Product, CtaName } from '#types';
import { STAGE_CONFIG } from '#stage-config';

interface Props {
  location: string;
  product: Product;
  layout?: 'stacked' | 'horizontal';
  ctaName?: CtaName;
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'stacked',
  ctaName: 'funnel',
});

const { currentStage } = useDevTools();
const { isAvailable } = useProductStock(props.product.stock, props.product.slug);

// Determine product state
const productState = computed<'available' | 'waitlist'>(() => {
  if (!isAvailable.value) return 'waitlist';
  
  const target = STAGE_CONFIG.conversionTarget[currentStage.value as StageKey];
  if (target === 'waitlist') return 'waitlist';
  
  return 'available';
});

// ✅ Get CTA config from product
const cta = computed(() => {
  if (!props.product.ctas) return null;
  return props.product.ctas[props.ctaName];
});

// Messaging type
type MessagingType = {
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
const messaging = computed<MessagingType | null>(() => {
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
  formId: 'email_capture',
  schema,
  location: props.location,
  metadata: {
    reason: productState.value,
    productId: props.product.slug,
    customerStage: 'interest_expressed',
  },
});

const handleSubmit = async () => {
  await submit(state);
  
  // ✅ Redirect to success page after successful submission
  if (isSuccess.value) {
    navigateTo(`/products/${props.product.slug}-success`);
  }
};

// Dynamic classes
const formClasses = computed(() => 
  props.layout === 'horizontal' 
    ? 'flex flex-col sm:flex-row gap-3' 
    : 'space-y-3'
);
</script>

<template>
  <div v-if="messaging" class="w-full">
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
          color="primary"
          class="cursor-pointer disabled:cursor-not-allowed text-toned font-black"
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