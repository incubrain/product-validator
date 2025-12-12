<!-- components/nav/Header.vue -->
<script setup lang="ts">
import { NAVIGATION } from '#shared/config/navigation';

const props = withDefaults(
  defineProps<{
    class?: string;
    sticky?: boolean;
  }>(),
  {
    sticky: false,
  },
);

const headerClasses = computed(() => ({
  [`sticky z-40 bg-muted/80 backdrop-blur-md border-b border-default ${props.class}`]:
    props.sticky,
  [`relative z-100 border-b border-default/60 bg-muted/95 backdrop-blur-xl ${props.class}`]:
    !props.sticky,
}));
</script>

<template>
  <UHeader mode="slideover" :class="headerClasses" to="/">
    <template #title>
      <Logo size="md" />
    </template>

    <UNavigationMenu
      class="flex grow mx-auto max-w-xl justify-center items-center"
      :items="NAVIGATION.main"
      color="neutral"
      content-orientation="horizontal"
    />

    <template #right>
      <div class="hidden md:flex items-center gap-1">
        <ConvertSocial
          location="header"
          size="sm"
          variant="ghost"
          color="neutral"
          :rounded="false"
          gap="tight"
        />
      </div>
    </template>

    <template #body>
      <NavMobile :navigation-items="NAVIGATION.main" />
    </template>
  </UHeader>
</template>
