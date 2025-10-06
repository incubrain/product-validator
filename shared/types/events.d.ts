
export type TrackedEvents = 'action_click' | 'action_view' | 'exit_intent';

export interface EventPayload {
  id: string;
  type: TrackedEvents;
  location: string;
  action: string;
  target?: string;
  timestamp?: number;
}

