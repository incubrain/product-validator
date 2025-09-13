<!-- pages/changelog.vue -->
<script setup lang="ts">
// Meta configuration
useHead({
  title: 'Changelog - Personal Brand Template',
  meta: [
    { name: 'description', content: 'Track the evolution of our intent-driven personal brand template system' },
  ],
})

// Hardcoded changelog data (will be replaced with Nuxt Content later)
const versions = [
  {
    title: 'Intent-Driven Color System',
    description: 'Introduced psychology-based color mapping with trust, authority, and urgency emotions. Integrated with Nuxt UI\'s theming system for seamless brand configuration.',
    date: '2025-01-15',
    badge: {
      label: 'v0.3.0',
      color: 'primary',
      variant: 'solid',
    },
    authors: [{
      name: 'Drew MacGibbon',
      avatar: {
        src: 'https://github.com/incubrain.png',
        alt: 'Drew MacGibbon',
      },
      to: 'https://github.com/incubrain',
      target: '_blank',
    }],
    // Key changes in this version
    content: `
### Key Features

- **Color Psychology Mapping**: Trust (emerald/green), Authority (blue/indigo), Urgency (amber/orange)
- **Nuxt UI Integration**: Seamless configuration through app.config.ts
- **CSS Variable Architecture**: Centralized color system with proper token hierarchy
- **Dark Theme Focus**: Enhanced granularity in neutral colors (700-950 range)

### Technical Improvements

- Eliminated hardcoded color values across all token files
- Unified color referencing through colors.css variables
- GitHub Dark theme alignment for better contrast
- Conversion-optimized color strategy (brand vs CTA colors)
    `,
  },
  {
    title: 'Foundation Architecture Design',
    description: 'Established the three-tier foundation: Application State (Level 0), Business Intent (Level 1), and Design Tokens (Level 2) with clear separation of concerns.',
    date: '2025-01-10',
    badge: {
      label: 'v0.2.0',
      color: 'secondary',
      variant: 'solid',
    },
    authors: [{
      name: 'Drew MacGibbon',
      avatar: {
        src: 'https://github.com/incubrain.png',
        alt: 'Drew MacGibbon',
      },
      to: 'https://github.com/incubrain',
      target: '_blank',
    }],
    content: `
### Architecture Decisions

- **Level 0**: Application State - Runtime context and development mode handling
- **Level 1**: Business Intent - Psychology-driven decision engine
- **Level 2**: Design Tokens - Intent-to-design translation layer

### System Hierarchy

Clear authority cascade established to prevent system conflicts and enable the "15-minute setup" goal. Intent drives configuration, not vice versa.

### Integration Strategy

Chose Nuxt UI native integration over parallel system development for better maintainability and future-proofing.
    `,
  },
  {
    title: 'Template System Concept',
    description: 'Initial template system overview with Intent → Architecture → Conversion philosophy. Established core mission and conversion-focused approach.',
    date: '2025-01-05',
    badge: {
      label: 'v0.1.0',
      color: 'success',
      variant: 'solid',
    },
    authors: [{
      name: 'Drew MacGibbon',
      avatar: {
        src: 'https://github.com/incubrain.png',
        alt: 'Drew MacGibbon',
      },
      to: 'https://github.com/incubrain',
      target: '_blank',
    }],
    content: `
### Core Philosophy

**Intent → Architecture → Conversion**: Business goals define technical architecture, not vice versa.

### Template Goals

- 15-minute setup from clone to deployed personal brand
- Conversion-focused component selection and layout
- AI-agent ready with programmatic content access
- Authority building for technical founders

### Technical Foundation

- Nuxt 4 native directory structure
- Tailwind CSS v4 integration
- Intent-driven configuration system
- "Best part is no part" philosophy
    `,
  },
]
</script>

<template>
  <IBoxSection>
    <div class="py-section">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold  mb-4">
          Template Changelog
        </h1>
        <p class="text-lg text-muted max-w-2xl mx-auto">
          Track the evolution of our intent-driven personal brand template system
        </p>
      </div>

      <!-- Changelog Versions -->
      <UChangelogVersions>
        <UChangelogVersion
          v-for="version in versions"
          :key="version.title"
          v-bind="version"
        />
      </UChangelogVersions>
    </div>
  </IBoxSection>
</template>
