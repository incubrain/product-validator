<!-- components/form/Success.vue -->
<script setup lang="ts">
import confetti from 'canvas-confetti';

interface Props {
  title?: string;
  icon?: string;
  message?: string;
  celebrate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Success!',
  icon: '✅',
  message: 'Your submission was received.',
  celebrate: true,
});

onMounted(() => {
  if (props.celebrate) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
});
</script>

<template>
  <div class="text-center space-y-6 py-6">
    <div class="text-6xl">{{ icon }}</div>

    <div class="space-y-2">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <p class="text-muted">
        {{ message }}
      </p>
    </div>

    <!-- Slot for additional content (e.g., feedback form) -->
    <div v-if="$slots.default" class="pt-4 border-t border-border">
      <slot />
    </div>
  </div>
</template>
