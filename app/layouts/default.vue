<!-- layouts/default.vue -->
<script lang="ts" setup>
import { CONVERSION } from '#shared/config/navigation';
const { showLayout } = useSectionVisibility();

const isDev = import.meta.dev;
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <IDevTools v-if="isDev" />

    <INavBanner
      v-if="showLayout('banner') && CONVERSION.banner"
      :offer-id="CONVERSION.secondary"
      :sticky="CONVERSION.banner.sticky"
      :class="CONVERSION.navbar?.sticky ? '' : 'border-b'"
    />

    <INavHeader
      v-if="showLayout('navbar') && CONVERSION.navbar"
      :sticky="CONVERSION.navbar.sticky"
      :class="CONVERSION.banner?.sticky ? 'top-(--ui-banner-height)' : 'top-0'"
    />

    <main>
      <slot />
    </main>

    <INavFooter v-if="showLayout('footer')" />
  </div>
</template>
