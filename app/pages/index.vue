<!-- app/pages/index.vue -->
<script setup lang="ts">
import type { PageContent, SectionMap } from '#shared/types/sections'
import { businessConfig } from '#shared/config/business'

const { getComponent } = useSectionComponents()

// Define page content inline using direct config values
const pageConfig: PageContent = {
  meta: {
    title: `${businessConfig.business.founder.name} • Nuxt Template Creator & AI Automation Expert`,
    description: `${businessConfig.business.founder.experience}. Creator of Nuxt Launch Kit template. Stop losing money to manual processes - get AI automation that pays for itself.`,
    keywords: ['Nuxt templates', 'AI automation', 'SaaS development', 'business automation', 'Nuxt Launch Kit'],
  },

  sections: [
    {
      type: 'hero',
      title: `Built in ${businessConfig.stats.deploy_time} with Nuxt Launch Kit`,
      subtitle: 'The same template powering this site is yours to download',
      description: `I'm ${businessConfig.business.founder.name} - SaaS developer, template creator, and AI automation expert.`,
      sectionIndex: 0,
      items: [
        {
          title: 'Template Creator',
          description: `${businessConfig.business.founder.experience} building SaaS products`,
          icon: 'i-lucide-code',
          iconColor: 'primary',
        },
      ],
      action: {
        text: 'Get the Template',
        link: '#template-download',
        description: `Free download • Deploy in ${businessConfig.stats.deploy_time}`,
      },
    },

    {
      type: 'results',
      title: 'Template Performance Metrics',
      subtitle: 'Real numbers from real implementations',
      sectionIndex: 1,
      items: [
        {
          value: businessConfig.stats.deploy_time,
          title: 'Deploy Time',
          description: 'From git clone to live site',
        },
        {
          value: businessConfig.stats.projects_count,
          title: 'Projects Built',
          description: 'Using this template system',
        },
        {
          value: businessConfig.stats.dev_time_saved,
          title: 'Dev Time Saved',
          description: 'Compared to building from scratch',
        },
        {
          value: businessConfig.stats.seo_ready,
          title: 'SEO Ready',
          description: 'Out-of-the-box optimization',
        },
      ],
    },

    {
      type: 'work',
      title: 'Why I Built Nuxt Launch Kit',
      subtitle: 'From developer frustration to template solution',
      sectionIndex: 2,
      items: [
        {
          title: 'Velocity-Obsessed Development',
          description: `${businessConfig.business.founder.experience} building SaaS products taught me speed trumps perfection.`,
          icon: 'i-lucide-timer',
        },
        {
          title: 'Stop Rebuilding the Same Things',
          description: 'Every project needs auth, SEO, analytics, and deployment. Why start from zero?',
          icon: 'i-lucide-repeat',
        },
        {
          title: 'Focus on Your Business Logic',
          description: 'Spend time building features that make money, not configuring webpack.',
          icon: 'i-lucide-target',
        },
      ],
    },

    {
      type: 'about',
      title: 'From SaaS Builder to Template Creator',
      story: `<p>After ${businessConfig.business.founder.experience} building SaaS products, I got tired of rebuilding the same infrastructure over and over. Authentication, SEO, analytics, deployment pipelines - every project needed the same foundation.</p><p>So I built Nuxt Launch Kit: a production-ready template that handles all the boring stuff so you can focus on building features that actually make money.</p>`,
      image: 'https://picsum.photos/800/800?random=10',
      sectionIndex: 3,
      items: [
        {
          value: businessConfig.business.founder.experience,
          label: 'SaaS Dev Experience',
        },
        {
          value: businessConfig.stats.projects_count,
          label: 'Projects Built',
        },
        {
          value: businessConfig.business.location.city,
          label: 'Based in',
        },
      ],
    },

    {
      type: 'cta',
      title: 'Get Nuxt Launch Kit + Professional Services',
      subtitle: 'Free template download or full customization services',
      sectionIndex: 4,
      items: [
        {
          title: 'Download Template',
          subtitle: 'Free • Open source • Full documentation',
          action: {
            text: 'Get Template',
            link: businessConfig.contact.secondary,
          },
        },
        {
          title: 'Professional Services',
          subtitle: 'Custom development • AI automation • Consultation',
          action: {
            text: 'Get Consultation',
            link: businessConfig.contact.primary,
          },
        },
      ],
    },

  ],
}

// Map sections with proper typing
const sections = computed((): SectionMap => {
  return mapSectionsToObject(pageConfig.sections)
})

// SEO setup
useSeoMeta({
  title: pageConfig.meta.title,
  description: pageConfig.meta.description,
  keywords: pageConfig.meta.keywords?.join(', '),
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <component
      :is="getComponent('hero', sections.hero?.variant, sections.hero?.sectionIndex || 0)"
      v-if="sections.hero"
      v-bind="sections.hero"
    />

    <!-- Results Section -->
    <component
      :is="getComponent('results', sections.results?.variant, sections.results?.sectionIndex || 1)"
      v-if="sections.results"
      v-bind="sections.results"
    />

    <!-- Work Section -->
    <component
      :is="getComponent('work', sections.work?.variant, sections.work?.sectionIndex || 2)"
      v-if="sections.work"
      v-bind="sections.work"
    />

    <!-- About Section -->
    <component
      :is="getComponent('about', sections.about?.variant, sections.about?.sectionIndex || 3)"
      v-if="sections.about"
      v-bind="sections.about"
    />

    <!-- CTA Section -->
    <component
      :is="getComponent('cta', sections.cta?.variant, sections.cta?.sectionIndex || 4)"
      v-if="sections.cta"
      v-bind="sections.cta"
    />
  </div>
</template>
