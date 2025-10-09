<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const founder = useFlowSection('founder');

// Query updates collection
const { data: updates } = await useAsyncData('updates', () =>
  queryCollection('updates').order('date', 'DESC').all(),
);

// Get social links
const socialLinks = pickSocialLinks(founder.value.accessibility.links, [
  'youtube',
  'github',
]);

useHead({
  title: 'Updates',
  meta: [
    {
      name: 'description',
      content: `${founder.value.story.mission} - Product updates and strategic decisions.`,
    },
  ],
});

// Authors for changelog
const authors = [
  {
    name: `${founder.value.profile.given_name} ${founder.value.profile.surname}`,
    avatar: founder.value.profile.avatar,
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
              title: 'text-3xl font-bold pb-4',
            }"
          >
            <template #title>
              {{ update.title }}
            </template>

            <template #indicator>
              <UBadge :label="update.version" variant="soft" />
              <NuxtTime
                class="text-sm text-muted"
                :datetime="update.date"
                year="numeric"
                month="short"
                day="numeric"
              />
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
