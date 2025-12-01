// shared/config/events.ts
import type { EventPayload } from '#shared/types/events';

/**
 * Smart fallback data provider
 * Generates sensible defaults for missing data
 */
const EVENT_FALLBACKS = {
  formId: () => 'waitlist',
  recordId: () => `mock-${Date.now()}`,
  email: () => 'dev@example.com',
  offerId: () => 'magnet',
  customerStage: () => 'email_captured' as const,
  currentStage: () => 'traffic' as const,
  modalType: () => 'windowed',
  target: () => 'test-element',
  metadata: () => ({}),
  location: () => '/',
} as const;

/**
 * Apply fallbacks to payload data
 * Only fills in missing values, doesn't override existing ones
 */
function applyFallbacks(
  data: Record<string, any> = {},
  requiredFields: Array<keyof typeof EVENT_FALLBACKS> = [],
): Record<string, any> {
  const result = { ...data };

  for (const field of requiredFields) {
    if (result[field] === undefined && EVENT_FALLBACKS[field]) {
      result[field] = EVENT_FALLBACKS[field]();
    }
  }

  return result;
}

type EventChainConfig = {
  triggers: TrackedEvents[];
  condition?: (payload: EventPayload) => boolean;
  data?: (payload: EventPayload) => Partial<EventPayload['data']>;
  requiredFields?: Array<keyof typeof EVENT_FALLBACKS>; // Auto-fill missing fields
};

export const EVENT_CHAINS: Partial<Record<TrackedEvents, EventChainConfig>> = {
  form_submitted: {
    triggers: ['modal_open'],
    condition: (payload) => {
      return payload.data?.formId === 'waitlist';
    },
    requiredFields: ['formId', 'recordId', 'customerStage'],
    data: (payload) => ({
      action: 'windowed_modal',
      formId: payload.data?.formId,
      recordId: payload.data?.recordId,
    }),
  },

  exit_intent: {
    triggers: ['modal_open'],
    requiredFields: ['offerId', 'location'],
    condition: (payload) => {
      // Only trigger on homepage or in DevTools
      return payload.location === '/' || payload._devToolsTriggered === true;
    },
    data: (payload) => ({
      action: 'fullscreen_modal',
      offerId: 'direct',
      location: payload.location,
    }),
  },
} as const;

/**
 * Minimal metadata for DevTools only
 * No duplication of data structure
 */
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
  element_clicked: {
    label: 'Action Click',
    description: 'Button clicked',
    icon: 'i-lucide-mouse-pointer-click',
    category: 'action',
  },
  element_viewed: {
    label: 'Action View',
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
} as const;

// Export helper for external use
export { applyFallbacks, EVENT_FALLBACKS };
