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
  exit_intent: {
    label: 'Exit Intent',
    description: '→ Exit modal',
    icon: 'i-lucide-log-out',
    category: 'other',
  },
  modal_open: {
    label: 'Modal Open',
    description: 'Modal opened',
    icon: 'i-lucide-window',
    category: 'modal',
  },
  modal_close: {
    label: 'Modal Close',
    description: 'Modal closed',
    icon: 'i-lucide-x',
    category: 'modal',
  },
} as const;
