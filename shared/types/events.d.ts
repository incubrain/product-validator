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
    formId?: string;
    recordId?: string;
    email?: string;
    offer?: string;
    customerStage?: string;
    validationStage?: ValidationStage;
    feedback?: string;
    metadata?: Record<string, any>;
  };
  response?: Record<string, any>;
  error?: any;
}
