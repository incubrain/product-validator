declare module '#app' {
  interface RuntimeNuxtHooks {
    'gated:lead-captured': (payload: LeadCapturePayload) => void | Promise<void>
    'gated:access-granted': (email: string) => void | Promise<void>
    'gated:step-completed': (step: StepCompletionPayload) => void | Promise<void>
  }
}

export interface LeadCapturePayload {
  email: string
  formId: string
  metadata?: Record<string, any>
}

export interface StepCompletionPayload {
  path: string
  step: number
  total: number
}
