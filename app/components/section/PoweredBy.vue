<script setup lang="ts">
const technologies = [
  {
    name: 'Nuxt',
    description: 'Full-stack Vue framework',
    icon: 'i-logos-nuxt-icon',
    version: 'v4.0+',
  },
  {
    name: 'Nuxt UI',
    description: 'Production-ready components',
    icon: 'i-logos-nuxt-icon',
    version: 'v3.3+',
  },
  {
    name: 'Tailwind',
    description: 'Utility-first CSS',
    icon: 'i-logos-tailwindcss-icon',
    version: 'v4 Engine',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe development',
    icon: 'i-logos-typescript-icon',
    version: 'v5.8+',
  },
  {
    name: 'VueUse',
    description: 'Composition utilities',
    icon: 'i-logos-vueuse',
    version: 'v13.7+',
  },
  {
    name: 'Shiki',
    description: 'Beautiful code highlighting',
    icon: 'i-lucide-code',
    version: 'Latest',
  },
  {
    name: 'Motion',
    description: 'Animation and transitions',
    icon: 'i-lucide-zap',
    version: 'v3.0+',
  },
];

const features = [
  {
    title: 'Lightning Fast',
    description:
      'Optimized build pipeline and runtime performance for instant loads',
    icon: 'i-lucide-zap',
  },
  {
    title: 'Type Safe',
    description: 'End-to-end TypeScript integration with full IDE support',
    icon: 'i-lucide-shield-check',
  },
  {
    title: 'Production Ready',
    description: 'Battle-tested stack used in thousands of apps',
    icon: 'i-lucide-rocket',
  },
];
</script>

<template>
  <UContainer>
    <UPageSection
      headline="Powered By"
      title="Modern Technology Stack"
      description="Built with cutting-edge tools and frameworks for performance, DX, and maintainability."
    >
      <div class="flex flex-col gap-2 w-full overflow-hidden">
        <UMarquee
          pause-on-hover
          :overlay="false"
          :ui="{ root: '[--gap:--spacing(4)]', content: 'w-auto py-1' }"
        >
          <UPageCard
            v-for="tech in technologies"
            :key="tech.name + '-a'"
            variant="subtle"
            :title="tech.name"
            :description="tech.description"
          >
            <template #leading>
              <UIcon :name="tech.icon" class="size-5 text-primary" />
            </template>
            <template #footer>
              <span
                class="text-xs font-mono px-2 py-1 rounded border border-default bg-background/60"
              >
                {{ tech.version }}
              </span>
            </template>
          </UPageCard>
        </UMarquee>

        <UMarquee
          pause-on-hover
          reverse
          :overlay="false"
          :ui="{ root: '[--gap:--spacing(4)]', content: 'w-auto py-1' }"
        >
          <UPageCard
            v-for="tech in technologies"
            :key="tech.name + '-b'"
            variant="subtle"
            :title="tech.name"
            :description="tech.description"
          >
            <template #leading>
              <UIcon :name="tech.icon" class="size-5 text-primary" />
            </template>
            <template #footer>
              <span
                class="text-xs font-mono px-2 py-1 rounded border border-default bg-background/60"
              >
                {{ tech.version }}
              </span>
            </template>
          </UPageCard>
        </UMarquee>
      </div>

      <div class="mt-12">
        <UPageGrid>
          <UPageCard
            v-for="(card, index) in features"
            :key="index"
            v-bind="card"
          />
        </UPageGrid>
      </div>
    </UPageSection>
  </UContainer>
</template>
