<!-- components/ModalWindowed.vue - SIMPLIFIED -->
<script setup lang="ts">
interface Props {
  modalConfig?: {
    title?: string;
    contentId?: string;
  };
  formData?: Record<string, any>;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [result?: any] }>();

const isOpen = ref(true);

// Load content if ID provided
const { data: content } = await useAsyncData(
  () =>
    props.modalConfig?.contentId
      ? queryCollection('forms')
          .where('formId', '=', props.modalConfig.contentId)
          .first()
      : null,
  { immediate: !!props.modalConfig?.contentId },
);

const handleClose = () => {
  isOpen.value = false;
  emit('close');
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="modalConfig?.title || 'Success'"
    @update:open="(val) => !val && handleClose()"
  >
    <template #body>
      <!-- Dynamic content from collection -->
      <ContentRenderer v-if="content" :value="content" class="prose" />

      <!-- Default success if no content -->
      <div v-else class="text-center py-8">
        <div class="text-6xl mb-4">🎉</div>
        <p class="text-lg">Success! Check your email.</p>
      </div>
    </template>

    <template #footer>
      <UButton label="Close" variant="ghost" @click="handleClose" />
    </template>
  </UModal>
</template>
