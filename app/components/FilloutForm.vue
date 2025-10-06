<!-- components/IFilloutForm.vue -->
<script setup lang="ts">
import { useScript } from '#imports';

interface Props {
  formId: string;
  type?: 'standard' | 'popup' | 'sidebar';
  height?: string | number;
  width?: string | number;
  params?: Record<string, string | number | boolean>;
}

const props = defineProps<Props>();

// Convert params to data-[key] attributes
const dataAttrs = computed(() => {
  if (!props.params) return {};

  const attrs: Record<string, string> = {};
  Object.entries(props.params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      attrs[`data-${key}`] = String(value);
    }
  });
  return attrs;
});

const { load } = useScript(
  {
    src: 'https://server.fillout.com/embed/v1/',
  },
  {
    trigger: 'onNuxtReady',
    bundle: false,
  },
);

onMounted(() => {
  load();
});
</script>

<template>
  <div
    v-bind="dataAttrs"
    :style="{
      width: width ? String(width) : '100%',
      height: height ? String(height) : '500px',
    }"
    :data-fillout-id="formId"
    :data-fillout-embed-type="type || 'standard'"
    data-fillout-inherit-parameters
    data-fillout-dynamic-resize
  />
</template>
