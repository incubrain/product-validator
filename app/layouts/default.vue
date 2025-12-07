<!-- layouts/default.vue -->
<script lang="ts" setup>
import { NAVIGATION } from '#shared/config/navigation';
const { showLayout } = useSectionVisibility();

const isDev = import.meta.dev;
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <DevStages v-if="isDev" class="hidden lg:fixed" />

    <NavBanner
      v-if="showLayout('banner') && NAVIGATION.layout.banner"
      :sticky="NAVIGATION.layout.banner.sticky"
      :class="NAVIGATION.layout.navbar?.sticky ? 'fixed top-0' : 'border-b'"
    />

    <NavHeader
      v-if="showLayout('navbar') && NAVIGATION.layout.navbar"
      :sticky="NAVIGATION.layout.navbar.sticky"
      :class="NAVIGATION.layout.banner?.sticky ? 'block top-0' : 'top-0'"
    />

    <main class="pb-12 lg:pb-16">
      <slot />
    </main>

    <NavFooter v-if="showLayout('footer')" />
  </div>
</template>
