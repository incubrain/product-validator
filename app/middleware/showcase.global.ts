// middleware/showcase-routes.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // ✅ Check if route path contains 'showcase'
  if (to.path.includes('/showcase')) {
    // ✅ Disable all transitions for showcase routes
    to.meta.layout = false
    to.meta.pageTransition = false
    to.meta.layoutTransition = false

    // ✅ Optional: Also disable view transitions if enabled
    if (import.meta.client && typeof document.startViewTransition === 'function') {
      to.meta.viewTransition = false
    }
  }
})
