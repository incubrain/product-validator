<!-- app/components/i/nav/Header.vue -->
<script setup lang="ts">
import { getMainNavigation } from '#shared/config/navigation';

const navigationItems = getMainNavigation();
</script>

<template>
  <UHeader
    mode="slideover"
    :ui="{
      root: 'bg-muted/80 backdrop-blur-md border-b border-default',
      container: 'h-16',
      body: 'h-full max-h-[calc(100vh-var(--ui-header-height))] overflow-hidden',
    }"
  >
    <template #title>
      <ILogo size="md" />
    </template>

    <UNavigationMenu
      class="flex flex-grow mx-auto max-w-xl justify-center items-center"
      :items="navigationItems"
      color="neutral"
      content-orientation="horizontal"
    />

    <template #right>
      <IButton
        offer="product"
        location="header"
        class="hidden md:inline-flex font-bold"
      />
    </template>

    <template #body>
      <INavMobile :navigation-items="navigationItems" />
    </template>
  </UHeader>
</template>
