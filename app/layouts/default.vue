<!-- layouts/default.vue - UPDATED -->
<script lang="ts" setup>
const bannerSticky = true; // or make this reactive/configurable
const headerSticky = false;
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <INavBanner offer="direct" :sticky="bannerSticky" />
    <INavHeader
      :sticky="headerSticky"
      :class="bannerSticky ? 'top-(--ui-banner-height)' : 'top-0'"
    />
    <main class="min-h-[calc(100vh-4rem)]">
      <slot />
    </main>
    <INavFooter />
  </div>
</template>
