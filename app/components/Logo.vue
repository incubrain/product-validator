<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  showText: true,
});
</script>

<template>
  <ULink to="/" class="flex items-center space-x-3">
    <NuxtImg
      src="/favicon-96x96.png"
      width="36px"
      height="auto"
      class="p-1 rounded-full bg-inverted border"
    />
    <h6 class="font-bold text-base text-default m-0 leading-0">
      Launch Kit
    </h6>
  </ULink>
</template>
