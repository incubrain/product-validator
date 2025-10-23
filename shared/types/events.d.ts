declare global {
  type TrackedEvents =
    | 'action_click'
    | 'action_view'
    | 'exit_intent'
    | 'form_submit'
    | 'form_error';
}

export interface EventPayload {
  id: string;
  type: TrackedEvents;
  location: string;
  action: string;
  target?: string;
  timestamp?: number;
  data?: {
    form_id?: string;
    record_id?: string;
    email?: string;
    offer?: string;
    customer_stage?: string;
    validation_stage?: 'fake_door' | 'magnet' | 'payment_intent';
    feedback?: string;
    metadata?: Record<string, any>;
  };
  response?: Record<string, any>;
  error?: any;
}
