<!-- layouts/default.vue -->
<script lang="ts" setup>
import { LAYOUT_CONFIG, getStickyOffset } from '#shared/config/navigation';
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <INavBanner
      v-if="LAYOUT_CONFIG.banner.enabled"
      offer="direct"
      :sticky="LAYOUT_CONFIG.banner.sticky"
      :class="LAYOUT_CONFIG.navbar.sticky ? '' : 'border-b'"
    />
    <INavHeader
      v-if="LAYOUT_CONFIG.navbar.enabled"
      :sticky="LAYOUT_CONFIG.navbar.sticky"
      :class="
        LAYOUT_CONFIG.banner.sticky ? 'top-(--ui-banner-height)' : 'top-0'
      "
    />
    <main :class="`min-h-[calc(100vh-${getStickyOffset(false)})]`">
      <slot />
    </main>
    <INavFooter />
  </div>
</template>
