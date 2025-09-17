<!-- components/IFounderCard.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { getFounderInfo } from '#shared/config/business';

defineProps<{
  variant?: 'default' | 'mobile';
}>();

// 1) Source of truth: founder + contact from business config
const founder = getFounderInfo();

// 2) Dynamic name/description/avatar for UUser
const displayName = computed(() => `Hi, I'm ${founder.firstName}`);
const description = computed(() => founder.title || 'Founder');
const avatar = computed(() => founder.avatar);

// 3) Short, 1-sentence message for this small card
const shortMessage = computed(
  () =>
    founder.shortMessage ||
    'Built this template to replace overbuilding with fast, focused validation.',
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
        :avatar="avatar"
        :ui="{ root: 'items-start text-left lg:items-end lg:text-right' }"
      />
    </template>

    <!-- Body: one-sentence short message from founder config -->
    <p class="text-sm text-toned text-left lg:text-right">
      {{ shortMessage }}
    </p>

    <!-- Footer: socials (+ email ensured) -->
    <template #footer>
      <span class="w-auto lg:justify-end space-x-2">
        <UButton
          v-for="contact in founder.socials"
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
