<!-- app/components/i/nav/Header.vue -->
<script setup lang="ts">
import { getMainNavigation } from '#shared/config/navigation';

const props = defineProps<{
  class?: string;
  sticky?: boolean;
}>();

const navigationItems = getMainNavigation();

// Dynamic classes for sticky positioning
const headerClasses = computed(() => ({
  [`sticky z-40 bg-muted/80 backdrop-blur-md border-b border-default ${props.class}`]:
    props.sticky,
  'relative z-0 border-none': !props.sticky,
}));
</script>

<template>
  <UHeader mode="slideover" :class="headerClasses">
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
        offer="low"
        location="header"
        class="hidden md:inline-flex text-toned font-black"
      />
    </template>

    <template #body>
      <INavMobile :navigation-items="navigationItems" />
    </template>
  </UHeader>
</template>
