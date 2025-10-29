<!-- components/form/FakeDoor.vue - UPDATED -->
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
    location: props.location,
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

    <!-- Success State -->
    <div v-else class="text-center space-y-6 py-6">
      <!-- ✅ Show feedback success after submission -->
      <IFormMessage
        v-if="feedbackSubmitted"
        form-id="feedback"
        :celebrate="false"
      />

      <!-- ✅ Show initial success + optional feedback form -->
      <template v-else>
        <IFormMessage form-id="fake-door" :celebrate="true" />
        <IFormFeedback
          v-if="shouldShowFeedback"
          :prompt="CONVERSION.fakeDoor.feedbackPrompt"
          :on-submit="handleFeedbackSubmit"
          success-form-id="feedback"
        />
      </template>
    </div>
  </div>
</template>
