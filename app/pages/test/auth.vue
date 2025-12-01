
<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: [] // Allow access without auth
})

const { 
  user, 
  session, 
  isAuthenticated, 
  isPending, 
  signOut 
} = useAuth()

const { createPortalSession } = usePayments()

const handleLogin = () => {
  useState('auth-modal-open').value = true
}

const handleManageSubscription = async () => {
  try {
    const url = await createPortalSession(window.location.href)
    if (url) window.location.href = url
  } catch (e) {
    alert(e instanceof Error ? e.message : 'Failed to open portal')
  }
}

const handleLogout = async () => {
  await signOut()
  // Optional: refresh page or redirect
  window.location.reload()
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Auth Module Test</h1>
          <p class="text-neutral-500 dark:text-neutral-400">Verify authentication flows and session state</p>
        </div>
        <div class="flex gap-2">
           <UButton 
            to="/"
            color="neutral"
            variant="ghost"
            icon="i-heroicons-arrow-left"
            label="Back to Home"
          />
        </div>
      </div>

      <!-- Documentation -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-book-open" class="w-5 h-5" />
            <h3 class="text-lg font-semibold">Module Documentation</h3>
          </div>
        </template>
        
        <div class="space-y-4 text-sm">
          <div>
            <h4 class="font-medium mb-1">Enabled Features</h4>
            <ul class="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400">
              <li><strong>Better-Auth:</strong> Stateless authentication using JWE cookies.</li>
              <li><strong>Magic Link:</strong> Passwordless login via email link.</li>
              <li><strong>Email OTP:</strong> 6-digit verification code.</li>
              <li><strong>Session Management:</strong> Auto-refreshing sessions.</li>
            </ul>
          </div>

          <UDivider />

          <div>
            <h4 class="font-medium mb-1">How to Test</h4>
            <div class="space-y-3">
              <div>
                <p class="font-medium text-xs uppercase text-neutral-500">1. Sign In</p>
                <p class="text-neutral-600 dark:text-neutral-400">
                  Click "Open Login Modal" below. Use a real email to receive the OTP or Magic Link (if configured) or check server logs in dev mode.
                </p>
              </div>
              
              <div>
                <p class="font-medium text-xs uppercase text-neutral-500">2. Verify Session</p>
                <p class="text-neutral-600 dark:text-neutral-400">
                  Once logged in, the "Current Session" card will populate with your user details.
                </p>
              </div>

              <div>
                <p class="font-medium text-xs uppercase text-neutral-500">3. Sign Out</p>
                <p class="text-neutral-600 dark:text-neutral-400">
                  Click "Sign Out" to clear the session and return to guest state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Auth Status -->
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Current Session</h3>
            <div class="flex items-center gap-2">
              <span v-if="isPending" class="text-xs text-neutral-500">Loading...</span>
              <UBadge :color="isAuthenticated ? 'success' : 'warning'">
                {{ isAuthenticated ? 'Authenticated' : 'Guest' }}
              </UBadge>
            </div>
          </div>
        </template>
        
        <div v-if="isAuthenticated && user" class="space-y-6">
          <!-- User Details -->
          <div>
            <h4 class="text-sm font-medium text-neutral-500 mb-2 uppercase">User Profile</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 bg-neutral-100 dark:bg-neutral-900 rounded">
                <span class="text-xs text-neutral-500 block">ID</span>
                <code class="text-sm">{{ user.id }}</code>
              </div>
              <div class="p-3 bg-neutral-100 dark:bg-neutral-900 rounded">
                <span class="text-xs text-neutral-500 block">Email</span>
                <code class="text-sm">{{ user.email }}</code>
              </div>
              <div class="p-3 bg-neutral-100 dark:bg-neutral-900 rounded">
                <span class="text-xs text-neutral-500 block">Name</span>
                <code class="text-sm">{{ user.name }}</code>
              </div>
              <div class="p-3 bg-neutral-100 dark:bg-neutral-900 rounded">
                <span class="text-xs text-neutral-500 block">Verified</span>
                <code class="text-sm">{{ user.emailVerified ? 'Yes' : 'No' }}</code>
              </div>
            </div>
          </div>

          <UDivider />

          <!-- Session Details -->
          <div>
            <h4 class="text-sm font-medium text-neutral-500 mb-2 uppercase">Session Data</h4>
            <div class="bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto">
              <pre class="text-xs">{{ JSON.stringify(session, null, 2) }}</pre>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2">
            <UButton 
              color="neutral" 
              variant="solid" 
              label="Manage Subscription" 
              icon="i-heroicons-credit-card"
              @click="handleManageSubscription"
            />
            <UButton 
              color="error" 
              variant="soft" 
              label="Sign Out" 
              icon="i-heroicons-arrow-right-on-rectangle"
              @click="handleLogout"
            />
          </div>
        </div>

        <!-- Guest State -->
        <div v-else class="text-center py-12">
          <div class="i-heroicons-user-circle text-6xl mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
          <h3 class="text-lg font-medium mb-2">Not Signed In</h3>
          <p class="text-neutral-500 mb-6 max-w-sm mx-auto">
            Sign in to see your user profile and session details.
          </p>
          <UButton 
            size="lg" 
            label="Open Login Modal" 
            @click="handleLogin" 
          />
        </div>
      </UCard>
      
      <!-- Auth Modal Component (Always present but hidden) -->
      <AuthModal />

    </div>
  </div>
</template>
