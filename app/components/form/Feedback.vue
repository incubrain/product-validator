<!-- components/form/Feedback.vue -->
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
  successFormId: undefined,
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
const errorMessage = ref('');

const handleSubmit = async () => {
  errorMessage.value = '';

  // Validate
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
  isSuccess.value = true;
};
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Feedback Form -->
    <div v-if="!isSuccess" class="space-y-4">
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
              No thanks
            </UButton>
          </div>
        </div>
      </UForm>
    </div>

    <!-- Feedback Success -->
    <IFormMessage v-else :form-id="props.successFormId" :celebrate="false" />
  </div>
</template>
