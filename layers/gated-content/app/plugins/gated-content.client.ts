export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.gatedContent as any
  
  if (!config.enabled) return
  
  const { grantAccess } = useGatedAccess()
  
  // Listen to core events
  nuxtApp.hook('events:emit', async (payload: any) => {
    // Only handle our specific form
    if (payload.type !== 'form_submitted') return
    if (payload.data?.formId !== config.formId) return
    
    const email = payload.data.email
    
    // Emit layer-specific hook
    await nuxtApp.callHook('gated:lead-captured', {
      email,
      formId: payload.data.formId,
      metadata: payload.data.metadata
    })
    
    // Handle access verification
    if (config.auth.strategy === 'custom' && config.auth.verify) {
      const verified = await config.auth.verify(email)
      if (verified) {
        grantAccess(email)
        await nuxtApp.callHook('gated:access-granted', email)
      }
    } else {
      // Use storage verification endpoint
      const { data } = await useFetch('/api/v1/gated/verify', {
        method: 'POST',
        body: { email }
      }) as any
      
      if (data.value?.exists) {
        grantAccess(email)
        await nuxtApp.callHook('gated:access-granted', email)
      }
    }
    
    // Auto-redirect if configured
    if (config.navigation.autoRedirect) {
      await navigateTo(config.rootPath)
    }
  })
})
