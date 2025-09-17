<script setup lang="ts">
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
    close
    @close="onBannerClose"
  >
    <template #actions>
      <IButton action="paid" location="banner" />
    </template>
  </UBanner>
</template>
