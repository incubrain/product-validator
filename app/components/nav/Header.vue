<!-- components/nav/Header.vue -->
<script setup lang="ts">
import { NAVIGATION } from '#shared/config/navigation';

const props = defineProps<{
  class?: string;
  sticky?: boolean;
}>();

// Get founder data for social links
const founder = useSectionConfig('founder');

// Map links to proper format for UButton
const socialLinks = computed(
  () =>
    founder.value.accessibility.links?.map((link) => ({
      label: link.label,
      icon: `i-lucide-${link.platform}`,
      url: link.url,
    })) || [],
);

// Dynamic classes for sticky positioning
const headerClasses = computed(() => ({
  [`sticky z-40 bg-muted/80 backdrop-blur-md border-b border-default ${props.class}`]:
    props.sticky,
  'relative z-0 border-b border-default/60': !props.sticky,
}));
</script>

<template>
  <UHeader mode="slideover" :class="headerClasses" to="/">
    <template #title>
      <ILogo size="md" />
    </template>

    <UNavigationMenu
      class="flex grow mx-auto max-w-xl justify-center items-center"
      :items="NAVIGATION.main"
      color="neutral"
      content-orientation="horizontal"
    />

    <template #right>
      <div class="hidden md:flex items-center gap-1">
        <UButton
          v-for="social in socialLinks"
          :key="social.label"
          :icon="social.icon"
          color="neutral"
          variant="ghost"
          size="sm"
          :to="social.url"
          target="_blank"
          :aria-label="social.label"
        />
      </div>
    </template>

    <template #body>
      <INavMobile :navigation-items="NAVIGATION.main" />
    </template>
  </UHeader>
</template>
