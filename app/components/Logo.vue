<script setup lang="ts">
// Fetch business data from config collection
const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();
const business = computed(() => configData.value?.business);

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
  <div class="flex items-center space-x-3">
    <NuxtImg
      :src="business?.logo"
      width="36px"
      height="auto"
      class="p-1 rounded-full bg-elevated border"
    />
    <h6 v-if="showText" class="font-bold text-base text-dimmed m-0 leading-0">
      {{ business?.name }}
    </h6>
  </div>
</template>
