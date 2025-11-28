import { defineNuxtPlugin } from '#app'
import { useFormSubmission } from '~/composables/useFormSubmission'
import { useEvents } from '~/composables/useEvents'
import { useUserIdentity } from '~/composables/useUserIdentity'
import { useTrafficSource } from '~/composables/useTrafficSource'
import { useAppStorage } from '~/composables/useAppStorage'
import { useDevTools } from '~/composables/useDevTools'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      coreComposables: {
        useFormSubmission,
        useEvents,
        useUserIdentity,
        useTrafficSource,
        useAppStorage,
        useDevTools
      }
    }
  }
})
