```
<!-- app/components/convert/Email.vue -->
<script setup lang="ts">
import { z } from 'zod';
import { STAGE_CONFIG } from '#stage-config';
import NAVIGATION from '#shared/config/navigation';

interface Props {
  location: string;
  ctaType?: 'hero' | 'conversion';
  layout?: 'stacked' | 'horizontal';
  successRedirect?: string;
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'stacked',
  ctaType: 'conversion',
  successRedirect: '/products/template-guide-success',
});

const { currentStage } = useDevConfig();

// ✅ Get CTA config from product
const cta = computed(() => NAVIGATION.ctas[props.ctaType]);

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
      message: 'Check your email to get started.',
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

// Form submission state
const { trackEvent } = useEvents();
const route = useRoute();
const toast = useToast();
const isSubmitting = ref(false);
const isSuccess = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    const validated = schema.parse(state);

    await trackEvent({
      id: `email_capture_submit`,
      type: 'form_submitted',
      location: route.path,
      action: 'submit',
      target: 'email_capture',
      timestamp: Date.now(),
      data: {
        formId: 'email_capture',
        email: validated.email,
        currentStage: currentStage.value as StageKey,
        metadata: {
          location: props.location,
          ctaType: props.ctaType,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        },
      },
    } satisfies EventPayload);

    isSuccess.value = true;

    navigateTo(props.successRedirect);
  } catch (error) {
    console.error('[Email] Submission failed:', error);

    const errorMsg =
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.';

    toast.add({
      title: 'Submission failed',
      description: errorMsg,
      color: 'error',
    });

    await trackEvent({
      id: `email_capture_error`,
      type: 'form_error',
      location: 'form',
      action: 'submission_failed',
      target: 'email_capture',
      timestamp: Date.now(),
      data: {
        formId: 'email_capture',
      },
      error: errorMsg,
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Dynamic classes
const formClasses = computed(() =>
  props.layout === 'horizontal'
    ? 'flex flex-col sm:flex-row gap-3'
    : 'space-y-3',
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
