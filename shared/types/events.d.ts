declare global {
  type TrackedEvents =
    | 'element_clicked'
    | 'element_viewed'
    | 'exit_intent'
    | 'form_submitted'
    | 'form_error'
    | 'form_success'
    | 'modal_open'
    | 'modal_close'
    // Payment events
    | 'payment:checkout'
    | 'payment:verify'
    | 'payment:success'
    | 'payment:failed'
    | 'payment:refunded';

  type TrackedActions =
    | 'update_record'
    | 'open_modal'
    | 'close_modal'
    | 'email_captured'
    | 'create_checkout'
    | 'verify_payment'
    | 'payment_verified'
    | 'checkout_failed'
    | string;
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
  data?: Record<string, any>;
  response?: Record<string, any>;
  triggersEvent?: string[];
  _devToolsTriggered?: boolean;
  error?: any;
}

export {}
