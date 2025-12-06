<script setup lang="ts">
interface TeamMember {
  given_name: string;
  surname: string;
  role: string;
  bio: string;
  avatar?: {
    src: string;
    alt: string;
  };
  cta?: {
    primary: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  links?: Array<{
    label: string;
    url: string;
    icon: string;
  }>;
}

const props = defineProps<{
  member: TeamMember;
}>();
</script>

<template>
  <UCard>
    <div class="flex flex-col items-center gap-4 text-center">
      <!-- Avatar with subtle ring for prominence -->
      <NuxtImg
        v-if="member.avatar"
        :src="member.avatar.src"
        :alt="member.avatar.alt"
        class="ring-4 ring-gray-100 dark:ring-gray-800 w-32 rounded-full"
      />

      <!-- Name & Role - increase contrast -->
      <div class="space-y-1">
        <h1 class="text-2xl font-bold tracking-tight">
          {{ member.given_name }} {{ member.surname }}
        </h1>
        <p class="text-base font-medium text-gray-500 dark:text-gray-400">
          {{ member.role }}
        </p>
      </div>

      <!-- Bio - increase size and add breathing room -->
      <slot />

      <!-- Visual separator before CTAs -->
      <div class="w-full border-t border-gray-100 dark:border-gray-800 my-2" />

      <!-- Actions Slot -->
      <div class="flex flex-col gap-3 w-full">
        <slot name="actions" />
      </div>

      <!-- Social Links - Smaller, less prominent, horizontal -->
      <div
        v-if="member.links?.length"
        class="flex flex-col items-center gap-2 pt-2 w-full"
      >
        <span
          class="text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Follow Me
        </span>
        <div class="flex gap-2 justify-center">
          <UButton
            v-for="link in member.links"
            :key="link.url"
            :icon="link.icon"
            :aria-label="`Visit ${member.given_name}'s ${link.label} profile`"
            variant="ghost"
            size="md"
            :to="link.url"
            external
            target="_blank"
            color="neutral"
          />
        </div>
      </div>

      <!-- Footer Slot -->
      <div class="w-full mt-2">
        <slot name="footer" />
      </div>
    </div>
  </UCard>
</template>
