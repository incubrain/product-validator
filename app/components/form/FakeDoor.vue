<!-- components/form/FakeDoor.vue -->
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

const isDev = import.meta.dev;

const { submit, submitFeedback, isSubmitting, isSuccess, recordId } =
  useFormSubmission({
    formId: 'fake_door',
    schema,
  });

const handleSubmit = async () => {
  await submit(state);

  // DEBUG: Check what we got back
  console.log('[FakeDoor] After submit:', {
    isSuccess: isSuccess.value,
    recordId: recordId.value,
    collectFeedback: CONVERSION.fakeDoor.collectFeedback,
  });
};

const feedbackSubmitted = ref(false);

const handleFeedbackSubmit = async (feedback: string) => {
  await submitFeedback(feedback);
  feedbackSubmitted.value = true;
};

const shouldShowFeedback = computed(() => {
  const result =
    isSuccess.value &&
    !feedbackSubmitted.value &&
    CONVERSION.fakeDoor.collectFeedback &&
    !!recordId.value;

  // DEBUG: Log the computed result
  console.log('[FakeDoor] shouldShowFeedback:', {
    isSuccess: isSuccess.value,
    feedbackSubmitted: feedbackSubmitted.value,
    collectFeedback: CONVERSION.fakeDoor.collectFeedback,
    recordId: recordId.value,
    result,
  });

  return result;
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

    <!-- Email Success + Optional Feedback -->
    <IFormSuccess
      v-else-if="!feedbackSubmitted"
      :title="CONVERSION.fakeDoor.message"
      icon="🎉"
      message="We'll keep you updated."
      :celebrate="true"
    >
      <!-- DEBUG: Show what's happening -->
      <div v-if="isDev" class="text-xs text-muted mb-4">
        Debug: isSuccess={{ isSuccess }}, recordId={{ recordId }}, shouldShow={{
          shouldShowFeedback
        }}
      </div>

      <!-- Feedback form in slot -->
      <IFormFeedback
        v-if="shouldShowFeedback"
        :prompt="CONVERSION.fakeDoor.feedbackPrompt"
        :on-submit="handleFeedbackSubmit"
      />

      <!-- DEBUG: Show why it's not showing -->
      <div v-else-if="isDev" class="text-xs text-error">
        Feedback hidden because:
        <ul>
          <li v-if="!isSuccess">❌ Not success</li>
          <li v-if="feedbackSubmitted">❌ Already submitted</li>
          <li v-if="!CONVERSION.fakeDoor.collectFeedback">
            ❌ Collection disabled
          </li>
          <li v-if="!recordId">❌ No recordId</li>
        </ul>
      </div>
    </IFormSuccess>

    <!-- Final Success -->
    <IFormSuccess
      v-else
      title="You're all set!"
      icon="🎉"
      message="We'll be in touch soon."
      :celebrate="false"
    />
  </div>
</template>
