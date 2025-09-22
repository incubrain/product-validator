<!-- components/FounderCard.vue -->
<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'mobile';
}>();

// Get founder data from overview.ts
const founder = useFlowSection('founder');

// Computed properties
const displayName = computed(() => `Hi, I'm ${founder.name.split(' ')[0]}`);
const description = computed(() => founder.role);

// Map links to proper format for UButton
const socialLinks = computed(
  () =>
    founder.links?.map((link) => ({
      label: link.label,
      icon: `i-lucide-${link.platform}`,
      to: link.url,
      target: link.url.startsWith('https') ? '_blank' : '_self',
    })) || [],
);
</script>

<template>
  <UCard
    class="max-w-xs"
    :ui="{
      root: 'rounded-lg overflow-hidden ring-0',
      header: 'p-1 sm:p-2 flex lg:justify-end border-none divide-none',
      body: 'p-1 sm:p-2 border-none',
      footer: 'p-1 sm:p-2 border-none flex lg:justify-end',
    }"
  >
    <!-- Header: founder identity -->
    <template #header>
      <UUser
        :name="displayName"
        :description="description"
        :orientation="variant === 'mobile' ? 'horizontal' : 'vertical'"
        size="lg"
        :avatar="{
          src: founder.avatar.src,
          alt: founder.avatar.alt,
        }"
        :ui="{ root: 'items-start text-left lg:items-end lg:text-right' }"
      />
    </template>

    <!-- Body: short bio message -->
    <p class="text-sm text-toned text-left lg:text-right">
      {{ founder.bioShort }}
    </p>

    <!-- Footer: social links -->
    <template #footer>
      <span class="w-auto lg:justify-end space-x-2">
        <UButton
          v-for="social in socialLinks"
          :key="social.label"
          :icon="social.icon"
          color="secondary"
          variant="ghost"
          size="sm"
          :to="social.to"
          :target="social.target"
          :aria-label="social.label"
        />
      </span>
    </template>
  </UCard>
</template>
