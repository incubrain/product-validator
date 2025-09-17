<!-- components/ExitIntentModal.vue -->
<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>();
</script>

<template>
  <UModal
    fullscreen
    :close="{ onClick: () => emit('close', false) }"
    title="Wait! Don't leave empty-handed"
    description="Exit intent modal"
    :ui="{
      content:
        'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950',
      body: 'flex flex-col items-center justify-center text-center p-8',
    }"
  >
    <template #body>
      <div class="max-w-2xl space-y-6">
        <div class="space-y-4">
          <h2 class="text-4xl font-bold text-primary">🎯 Special Exit Offer</h2>
          <p class="text-xl text-muted">
            Get the complete validation toolkit before you go
          </p>
        </div>

        <div class="bg-white/80 dark:bg-black/20 rounded-xl p-6 space-y-4">
          <div class="text-2xl font-bold text-error line-through">$97</div>
          <div class="text-4xl font-bold text-success">$29</div>
          <p class="text-sm text-muted">70% off - Exit intent only</p>
        </div>

        <ul class="text-left space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <UIcon name="i-lucide-check" class="text-success" />
            Complete Nuxt template setup
          </li>
          <li class="flex items-center gap-2">
            <UIcon name="i-lucide-check" class="text-success" />
            A/B testing framework
          </li>
          <li class="flex items-center gap-2">
            <UIcon name="i-lucide-check" class="text-success" />
            Validation playbook
          </li>
          <li class="flex items-center gap-2">
            <UIcon name="i-lucide-check" class="text-success" />
            Public YouTube critique
          </li>
        </ul>

        <div class="flex gap-4 justify-center pt-4">
          <IButton
            action="paid"
            location="exit-modal"
            class="transform hover:scale-105"
          />
          <UButton
            variant="ghost"
            color="neutral"
            @click="emit('close', false)"
          >
            Maybe later
          </UButton>
        </div>

        <p class="text-xs text-muted">
          This offer expires when you close this popup
        </p>
      </div>
    </template>
  </UModal>
</template>
