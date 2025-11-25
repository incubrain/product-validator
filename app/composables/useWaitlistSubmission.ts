// NEW FILE: Dedicated waitlist submission handler
import { z } from 'zod';
import type { EventPayload } from '#shared/types/events';

export const useWaitlistSubmission = (options: {
  offerId: string;
  location: string;
}) => {
  const { trackEvent } = useEvents();
  const route = useRoute();
  const toast = useToast();

  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref('');

  const schema = z.object({
    email: z.string().email('Please enter a valid email address'),
  });

  const submit = async (formData: { email: string }) => {
    console.log('[useWaitlistSubmission] Starting submission', {
      email: formData.email,
      offerId: options.offerId,
      location: options.location,
    });

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      const validated = schema.parse(formData);

      console.log('[useWaitlistSubmission] Validated data:', validated);

      const response = await trackEvent({
        id: `waitlist_${options.offerId}_submit`,
        type: 'form_submitted',
        location: route.path,
        action: 'join_waitlist',
        target: 'waitlist',
        timestamp: Date.now(),
        data: {
          formId: 'waitlist',
          email: validated.email,
          offerId: options.offerId,
          customerStage: 'email_captured',
          metadata: {
            waitlist: true,
            offer_slug: options.offerId,
            location: options.location,
            timestamp: Date.now(),
          },
        },
      } satisfies EventPayload);

      console.log('[useWaitlistSubmission] ✅ Server response:', response);

      isSuccess.value = true;

      toast.add({
        title: "You're on the waitlist!",
        description: "We'll email you when spots open up.",
        color: 'success',
      });
    } catch (error) {
      console.error('[useWaitlistSubmission] ❌ Submission failed:', error);

      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        errorMessage.value = firstError.message;
      } else {
        errorMessage.value =
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.';
      }

      toast.add({
        title: 'Failed to join waitlist',
        description: errorMessage.value,
        color: 'error',
      });

      throw error;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    submit,
    isSubmitting,
    isSuccess,
    errorMessage,
  };
};
