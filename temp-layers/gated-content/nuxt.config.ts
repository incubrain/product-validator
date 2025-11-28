export default defineNuxtConfig({
  // Layer-specific defaults (can be overridden by parent)
  runtimeConfig: {
    public: {
      gatedContent: {
        enabled: false
      }
    }
  }
})
