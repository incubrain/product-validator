<!-- layouts/default.vue -->
<script lang="ts" setup>
import { CONFIG, CONVERSION } from '#shared/config/navigation';
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <INavBanner
      v-if="CONFIG.banner.enabled"
      :offer="CONVERSION.secondary"
      :sticky="CONFIG.banner.sticky"
      :class="CONFIG.navbar.sticky ? '' : 'border-b'"
    />
    <INavHeader
      v-if="CONFIG.navbar.enabled"
      :sticky="CONFIG.navbar.sticky"
      :class="CONFIG.banner.sticky ? 'top-(--ui-banner-height)' : 'top-0'"
    />
    <main>
      <slot />
    </main>
    <INavFooter />
  </div>
</template>
