<!-- app/components/i/nav/Header.vue -->
<script setup lang="ts">
import { NAVIGATION, CONVERSION } from '#shared/config/navigation';

const props = defineProps<{
  class?: string;
  sticky?: boolean;
}>();

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
      :items="NAVIGATION.main"
      color="neutral"
      content-orientation="horizontal"
    />

    <template #right>
      <IButtonCTA
        :offer-id="CONVERSION.primary"
        location="header"
        anchor
        class="hidden md:inline-flex text-toned font-black"
      />
    </template>

    <template #body>
      <INavMobile :navigation-items="NAVIGATION.main" />
    </template>
  </UHeader>
</template>
