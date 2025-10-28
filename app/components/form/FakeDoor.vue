<script setup lang="ts">
import { z } from 'zod';
import type { Offer } from '#types';
import { CONVERSION } from '#shared/config/navigation';

interface Props {
  location: string;
  offer: Offer;
}

const props = defineProps<Props>();

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  offerId: z.string().optional(),
});

const state = reactive({
  email: '',
  offerId: props.offer.id,
});

const { submit, submitFeedback, isSubmitting, isSuccess, recordId } =
  useFormSubmission({
    formId: 'fake_door',
    schema,
  });

const handleSubmit = async () => {
  await submit(state);
};

const feedbackSubmitted = ref(false);

const handleFeedbackSubmit = async (feedback: string) => {
  await submitFeedback(feedback);
  feedbackSubmitted.value = true;
};

const shouldShowFeedback = computed(() => {
  return (
    isSuccess.value &&
    !feedbackSubmitted.value &&
    CONVERSION.fakeDoor.collectFeedback &&
    !!recordId.value
  );
});

// DEBUG: Watch for changes
watch([isSuccess, recordId], ([success, id]) => {
  console.log('[FakeDoor] State changed:', {
    isSuccess: success,
    recordId: id,
  });
});
</script>

<template>
  <div class="w-full">
    <!-- Email Capture Form -->
    <div v-if="!isSuccess" class="space-y-3">
      <UForm :state="state" :schema="schema" @submit="handleSubmit">
        <div class="space-y-3 w-full">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="your@email.com"
            size="xl"
            :disabled="isSubmitting"
            class="w-full"
          />
          <UButton type="submit" size="xl" block :loading="isSubmitting">
            {{ offer.cta.label }}
          </UButton>
        </div>
      </UForm>
      <p v-if="offer.cta.note" class="text-xs text-muted text-center">
        {{ offer.cta.note }}
      </p>
    </div>

    <!-- Email Success + Optional Feedback
         Use IFormMessage to fetch success content from content/forms/fake_door-success.md
    -->
    <IFormMessage
      v-else-if="!feedbackSubmitted"
      form-id="fake-door"
      form-state="feedback"
      :celebrate="true"
    >
      <!-- Feedback form in slot. Provide successFormId so feedback can render its own content when done -->
      <IFormFeedback
        v-if="shouldShowFeedback"
        :prompt="CONVERSION.fakeDoor.feedbackPrompt"
        :on-submit="handleFeedbackSubmit"
        success-form-id="feedback"
      />
    </IFormMessage>

    <!-- Final Success (feedback already submitted) -->
    <IFormMessage v-else form-id="fake-door" :celebrate="false" />
  </div>
</template>
