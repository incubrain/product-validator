<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const founder = useFlowSection('founder');

// Query updates collection
const { data: updates } = await useAsyncData('updates', () =>
  queryCollection('updates').order('date', 'DESC').all(),
);

// Get social links
const socialLinks = pickSocialLinks(founder.accessibility.links, [
  'youtube',
  'github',
]);

useHead({
  title: 'Updates',
  meta: [
    {
      name: 'description',
      content: `${founder.story.mission} - Product updates and strategic decisions.`,
    },
  ],
});

// Authors for changelog
const authors = [
  {
    name: `${founder.profile.given_name} ${founder.profile.surname}`,
    avatar: founder.profile.avatar,
    to: socialLinks?.find((link) => link.platform === 'github').url,
    target: '_blank',
  },
];

// Hero links (dynamic from founder accessibility)
const heroLinks = computed(() =>
  socialLinks.map((link) => ({
    label: `Follow on ${link.label}`,
    to: link.url,
    icon: link.platform, // Uses icon alias directly
    color:
      link.platform === 'youtube'
        ? 'primary'
        : ('neutral' as ButtonProps['color']),
    variant:
      link.platform === 'youtube'
        ? 'solid'
        : ('ghost' as ButtonProps['variant']),
    target: '_blank',
  })),
);
</script>

<template>
  <UPage>
    <UPageHero
      icon="i-lucide-lightbulb"
      title="Updates"
      :description="`${founder.story.mission.split('.')[0]}.`"
      headline="Think different, ship faster"
      :links="heroLinks"
      class="bg-muted border-b"
    />

    <UPageBody>
      <UContainer>
        <UChangelogVersions :indicator="false">
          <UChangelogVersion
            v-for="update in updates"
            :key="update.version"
            :title="update.title"
            :description="update.summary"
            :date="update.date"
            :authors="authors"
            :badge="undefined"
            :ui="{
              indicator:
                'sticky top-(--ui-header-height) pt-4 -mt-4 flex flex-col items-end',
            }"
          >
            <template #title>
              <h2 class="text-3xl font-bold pb-4">{{ update.title }}</h2>
            </template>

            <template #indicator>
              <UBadge :label="update.version" variant="soft" />
              <span class="text-sm text-muted">
                {{
                  new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              </span>
            </template>

            <template #body>
              <div class="prose max-w-none pt-6">
                <ContentRenderer v-if="update" :value="update" />
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
