<!-- components/ModalWindowed.vue - SIMPLIFIED -->
<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Thanks!',
  description: 'We will notify when we launch.',
});

const emit = defineEmits<{ close: [result?: any] }>();

const isOpen = ref(true);

const handleClose = () => {
  isOpen.value = false;
  emit('close');
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :description="description"
    @update:open="(val) => !val && handleClose()"
  >
    <template #body>
      <IFormMessage />
      <slot />
    </template>

    <template #footer>
      <UButton label="Close" variant="ghost" @click="handleClose" />
    </template>
  </UModal>
</template>
