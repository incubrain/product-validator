<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { getSiteConfig, getFounder } = useContentCache();

const { data: founderData } = await getFounder();
const { data: configData } = await getSiteConfig();

// Fetch page metadata (hero, values, etc.)
const { data: page } = await useAsyncData('updates-page', () =>
  queryCollection('pages').path('/updates').first()
);

// Fetch updates list
const { data: updates, pending } = useAsyncData('updates-list', () =>
  queryCollection('pages')
    .where('path', 'LIKE', '/updates/%')
    .where('version', 'IS NOT NULL')
    .order('date', 'DESC')
    .all()
);

// Get social links
const socialLinks = pickSocialLinks(configData.value?.socials || [], [
  'youtube',
  'github',
  'x',
]);

useHead({
  title: page.value?.title || 'Updates',
  meta: [
    {
      name: 'description',
      content: page.value?.description || 'Product updates and strategic decisions.',
    },
  ],
});

// Authors for changelog
const authors = [
  {
    name: `${founderData.value?.given_name} ${founderData.value?.surname}`,
    avatar: founderData.value?.avatar,
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

// Values from frontmatter
const values = computed(() => page.value?.values || []);

// Expand All Logic
const expandedUpdates = ref<Set<string>>(new Set());

const isExpanded = (version: string) => expandedUpdates.value.has(version);

const toggleUpdate = (version: string) => {
  if (expandedUpdates.value.has(version)) {
    expandedUpdates.value.delete(version);
  } else {
    expandedUpdates.value.add(version);
  }
};

const allExpanded = computed(() => {
  if (!updates.value) return false;
  return updates.value.every(update => expandedUpdates.value.has(update.version));
});

const toggleAll = () => {
  if (!updates.value) return;
  
  if (allExpanded.value) {
    expandedUpdates.value.clear();
  } else {
    updates.value.forEach(update => expandedUpdates.value.add(update.version));
  }
};

// Scroll to top
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
      :title="page?.title"
      :description="page?.description"
      headline="Think different, ship faster"
      class="bg-muted border-b relative overflow-hidden"
    >
      <template #body>
         <div
          class="absolute top-0 inset-0 bg-grid-white/[0.02] pointer-events-none -z-10"
        />
        

        <!-- Values Section -->
        <div v-if="values?.length" class="max-w-4xl mx-auto pb-8 lg:pb-0 px-4">
          <!-- Desktop Grid -->
          <div class="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard
              v-for="(value, index) in values"
              :key="index"
              class="bg-default backdrop-blur-sm hover:bg-primary-900/20 transition-colors text-left"
            >
              <template #header>
                 <h3 class="font-bold text-sm">{{ value.title }}</h3>
              </template>
              <p class="text-xs text-muted">{{ value.description }}</p>
            </UCard>
          </div>

          <!-- Mobile Carousel -->
          <UCarousel
            v-slot="{ item }"
            class="md:hidden"
            :arrows="false"
            :dots="true"
            align="start"
            :items="values"
            :ui="{
              item: 'basis-[85%]',
              viewport: 'py-2',
              dot: 'w-2 h-2'
            }"
          >
            <UCard
              class="bg-background/50 backdrop-blur-sm h-full mx-2"
            >
              <template #header>
                 <h3 class="font-bold text-sm">{{ item.title }}</h3>
              </template>
              <p class="text-xs text-muted">{{ item.description }}</p>
            </UCard>
          </UCarousel>
        </div>

        <!-- Social Links Section -->
        <div v-if="heroLinks.length" class="flex flex-col items-center gap-4 py-8">
          <span class="text-sm font-medium text-muted">Follow Our Journey</span>
          <div class="flex items-center gap-2">
            <UButton
              v-for="link in heroLinks"
              :key="link.to"
              :icon="link.icon"
              :to="link.to"
              :target="link.target"
              color="neutral"
              variant="ghost"
              size="lg"
              :aria-label="link.label"
            />
          </div>
        </div>
      </template>
    </UPageHero>

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
        <UEmpty
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
                'hidden lg:flex lg:sticky lg:top-(--ui-header-height) pt-6 -mt-6 relative flex-col items-end gap-3 min-w-[140px] mr-4',
              title: 'text-3xl font-bold pb-4',
              container: 'px-8',
            }"
          >
            <template #title>
              <NuxtLink :to="update.path" class="hover:underline">
                {{ update.title }}
              </NuxtLink>
            </template>

            <template #indicator>
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
                <div class="flex gap-4 py-4 justify-between">
                  <UButton
                    variant="link"
                    icon="i-lucide-chevron-down"
                    trailing
                    class="px-0"
                    @click="toggleUpdate(update.version)"
                  >
                    Read more
                  </UButton>
                  <UButton
                    :to="update.path"
                    variant="link"
                    color="neutral"
                    icon="i-lucide-arrow-right"
                    class="px-0"
                    trailing
                  >
                    Full Update
                  </UButton>
                </div>
              </div>

              <!-- Full content when expanded -->
              <div v-else class="pt-6">
                <div class="prose max-w-none">
                  <ContentRenderer v-if="update" :value="update" />
                </div>
                <div class="flex gap-4 mt-4">
                   <UButton
                    variant="link"
                    icon="i-lucide-chevron-up"
                    trailing
                    @click="toggleUpdate(update.version)"
                  >
                    Show less
                  </UButton>
                   <UButton
                    :to="update.path"
                    variant="ghost"
                    color="neutral"
                    icon="i-lucide-arrow-right"
                    trailing
                  >
                    View full update
                  </UButton>
                </div>
              </div>
            </template>

            <template #authors>
              <div class="flex items-center justify-between gap-4 flex-wrap">
                <!-- Authors -->
                <div class="flex flex-wrap gap-x-4 gap-y-1.5">
                  <UUser
                    v-for="(author, index) in authors"
                    :key="index"
                    v-bind="author"
                  />
                </div>

                <!-- Version badge (mobile only) -->
                <div class="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/5 border border-primary/10">
                  <UIcon name="i-lucide-tag" class="size-3.5 text-primary" />
                  <span class="text-sm font-semibold font-mono text-primary">
                    {{ update.version }}
                  </span>
                </div>
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UContainer>
    </UPageBody>

    <!-- Scroll to top button -->
     <div 
         class="fixed bottom-8 right-8 z-50 space-x-2 "

     >
     
     <UButton
       v-if="showScrollTop"
       :icon="allExpanded ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'"
       size="lg"
       color="neutral"
       variant="soft"
       class="shadow-lg"
       :aria-label="allExpanded ? 'Collapse all' : 'Expand all'"
       @click="toggleAll"
     />
       <UButton
         v-if="showScrollTop"
         icon="i-lucide-arrow-up"
         size="lg"
         variant="soft"
         color="neutral"
         aria-label="Scroll to top"
         class="shadow-lg"
         @click="scrollToTop"
       />
     </div>
  </UPage>
</template>

<style scoped>
.bg-grid-white\/\[0\.02\] {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>
