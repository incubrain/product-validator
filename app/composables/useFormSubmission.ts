// composables/useFormSubmission.ts
import { z } from 'zod';

export const useFormSubmission = <T extends z.ZodSchema>(options: {
  formId: FormID;
  schema: T;
  location?: string;
  metadata?: Record<string, any>;
}) => {
  const { trackEvent } = useEvents();
  const route = useRoute();
  const toast = useToast();
  const { currentStage } = useDevTools();

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
        type: 'form_submitted',
        location: route.path,
        action: 'submit',
        target: options.formId,
        timestamp: Date.now(),
        data: {
          formId: options.formId,
          email: validated.email,
          offerId: formData.offerId || options.metadata?.offerId || options.formId,
          customerStage: options.metadata?.customerStage || 'email_captured',
          currentStage: currentStage.value as StageKey,
          metadata: {
            location: route.path,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
            ...options.metadata,
            ...validated,
          },
        },
      } satisfies EventPayload);

      if (response?.recordId) {
        recordId.value = response.recordId;
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

  const updateRecord = async (updates: Record<string, any>) => {
    if (!recordId.value) {
      console.error('[useFormSubmission] No recordId for update');
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
        id: `${options.formId}_update`,
        type: 'form_submitted',
        location: route.path,
        action: 'update_record',
        target: options.formId,
        timestamp: Date.now(),
        data: {
          formId: options.formId,
          recordId: recordId.value,
          ...updates,
          metadata: {
            location: route.path,
            timestamp: Date.now(),
            ...updates.metadata,
          },
        },
      } satisfies EventPayload);

      toast.add({
        title: 'Updated successfully!',
        color: 'success',
      });
    } catch (error) {
      console.error('[useFormSubmission] Failed to update record:', error);
      toast.add({
        title: 'Update failed',
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
    updateRecord,
    reset,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    recordId,
  };
};
