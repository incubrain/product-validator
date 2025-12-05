import type { HookResult } from '@nuxt/schema';

declare global {
  type TrackedEvents =
    | 'element_viewed'
    | 'form_submitted'
    | 'form_error';

  type TrackedActions =
    | 'page_view'
    | 'click'
    | 'submit'
    | 'submission_failed'
    | 'devtools_trigger'
    | 'dev_trigger';
}



export interface TrafficSource {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
  landingPage: string;
  hasUtms: boolean;
}

export interface EventPayload {
  id: string;
  type: TrackedEvents;
  action: TrackedActions;
  location: string;
  target?: string;
  timestamp?: number;
  data?: {
    formId?: string;
    email?: string;
    currentStage?: string;
    antiSpam?: {
      honeypot?: string;
      timeOnForm?: number;
      jsToken?: string;
      turnstileToken?: string;
    };
    metadata?: Record<string, any>;
  };
  response?: Record<string, any>;
  _devToolsTriggered?: boolean;
  error?: any;
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'events:emit': (payload: EventPayload) => HookResult;
    'events:dev': (event: {
      eventId: string;
      eventType: TrackedEvents;
      status: 'success' | 'error';
      data?: Record<string, any>;
      error?: any;
    }) => HookResult;
  }
}

export {};
