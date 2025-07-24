<script setup lang="ts">
// Hardcoded author information for Drew MacGibbon
const authorInfo = {
  name: 'Drew MacGibbon',
  title: 'CEO & Co-Founder',
  company: 'Incubrain',
  bio: 'Drew is the CEO and Co-Founder of Incubrain, leading the development of AI automation solutions for businesses worldwide. With a background in space technology and a passion for cutting-edge AI development, Drew focuses on building practical AI solutions that deliver measurable ROI for companies across various industries.',
  avatar: '/images/team/drew-macgibbon.jpg',
  social: {
    linkedin: 'https://linkedin.com/in/drewmacgibbon',
    github: 'https://github.com/drewmacgibbon',
    twitter: 'https://twitter.com/drewmacgibbon',
  },
}

const socialLinks = computed(() =>
  [
    {
      icon: 'i-lucide-linkedin',
      to: authorInfo.social.linkedin,
      label: 'LinkedIn',
      show: !!authorInfo.social.linkedin,
    },
    {
      icon: 'i-lucide-github',
      to: authorInfo.social.github,
      label: 'GitHub',
      show: !!authorInfo.social.github,
    },
    {
      icon: 'i-lucide-twitter',
      to: authorInfo.social.twitter,
      label: 'Twitter',
      show: !!authorInfo.social.twitter,
    },
  ].filter((link) => link.show),
)
</script>

<template>
  <div class="my-12">
    <UCard
      variant="outline"
      class="overflow-hidden"
    >
      <div class="p-6">
        <div class="flex items-start space-x-4">
          <!-- Avatar -->
          <UAvatar
            :src="authorInfo.avatar"
            :alt="authorInfo.name"
            size="xl"
            class="ring-2 ring-zinc-200 dark:ring-zinc-700"
          >
            <UIcon
              name="i-lucide-user"
              class="size-8"
            />
          </UAvatar>

          <!-- Author Info -->
          <div class="flex-1 space-y-3">
            <div>
              <h4 class="text-lg font-semibold text-zinc-900 dark:text-white">
                {{ authorInfo.name }}
              </h4>
              <p class="text-sm text-primary font-medium">
                {{ authorInfo.title }}, {{ authorInfo.company }}
              </p>
            </div>

            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ authorInfo.bio }}
            </p>

            <!-- Social Links -->
            <div
              v-if="socialLinks.length"
              class="flex items-center space-x-2 pt-2"
            >
              <span class="text-xs text-zinc-500 dark:text-zinc-400 mr-2">Connect:</span>
              <UButton
                v-for="link in socialLinks"
                :key="link.label"
                variant="ghost"
                size="xs"
                :icon="link.icon"
                :to="link.to"
                :aria-label="link.label"
                target="_blank"
                class="text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
