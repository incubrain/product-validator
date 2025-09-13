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
  <ULink to="/" class="flex items-center space-x-2">
    <NuxtImg src="/favicon-96x96.png" width="36px" height="auto" />
    <h6
      class="font-bold underline text-base underline-offset-4 decoration-primary text-default m-0 leading-0"
    >
      NUXT LAUNCH KIT
    </h6>
  </ULink>
</template>
