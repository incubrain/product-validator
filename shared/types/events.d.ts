declare global {
  type TrackedEvents =
    | 'element_clicked'
    | 'element_viewed'
    | 'exit_intent'
    | 'form_submitted'
    | 'form_error'
    | 'form_success'
    | 'modal_open'
    | 'modal_close';

  type TrackedActions =
    | 'submit_feedback'
    | 'open_modal'
    | 'close_modal'
    | 'email_captured'
    | string;
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
    recordId?: string;
    email?: string;
    offerId?: string;
    customerStage?: string;
    validationStage?: ValidationStage;
    feedback?: string;
    metadata?: Record<string, any>;
  };
  response?: Record<string, any>;
  triggersEvent?: string[];
  _devToolsTriggered?: boolean;
  error?: any;
}
