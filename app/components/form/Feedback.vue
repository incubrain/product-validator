<!-- components/form/Feedback.vue - FIXED -->
<script setup lang="ts">
import { z } from 'zod';

interface Props {
  prompt?: string;
  onSubmit: (feedback: string) => Promise<void>;
  minLength?: number;
  successFormId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  prompt: 'What would make this more valuable for you?',
  minLength: 10,
  successFormId: 'feedback',
});

const schema = z.object({
  feedback: z
    .string()
    .min(
      props.minLength,
      `Please provide at least ${props.minLength} characters`,
    ),
});

const state = reactive({
  feedback: '',
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const isSkipped = ref(false); // ✅ Track if skipped
const errorMessage = ref('');

const handleSubmit = async () => {
  errorMessage.value = '';

  const result = schema.safeParse(state);
  if (!result.success) {
    errorMessage.value = result.error.errors[0].message;
    return;
  }

  isSubmitting.value = true;
  try {
    await props.onSubmit(state.feedback);
    isSuccess.value = true;
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    errorMessage.value = 'Failed to submit. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const handleSkip = () => {
  isSkipped.value = true; // ✅ Mark as skipped, not success
};
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <!-- ✅ Hide form if skipped or submitted -->
    <div v-if="!isSuccess && !isSkipped" class="space-y-4">
      <div class="space-y-2 text-left">
        <label class="text-sm font-medium">
          {{ prompt }}
        </label>
        <p v-if="errorMessage" class="text-xs text-error">
          {{ errorMessage }}
        </p>
      </div>

      <UForm :state="state" :schema="schema" @submit="handleSubmit">
        <div class="space-y-3">
          <UTextarea
            v-model="state.feedback"
            :disabled="isSubmitting"
            :rows="4"
            placeholder="Share your thoughts..."
            class="w-full"
          />

          <div class="flex gap-2">
            <UButton
              type="submit"
              size="lg"
              :disabled="isSubmitting"
              :loading="isSubmitting"
            >
              Submit Feedback
            </UButton>
            <UButton size="lg" variant="ghost" @click="handleSkip">
              Skip
            </UButton>
          </div>
        </div>
      </UForm>
    </div>

    <!-- ✅ Only show success message if actually submitted (not skipped) -->
    <IFormMessage
      v-else-if="isSuccess"
      :form-id="successFormId"
      :celebrate="false"
    />
  </div>
</template>
