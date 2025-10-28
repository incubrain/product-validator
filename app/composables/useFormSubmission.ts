// composables/useFormSubmission.ts
import { z } from 'zod';

// composables/useFormSubmission.ts - FIXED
export const useFormSubmission = <T extends z.ZodSchema>(options: {
  formId: FormID;
  schema: T;
  location?: string;
}) => {
  const { trackEvent } = useAction();
  const route = useRoute();
  const toast = useToast();
  const config = useRuntimeConfig().public;
  const { grantAccess } = useGatedAccess();

  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const errorMessage = ref('');
  const recordId = ref<string | null>(null);

  const submit = async (formData: z.infer<T>) => {
    isSubmitting.value = true;
    isError.value = false;
    errorMessage.value = '';

    try {
      const validated = options.schema.parse(formData);

      const response = await trackEvent({
        id: `${options.formId}_submit`,
        type: 'form_submit',
        location: route.path,
        action: 'submit',
        target: options.formId,
        timestamp: Date.now(),
        data: {
          formId: options.formId,
          email: validated.email,
          offer: formData.offerId || options.formId,
          customerStage: 'email_captured',
          validationStage: config.validationStage as ValidationStage,
          metadata: {
            location: route.path,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            ...validated,
          },
        },
      } satisfies EventPayload);

      if (response?.recordId) {
        recordId.value = response.recordId;
      }

      // ✅ For magnet form: grant access and navigate immediately
      // Skip isSuccess to bypass the success message
      if (validated.email && options.formId === 'magnet') {
        grantAccess(validated.email);

        // ✅ Only navigate if NOT from access gate
        if (options.location !== 'access-gate') {
          await navigateTo('/magnet');
          return; // Exit early, don't set isSuccess
        }

        // ✅ From access gate: Don't navigate, modal will close via watch
        // Don't set isSuccess to avoid showing success message
        return;
      }

      // ✅ For other forms: show success message
      isSuccess.value = true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        errorMessage.value = firstError.message;

        await trackEvent({
          id: `${options.formId}_error`,
          type: 'form_error',
          location: 'form',
          action: 'validation_failed',
          target: firstError.path.join('.'),
          timestamp: Date.now(),
          data: {
            formId: options.formId,
          },
          error: firstError,
        });
      } else {
        errorMessage.value =
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.';

        await trackEvent({
          id: `${options.formId}_error`,
          type: 'form_error',
          location: 'form',
          action: 'submission_failed',
          target: 'unknown',
          timestamp: Date.now(),
          data: {
            formId: options.formId,
          },
          error: errorMessage.value,
        });
      }

      isError.value = true;

      toast.add({
        title: 'Submission failed',
        description: errorMessage.value,
        color: 'error',
      });
    } finally {
      isSubmitting.value = false;
    }
  };

  const submitFeedback = async (feedback: string) => {
    if (!recordId.value) {
      console.error('[useFormSubmission] No recordId for feedback');
      toast.add({
        title: 'Error',
        description: 'Session expired. Please refresh and try again.',
        color: 'error',
      });
      return;
    }

    isSubmitting.value = true;

    try {
      await trackEvent({
        id: `${options.formId}_feedback`,
        type: 'form_submit',
        location: route.path,
        action: 'submit_feedback',
        target: options.formId,
        timestamp: Date.now(),
        data: {
          formId: options.formId,
          recordId: recordId.value,
          customerStage: 'feedback_submitted',
          feedback,
          metadata: {
            location: route.path,
            timestamp: Date.now(),
          },
        },
      } satisfies EventPayload);

      toast.add({
        title: 'Thanks for your feedback!',
        color: 'success',
      });
    } catch (error) {
      console.error('[useFormSubmission] Failed to submit feedback:', error);
      toast.add({
        title: 'Failed to submit feedback',
        description: 'Please try again or contact support.',
        color: 'error',
      });
      throw error;
    } finally {
      isSubmitting.value = false;
    }
  };

  const reset = () => {
    isSuccess.value = false;
    isError.value = false;
    errorMessage.value = '';
    recordId.value = null;
  };

  return {
    submit,
    submitFeedback,
    reset,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    recordId,
  };
};
