<!-- components/IFounderCard.vue -->
<script setup lang="ts">
import { getSocialLinks } from '#shared/config/navigation';
import { businessConfig } from '#shared/config/business';

const socialLinks = getSocialLinks();

const emailLink = {
  label: 'Email',
  icon: 'i-lucide-mail',
  to: `mailto:${businessConfig.contact.email}`,
  target: '_self',
};

const contactLinks = [emailLink, ...socialLinks];

defineProps<{
  variant?: 'default' | 'mobile';
}>();
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
    <template #header>
      <UUser
        name="Hi, I'm Drew"
        description="Founder & Developer"
        :orientation="variant === 'mobile' ? 'horizontal' : 'vertical'"
        size="lg"
        :avatar="{
          src: 'https://avatars.githubusercontent.com/u/739984?v=4',
          alt: 'Drew MacGibbon',
        }"
        :ui="{ root: 'items-start text-left lg:items-end lg:text-right' }"
      />
    </template>

    <p class="text-sm text-toned text-left lg:text-right">
      Built this template after seeing too many founders overbuild before
      validating. Speed and clarity beat features every time.
    </p>

    <template #footer>
      <span class="w-auto lg:justify-end space-x-2">
        <UButton
          v-for="contact in contactLinks"
          :key="contact.label"
          :icon="contact.icon"
          color="secondary"
          variant="ghost"
          size="sm"
          :to="contact.to"
          :target="contact.target"
          :aria-label="contact.label"
        />
      </span>
    </template>
  </UCard>
</template>
