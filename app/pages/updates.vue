<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

// Fetch founder data from team collection
const { data: founderData } = await useFounder();

// Fetch config data for social links
const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();

// ✅ Non-blocking data fetch
const { data: updates, pending } = useAsyncData('updates', () =>
  queryCollection('updates').order('date', 'DESC').all(),
);

// Get social links
const socialLinks = pickSocialLinks(configData.value?.social.links || [], [
  'youtube',
  'github',
]);

useHead({
  title: 'Updates',
  meta: [
    {
      name: 'description',
      content: `${founderData.value?.story.mission} - Product updates and strategic decisions.`,
    },
  ],
});

// Authors for changelog
const authors = [
  {
    name: `${founderData.value?.profile.given_name} ${founderData.value?.profile.surname}`,
    avatar: founderData.value?.profile.avatar,
    to: socialLinks?.find((link) => link.platform === 'github')?.url,
   target: '_blank',
  },
];

// Hero links
const heroLinks = computed(() =>
  socialLinks.map((link) => ({
    label: `Follow on ${link.label}`,
    to: link.url,
    icon: link.platform,
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

// ✅ NEW: Expandable updates
const expandedUpdates = ref<Set<string>>(new Set());

const toggleUpdate = (version: string) => {
  if (expandedUpdates.value.has(version)) {
    expandedUpdates.value.delete(version);
  } else {
    expandedUpdates.value.add(version);
  }
};

const isExpanded = (version: string) => expandedUpdates.value.has(version);

// ✅ NEW: Scroll to top
const showScrollTop = ref(false);

onMounted(() => {
  const handleScroll = () => {
    showScrollTop.value = window?.scrollY > 500;
  };
  window?.addEventListener('scroll', handleScroll);
  onUnmounted(() => window?.removeEventListener('scroll', handleScroll));
});

const scrollToTop = () => {
  window?.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <UPage>
    <UPageHero
      icon="i-lucide-lightbulb"
      title="Updates"
      :description="`${founderData?.story.mission.split('.')[0]}.`"
      headline="Think different, ship faster"
      :links="heroLinks"
      class="bg-muted border-b"
    />

    <UPageBody>
      <UContainer>
        <!-- Loading skeleton -->
        <div v-if="pending" class="space-y-12">
          <div v-for="i in 3" :key="i" class="space-y-4">
            <USkeleton class="h-8 w-1/3" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
            <USkeleton class="h-64 w-full rounded-lg" />
          </div>
        </div>

        <!-- Empty state -->
        <UEmptyState
          v-else-if="!updates?.length"
          title="No updates yet"
          description="Check back soon for product updates and strategic decisions."
          icon="i-lucide-inbox"
        />

        <!-- Updates -->
        <UChangelogVersions v-else :indicator="false">
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
                'sticky top-(--ui-header-height) pt-6 -mt-6 flex flex-col items-end gap-3 min-w-[140px] mr-4',
              title: 'text-3xl font-bold pb-4',
              container: 'px-8',
            }"
          >
            <template #title>
              {{ update.title }}
            </template>

            <template #indicator>
              <!-- ✅ IMPROVED: Better visual hierarchy -->
              <div class="flex flex-col items-end gap-3 text-right">
                <!-- Version with subtle background -->
                <div
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/5 border border-primary/10"
                >
                  <UIcon name="i-lucide-tag" class="size-3.5 text-primary" />
                  <span class="text-sm font-semibold font-mono text-primary">
                    {{ update.version }}
                  </span>
                </div>

                <!-- Date with icon -->
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-calendar" class="size-3.5 text-muted" />
                  <NuxtTime
                    class="text-xs text-muted font-medium tracking-wide uppercase"
                    :datetime="update.date"
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                </div>
              </div>
            </template>

            <template #body>
              <!-- Expandable content -->
              <div v-if="!isExpanded(update.version)" class="pt-6">
                <div class="prose line-clamp-3">
                  <ContentRenderer v-if="update" :value="update" />
                </div>
                <UButton
                  variant="link"
                  icon="i-lucide-chevron-down"
                  trailing
                  class="mt-4"
                  @click="toggleUpdate(update.version)"
                >
                  Read more
                </UButton>
              </div>

              <!-- Full content when expanded -->
              <div v-else class="pt-6">
                <div class="prose max-w-none">
                  <ContentRenderer v-if="update" :value="update" />
                </div>
                <UButton
                  variant="link"
                  icon="i-lucide-chevron-up"
                  trailing
                  class="mt-4"
                  @click="toggleUpdate(update.version)"
                >
                  Show less
                </UButton>
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UContainer>
    </UPageBody>

    <!-- Scroll to top button -->
    <UButton
      v-if="showScrollTop"
      icon="i-lucide-arrow-up"
      size="lg"
      color="primary"
      class="fixed bottom-8 right-8 z-50 shadow-lg"
      aria-label="Scroll to top"
      @click="scrollToTop"
    />
  </UPage>
</template>
