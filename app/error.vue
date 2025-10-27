<!-- error.vue -->
<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
  error: Object as () => NuxtError,
});

const isDev = import.meta.env;

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UPageCard
      variant="naked"
      class="w-full max-w-2xl"
      :ui="{
        wrapper: 'items-center',
        root: 'flex flex-col items-center text-center',
        footer: 'flex items-center text-center justify-center w-full gap-2',
        header: 'flex flex-col items-center text-center space-y-4 w-full',
      }"
    >
      <!-- Error Header -->
      <template #header>
        <UIcon name="i-lucide-circle-alert" class="size-8 text-error" />
        <div class="w-full">
          <h1 class="text-4xl font-bold">
            {{ error?.statusCode || 500 }}
          </h1>
          <h2 class="text-xl text-muted break-words">
            {{ error?.statusMessage || 'Error' }}
          </h2>
        </div>
      </template>

      <!-- Error Message -->
      <p class="lg:text-lg break-words w-full">
        {{ error?.message || 'An unexpected error occurred' }}
      </p>

      <!-- Dev Mode: Stack Trace -->
      <UAlert
        v-if="isDev && error?.stack"
        title="Stack Trace"
        color="error"
        variant="outline"
        class="w-full"
        :ui="{
          description: 'font-mono text-xs overflow-x-auto max-w-full',
          root: 'w-full',
        }"
      >
        <template #description>
          <pre class="whitespace-pre-wrap break-words overflow-wrap-anywhere">{{
            error.stack
          }}</pre>
        </template>
      </UAlert>

      <!-- Dev Mode: Error Details -->
      <UAlert
        v-if="isDev"
        title="Error Details"
        color="warning"
        variant="outline"
        class="w-full"
        :ui="{ root: 'w-full justify-center items-center text-center' }"
      >
        <template #description>
          <dl class="space-y-2 text-sm w-full">
            <div v-if="error?.statusCode">
              <dt class="font-semibold">Status Code:</dt>
              <dd class="font-mono break-words">{{ error.statusCode }}</dd>
            </div>
            <div v-if="error?.statusMessage">
              <dt class="font-semibold">Status Message:</dt>
              <dd class="font-mono break-words">{{ error.statusMessage }}</dd>
            </div>
            <div v-if="error?.data">
              <dt class="font-semibold">Additional Data:</dt>
              <dd
                class="font-mono break-words whitespace-pre-wrap overflow-x-auto"
              >
                {{ JSON.stringify(error.data, null, 2) }}
              </dd>
            </div>
            <div v-if="error?.cause">
              <dt class="font-semibold">Cause:</dt>
              <dd class="font-mono break-words">{{ error.cause }}</dd>
            </div>
          </dl>
        </template>
      </UAlert>

      <!-- Actions -->
      <template #footer>
        <UButton color="primary" size="lg" @click="handleError">
          Go Home
        </UButton>

        <UButton
          v-if="isDev"
          color="neutral"
          variant="ghost"
          size="lg"
          @click="$router.back()"
        >
          Go Back
        </UButton>
      </template>
    </UPageCard>
  </div>
</template>

<style scoped>
/* Ensure long words break properly */
.overflow-wrap-anywhere {
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
