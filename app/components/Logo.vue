<script setup lang="ts">
// Fetch business data from config collection
const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();
const business = computed(() => configData.value?.business);

interface Props {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showText: true,
});

// Size variants
const sizeMap = {
  sm: '24px',
  md: '36px',
  lg: '48px',
};

const imageSize = computed(() => sizeMap[props.size]);
</script>

<template>
  <div class="flex items-center space-x-3">
    <NuxtImg
      :src="business?.logo"
      :width="imageSize"
      height="auto"
      class="p-1 rounded-full bg-elevated border"
    />
    <h6 v-if="showText" class="font-bold text-base text-dimmed m-0 leading-0">
      {{ business?.name }}
    </h6>
  </div>
</template>
