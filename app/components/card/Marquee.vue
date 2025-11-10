<!-- ~/components/card/Marquee.vue -->
<script setup lang="ts">
import type { ProofItem } from '#types';

const props = defineProps<ProofItem>();

const isIcon = computed(() => {
  return props.logo ? props.logo.startsWith('i-') : false;
});
</script>

<template>
  <div
    class="flex items-center gap-3 px-4 py-3 bg-default backdrop-blur-sm rounded-lg border border-white/10 shrink-0"
  >
    <UIcon
      v-if="isIcon"
      :name="logo"
      class="size-8 shrink-0"
      :class="logo.includes('check-circle') ? 'text-success' : 'text-info'"
    />

    <NuxtImg
      v-else
      :src="logo"
      width="36"
      height="36"
      class="rounded-full shrink-0"
      alt=""
    />

    <span class="font-medium text-base whitespace-nowrap">
      {{ name }}
    </span>

    <span
      v-if="note"
      class="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded whitespace-nowrap"
    >
      {{ note }}
    </span>
  </div>
</template>
