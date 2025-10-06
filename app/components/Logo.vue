<script setup lang="ts">
const siteConfig = useSiteConfig();

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
    <!-- {EXTRACT} -->
    <NuxtImg
      src="/favicon-96x96.png"
      width="36px"
      height="auto"
      class="p-1 rounded-full bg-elevated border"
    />
    <h6 class="font-bold text-base text-dimmed m-0 leading-0">
      {{ siteConfig.name }}
    </h6>
  </ULink>
</template>
