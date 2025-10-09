<script setup lang="ts">
const founder = useFlowSection('founder');

// Query updates collection
const { data: updates } = await useAsyncData('updates', () =>
  queryCollection('updates').order('date', 'DESC').all(),
);

console.log('updates content', updates.value);

useHead({
  title: 'Updates - Product Validator',
  meta: [
    {
      name: 'description',
      content:
        'Strategic decisions and philosophical shifts behind the Product Validator template.',
    },
  ],
});

const authors = [
  {
    name: `${founder.profile.given_name} ${founder.profile.surname}`,
    avatar: founder.profile.avatar,
    to: 'https://github.com/incubrain',
    target: '_blank',
  },
];
</script>

<template>
  <UPage>
    <UPageHero
      icon="i-lucide-lightbulb"
      title="Updates"
      description="Strategic decisions and philosophical shifts behind the template"
      headline="Think different, ship faster"
      :links="[
        {
          label: 'Follow on YouTube',
          to: 'https://www.youtube.com/@Incubrain',
          color: 'primary',
          icon: 'i-lucide-youtube',
          target: '_blank',
        },
        {
          label: 'Follow on GitHub',
          color: 'neutral',
          variant: 'ghost',
          to: 'https://github.com/incubrain/product-validator',
          icon: 'i-lucide-github',
          target: '_blank',
        },
      ]"
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
                <ContentRenderer v-if="update" :value="update" class="prose" />
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
