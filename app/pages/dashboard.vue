<script setup lang="ts">
const { isAuthenticated, isPending } = useAuth()
</script>

<template>
  <div>
    <!-- Loading state while checking auth -->
    <div v-if="isPending" class="min-h-screen flex items-center justify-center">
      <div class="text-center space-y-4">
        <div class="animate-spin text-4xl">⏳</div>
        <p class="text-muted-foreground">Loading...</p>
      </div>
    </div>
    
    <!-- Dashboard content (only shows when authenticated) -->
    <div v-else-if="isAuthenticated">
      <h1>Dashboard</h1>
      <p>Protected content</p>
    </div>
    
    <!-- This shouldn't show because middleware handles redirect/modal -->
    <div v-else>
      <p>Not authenticated</p>
    </div>
  </div>
</template>