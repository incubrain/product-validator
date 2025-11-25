<!-- NEW FILE: Waitlist form for sold out offers -->
<script setup lang="ts">
import { z } from 'zod';
import type { Offer } from '#types';

interface Props {
  location: string;
  offer: Offer;
}

const props = defineProps<Props>();

// ✅ LOGGING: Component mount
console.log('[Waitlist] Component mounted', {
  location: props.location,
  offerSlug: props.offer.slug,
  offerTitle: props.offer.title,
});

const state = reactive({
  email: '',
});

// ✅ CHANGED: Use dedicated waitlist submission handler
const { submit, isSubmitting, isSuccess, errorMessage } = useWaitlistSubmission({
  offerId: props.offer.slug,
  location: props.location,
});

const handleSubmit = async () => {
  console.log('[Waitlist] Form submission started', {
    email: state.email,
    offerId: props.offer.slug,
    location: props.location,
  });
  
  try {
    await submit({ email: state.email });
    console.log('[Waitlist] Form submission successful');
  } catch (err) {
    console.error('[Waitlist] Form submission failed', err);
  }
};

// ✅ LOGGING: Watch form state changes
watch(() => state.email, (newEmail) => {
  console.log('[Waitlist] Email changed:', newEmail);
});

watch(isSuccess, (success) => {
  if (success) {
    console.log('[Waitlist] ✅ User successfully added to waitlist');
  }
});

watch(errorMessage, (err) => {
  if (err) {
    console.error('[Waitlist] ❌ Form error:', err);
  }
});
</script>

<template>
  <div class="w-full">
    <!-- Waitlist Form -->
    <div v-if="!isSuccess" class="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 space-y-4">
      <div class="text-center space-y-2">
        <UBadge color="neutral" variant="soft" size="lg">Sold Out</UBadge>
        <p class="text-sm text-muted">
          All spots have been claimed. Join the waitlist to be notified when we open again.
        </p>
      </div>
      
      <UForm :state="state" @submit="handleSubmit">
        <div class="space-y-3 w-full">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="your@email.com"
            size="xl"
            :disabled="isSubmitting"
            class="w-full"
            autocomplete="email"
          />
          <UButton 
            type="submit" 
            size="xl" 
            block 
            :loading="isSubmitting" 
            color="neutral" 
            variant="solid"
            :disabled="!state.email || isSubmitting"
          >
            {{ isSubmitting ? 'Joining...' : 'Join Waitlist' }}
          </UButton>
        </div>
      </UForm>
      
      <!-- Error Display -->
      <div v-if="errorMessage" class="text-center">
        <p class="text-xs text-error">{{ errorMessage }}</p>
      </div>
    </div>
    
    <!-- Success State -->
    <div v-else class="bg-neutral-900/50 border border-success/20 rounded-lg p-6 text-center space-y-3">
      <UIcon name="i-lucide-check-circle" class="w-12 h-12 text-success mx-auto" />
      <h3 class="text-lg font-semibold text-white">You're on the list!</h3>
      <p class="text-sm text-muted">
        We'll email you as soon as spots open up.
      </p>
    </div>
  </div>
</template>
