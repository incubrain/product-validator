<script setup lang="ts">
const isOpen = useState<boolean>("auth-modal-open", () => false);
const activeTab = ref<"magic-link" | "otp">("otp");

// DEBUG: Log modal state
onMounted(() => {
  console.log('[AuthModal] 🟢 Mounted, isOpen:', isOpen.value)
})

watch(isOpen, (val) => {
  console.log('[AuthModal] 👀 isOpen changed:', val)
})

const tabs = [
  { value: "magic-link", label: "Magic Link" },
  { value: "otp", label: "Email Code" },
] as const;

const { signInWithMagicLink, sendEmailOTP, verifyEmailOTP, isPending: isCheckingAuth } = useAuth();

// Form state
const email = ref("");
const otpCode = ref<string[]>([]); // ✅ Changed to array for UPinInput
const isSubmitting = ref(false);
const error = ref<string | null>(null);
const magicLinkSent = ref(false);
const otpSent = ref(false);

/**
 * Handle magic link request
 */
const handleMagicLinkSubmit = async () => {
  if (!email.value) {
    error.value = "Email is required";
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  try {
    const result = await signInWithMagicLink(email.value);
    
    if (result.error) {
      error.value = result.error.message;
    } else {
      magicLinkSent.value = true;
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to send magic link";
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * Handle OTP request
 */
const handleOTPRequest = async () => {
  if (!email.value) {
    error.value = "Email is required";
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  try {
    const result = await sendEmailOTP(email.value);
    
    if (result.error) {
      error.value = result.error.message;
    } else {
      otpSent.value = true;
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to send OTP";
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * Handle OTP verification
 */
const handleOTPVerify = async () => {
  if (otpCode.value.length !== 6) {
    error.value = "Please enter the full code";
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  const code = otpCode.value.join(''); // ✅ Join array to string

  try {
    const result = await verifyEmailOTP(email.value, code);
    
    if (result.error) {
      error.value = result.error.message;
    } else {
      isOpen.value = false;
      navigateTo("/dashboard");
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Invalid code";
  } finally {
    isSubmitting.value = false;
  }
};

const handleClose = () => {
  isOpen.value = false;
  email.value = "";
  otpCode.value = []; // ✅ Reset to empty array
  error.value = null;
  magicLinkSent.value = false;
  otpSent.value = false;
};
</script>


<template>
  <UModal 
    v-model:open="isOpen" 
    title="Sign In" 
    description="Choose your preferred sign-in method"
    @close="handleClose"
  >
    <template #body>
      <!-- Loading State while checking existing session -->
      <div v-if="isCheckingAuth" class="text-center py-8">
        <div class="animate-spin text-4xl mb-4">⏳</div>
        <p class="text-muted-foreground">Checking authentication...</p>
      </div>

       <div v-else>
        <!-- Tabs -->
        <div class="mb-6">
          <div class="flex gap-2 border-b">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="[
                'px-4 py-2 font-medium transition-colors',
                activeTab === tab.value
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
  
        <!-- Magic Link Tab -->
        <div v-if="activeTab === 'magic-link'" class="space-y-4">
          <div v-if="!magicLinkSent">
            <form @submit.prevent="handleMagicLinkSubmit">
              <UFormField label="Email" :error="error">
                <UInput
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  size="lg"
                  :disabled="isSubmitting"
                />
              </UFormField>
  
              <UButton
                type="submit"
                label="Send Magic Link"
                size="lg"
                block
                :loading="isSubmitting"
                :disabled="isSubmitting"
                class="mt-4"
              />
            </form>
          </div>
  
          <div v-else class="text-center space-y-2">
            <div class="text-4xl">📧</div>
            <p class="font-medium">Check your email!</p>
            <p class="text-sm text-muted-foreground">
              We sent a magic link to {{ email }}
            </p>
            <UButton
              label="Resend"
              variant="link"
              size="sm"
              @click="magicLinkSent = false"
            />
          </div>
        </div>
  
        <!-- Email OTP Tab -->
        <div v-if="activeTab === 'otp'" class="space-y-4">
          <div v-if="!otpSent">
            <form @submit.prevent="handleOTPRequest">
              <UFormField label="Email" :error="error">
                <UInput
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  size="lg"
                  :disabled="isSubmitting"
                />
              </UFormField>
  
              <UButton
                type="submit"
                label="Send Code"
                size="lg"
                block
                :loading="isSubmitting"
                :disabled="isSubmitting"
                class="mt-4"
              />
            </form>
          </div>
  
          <div v-else>
            <form @submit.prevent="handleOTPVerify" class="space-y-4">
              <div class="text-center text-sm text-muted-foreground mb-4">
                Enter the 6-digit code sent to {{ email }}
              </div>
  
              <div class="flex justify-center">
                <UPinInput
                  v-model="otpCode"
                  :length="6"
                  size="xl"
                  :disabled="isSubmitting"
                  autofocus
                  otp
                />
              </div>
  
              <UButton
                type="submit"
                label="Verify"
                size="lg"
                block
                :loading="isSubmitting"
                :disabled="isSubmitting || otpCode.length !== 6"
              />
  
              <UButton
                label="Send new code"
                variant="link"
                size="sm"
                block
                @click="otpSent = false"
              />
            </form>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

