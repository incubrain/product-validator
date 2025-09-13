<script setup lang="ts">
const bannerActions = [
  {
    label: 'Buy The Course',
    color: 'neutral',
    variant: 'solid',
    size: 'xs',
    to: '/course', // Update with your actual course URL
    target: '_blank',
  },
];

function onBannerClose() {
  // Banner will automatically handle localStorage persistence
  console.log('Banner dismissed');
}
</script>

<template>
  <UBanner
    id="course-support"
    icon="i-lucide-heart"
    title="Support the continued development of this template"
    color="primary"
    :actions="bannerActions"
    close
    @close="onBannerClose"
  />
</template>
