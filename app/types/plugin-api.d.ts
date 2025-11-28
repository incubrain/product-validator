import type { useFormSubmission } from '~/composables/useFormSubmission'
import type { useEvents } from '~/composables/useEvents'
import type { useUserIdentity } from '~/composables/useUserIdentity'
import type { useTrafficSource } from '~/composables/useTrafficSource'
import type { useAppStorage } from '~/composables/useAppStorage'
import type { useDevTools } from '~/composables/useDevTools'

export interface CoreComposables {
  useFormSubmission: typeof useFormSubmission
  useEvents: typeof useEvents
  useUserIdentity: typeof useUserIdentity
  useTrafficSource: typeof useTrafficSource
  useAppStorage: typeof useAppStorage
  useDevTools: typeof useDevTools
}

declare module '#app' {
  interface NuxtApp {
    $coreComposables: CoreComposables
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $coreComposables: CoreComposables
  }
}
