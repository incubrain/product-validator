export const EVENT_METADATA: Partial<
  Record<
    TrackedEvents,
    {
      label: string;
      description: string;
      icon: string;
      category: 'form' | 'modal' | 'action' | 'other';
    }
  >
> = {
  form_submitted: {
    label: 'Form Submit',
    description: 'Server submission → Triggers feedback',
    icon: 'i-lucide-check-circle',
    category: 'form',
  },
  form_error: {
    label: 'Form Error',
    description: 'Validation failed',
    icon: 'i-lucide-alert-circle',
    category: 'form',
  },
  element_viewed: {
    label: 'Element View',
    description: 'Element viewed',
    icon: 'i-lucide-eye',
    category: 'action',
  },
} as const;
