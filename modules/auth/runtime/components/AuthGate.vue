<script setup lang="ts">
/**
 * Optional wrapper component for protecting content
 * Alternative to route-based protection
 */
const props = defineProps<{
  /**
   * Override route-based requirement
   */
  require?: boolean
  
  /**
   * Custom metadata for auth hook
   */
  metadata?: Record<string, any>
  
  /**
   * Show fallback slot instead of nothing
   */
  fallback?: boolean
}>()

const { isAuthenticated, routeRequiresAuth } = useAuth()

const shouldProtect = computed(() => {
  // Explicit override
  if (props.require === false) return false
  
  // Check route config
  if (!routeRequiresAuth()) return false
  
  return !isAuthenticated.value
})

</script>

<template>
  <div>
    <!-- Show content if authenticated or not protected -->
    <slot v-if="!shouldProtect" />
    
    <!-- Fallback slot if not authenticated -->
    <div v-else-if="fallback">
      <slot name="fallback">
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center space-y-4">
            <p class="text-muted-foreground">
              Authentication required
            </p>
            <!-- User's custom auth UI will be triggered by hook -->
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
