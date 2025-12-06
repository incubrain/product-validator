<!-- components/nav/Header.vue -->
<script setup lang="ts">
import { NAVIGATION } from '#shared/config/navigation';

const props = defineProps<{
  class?: string;
  sticky?: boolean;
}>();

const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();

// Map links to proper format for UButton
const socialLinks = computed(
  () =>
    configData.value?.socials?.map((link) => ({
      label: link.label,
      icon: `i-lucide-${link.platform}`,
      url: link.url,
    })) || [],
);

const headerClasses = computed(() => ({
  [`sticky z-40 bg-muted/80 backdrop-blur-md border-b border-default ${props.class}`]:
    props.sticky,
  'relative z-0 border-b border-default/60': !props.sticky,
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
      <NavMobile :navigation-items="NAVIGATION.main" />
    </template>
  </UHeader>
</template>
