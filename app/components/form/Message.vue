<!-- components/form/Message.vue (IFormMessage) -->
<script setup lang="ts">
import confetti from 'canvas-confetti';

interface Props {
  formId?: string;
  formState?: string;
  celebrate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  formId: 'magnet',
  formState: 'success',
  celebrate: true,
});

const { data } = await useAsyncData(
  `form-${props.formState}-${props.formId}`,
  () =>
    queryCollection('forms')
      .where('formId', '=', `${props.formId}-${props.formState}`)
      .first(),
);

const isDev = import.meta.dev;

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
    <ContentRenderer v-if="data" :value="data" />
    <p v-else-if="!data && isDev">
      No success form found for {{ props.formId }}-{{ props.formState }}
    </p>
    <!-- Slot for additional content (e.g., feedback form) -->
    <div v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>
