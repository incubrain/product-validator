<!-- layouts/default.vue -->
<script lang="ts" setup>
import { NAVIGATION } from '#shared/config/navigation';
const { showLayout } = useSectionVisibility();

const isDev = import.meta.dev;
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <IDevStages v-if="isDev" />

    <INavBanner
      v-if="showLayout('banner') && NAVIGATION.layout.banner"
      :sticky="NAVIGATION.layout.banner.sticky"
      :class="NAVIGATION.layout.navbar?.sticky ? '' : 'border-b'"
    />

    <INavHeader
      v-if="showLayout('navbar') && NAVIGATION.layout.navbar"
      :sticky="NAVIGATION.layout.navbar.sticky"
      :class="NAVIGATION.layout.banner?.sticky ? 'top-(--ui-banner-height)' : 'top-0'"
    />

    <main>
      <slot />
    </main>

    <INavFooter v-if="showLayout('footer')" />
  </div>
</template>
