<!-- app/pages/index.vue -->
<script setup lang="ts">
import type { PageContent, SectionMap } from '#shared/types/sections'

const { processObject } = useTemplateRenderer()
const { getComponent } = useSectionComponents()

// Load YAML page content using Nuxt Content (not API endpoint)
const { data: pageConfig } = await useAsyncData('home-page', () =>
  queryCollection('pages').where('path', '=', '/landing')
    .first(),
) as { data: Ref<PageContent | null> }

console.log('pageConfig', pageConfig.value)

// Process templates and map sections with proper typing
const sections = computed((): SectionMap => {
  if (!pageConfig.value?.sections) return {}

  const processedSections = processObject(pageConfig.value.sections)
  return mapSectionsToObject(processedSections)
})

// SEO from processed meta
const processedMeta = computed(() =>
  pageConfig.value?.meta ? processObject(pageConfig.value.meta) : {},
)

useSeoMeta({
  title: computed(() => processedMeta.value.title),
  description: computed(() => processedMeta.value.description),
})

console.log('🔍 Sections Available:', Object.keys(sections.value))
console.log('📄 Page Config:', pageConfig.value)
</script>

<template>
  <div>
    <SectionTest4 />
    <SectionTest3 />
    <SectionTest2 />
    <SectionTest />
    <!-- Hero Section - Direct component resolution -->
    <component
      :is="getComponent('hero', sections.hero.variant, sections.hero.sectionIndex)"
      v-if="sections.hero"
      v-bind="sections.hero"
    />

    <!-- Results Section - Direct component resolution -->
    <component
      :is="getComponent('results', sections.results.variant, sections.results.sectionIndex)"
      v-if="sections.results"
      v-bind="sections.results"
    />

    <!-- Work Section -->
    <component
      :is="getComponent('work', sections.work.variant, sections.work.sectionIndex)"
      v-if="sections.work"
      v-bind="sections.work"
    />

    <!-- About Section -->
    <component
      :is="getComponent('about', sections.about.variant, sections.about.sectionIndex)"
      v-if="sections.about"
      v-bind="sections.about"
    />

    <!-- CTA Section -->
    <component
      :is="getComponent('cta', sections.cta.variant, sections.cta.sectionIndex)"
      v-if="sections.cta"
      v-bind="sections.cta"
    />

    <!-- FAQ Section -->
    <component
      :is="getComponent('faq', sections.faq.variant, sections.faq.sectionIndex)"
      v-if="sections.faq"
      v-bind="sections.faq"
    />
  </div>
</template>
