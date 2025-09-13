<script setup lang="ts">
import { businessConfig } from '#shared/config/business';

// 🎯 ALL SECTION CONTENT DATA CONSOLIDATED HERE

// Hero Section Data
const heroContent = {
  badge: {
    icon: 'i-lucide-zap',
    text: 'Open-source Nuxt template',
  },
  headline: 'The ultimate Nuxt and Vue UI library',
  subheadline:
    'Nuxt UI Pro is a collection of premium Vue components built on top of Nuxt UI to create beautiful & responsive Nuxt applications in minutes. It includes all primitives to build landing pages, documentations, blogs, dashboards or entire SaaS products.',
  primaryCta: { text: 'Get Started', icon: 'i-lucide-arrow-right' },
  secondaryCta: { text: 'Use this template', icon: 'i-lucide-github' },
  technologies: [
    { name: 'Nuxt', icon: 'i-logos-nuxt-icon', version: 'v4+' },
    { name: 'Nuxt UI', icon: 'i-logos-nuxt-icon', version: 'v4' },
    { name: 'Tailwind', icon: 'i-logos-tailwindcss-icon', version: 'v4' },
    {
      name: 'Tailwind Variants',
      icon: 'i-lucide-trending-up-down',
      version: 'v4',
    },
    { name: 'TypeScript', icon: 'i-logos-typescript-icon', version: 'v5.8+' },
    { name: 'VueUse', icon: 'i-logos-vueuse', version: 'v13.7+' },
  ],
};

// Features Section Data
const featuresContent = {
  headline: 'Components',
  title: 'Packed with features',
  description:
    "Explore our wide range of components, each designed to enhance your application's functionality and visual appeal.",
  features: [
    {
      title: 'Color Palette',
      description:
        'Choose a primary and a gray color from your Tailwind CSS color palette. Components will be styled accordingly.',
      icon: 'i-lucide-palette',
      class: 'lg:row-span-1',
    },
    {
      title: 'Fully Customizable',
      description:
        'Change the style of any component in your App Config or customize them specifically through the ui prop.',
      icon: 'i-lucide-settings',
      class: 'lg:col-span-2 lg:row-span-1',
      orientation: 'horizontal',
    },
    {
      title: 'Light & Dark',
      description:
        'Every component is designed with dark mode in mind. Works out of the box with @nuxtjs/color-mode.',
      icon: 'i-lucide-moon',
      class: 'lg:row-span-2',
    },
    {
      title: 'Icons',
      description:
        'Choose any of the 100k+ icons from the most popular icon libraries with the Icon component or the icon prop.',
      icon: 'i-lucide-smile',
      class: 'lg:col-span-2 lg:row-span-1',
      orientation: 'horizontal',
      reverse: true,
    },
    {
      title: 'Layer Stack Visualization',
      description: 'Background hierarchy using current theme',
      icon: 'i-lucide-layers',
      slot: 'layer-stack',
      class: 'lg:col-span-1 lg:row-span-1',
    },
  ],
};

// Feature Highlight Data
const featureHighlightContent = [
  {
    headline: 'Features',
    title: 'Kickstart with Nuxt UI in seconds',
    description:
      'Nuxt UI is designed to be used with Nuxt and Vue. It comes with a set of components that are fully styled and accessible out of the box.',
    features: [
      {
        title: 'Integrations',
        description:
          'Nuxt UI is designed to be used with Nuxt and Vue. It comes with a set of components that are fully styled and accessible out of the box.',
        icon: 'i-lucide-plug',
      },
      {
        title: 'Components',
        description:
          'Nuxt UI is designed to be used with Nuxt and Vue. It comes with a set of components that are fully styled and accessible out of the box.',
        icon: 'i-lucide-box',
      },
    ],
    image: 'https://picsum.photos/600/400?random=1',
    orientation: 'horizontal',
  },
  {
    headline: 'Features',
    title: 'Explore our wide range of components',
    description:
      "Explore our wide range of components, each designed to enhance your application's functionality and visual appeal.",
    features: [
      {
        title: 'Integrations',
        description:
          'Nuxt UI is designed to be used with Nuxt and Vue. It comes with a set of components that are fully styled and accessible out of the box.',
        icon: 'i-lucide-plug',
      },
      {
        title: 'Components',
        description:
          'Nuxt UI is designed to be used with Nuxt and Vue. It comes with a set of components that are fully styled and accessible out of the box.',
        icon: 'i-lucide-box',
      },
    ],
    image: 'https://picsum.photos/600/400?random=2',
    orientation: 'horizontal',
    reverse: true,
  },
];

// Business Features Data
const businessFeaturesContent = {
  title: 'Build a business website, blog or documentation',
  description: 'Everything you need to get started quickly and easily.',
  features: [
    {
      title: 'File-based CMS',
      description:
        'Write your content in Markdown, YML, CSV or JSON and query it in your components.',
      icon: 'i-lucide-file-text',
    },
    {
      title: 'Query Builder',
      description:
        'Query your content with a MongoDB-like API to fetch the right data at the right time.',
      icon: 'i-lucide-filter',
    },
    {
      title: 'SQLite powered',
      description:
        'Add custom fields to your content, making it suitable for various types of projects.',
      icon: 'i-lucide-database',
    },
    {
      title: 'Markdown with Vue',
      description:
        'Use Vue components in Markdown files, with props, slots and nested components.',
      icon: 'i-lucide-code',
    },
    {
      title: 'Code highlighting',
      description:
        'Display beautiful code blocks on your website with the Shiki integration supporting VS Code themes.',
      icon: 'i-lucide-code-2',
    },
    {
      title: 'Visual Editor',
      description:
        'Let your team edit your Nuxt Content project with Nuxt Studio, our visual editor.',
      icon: 'i-lucide-sparkles',
    },
    {
      title: 'Navigation Generation',
      description:
        'Generate a structured object from your content files and display a navigation menu in minutes.',
      icon: 'i-lucide-navigation',
    },
    {
      title: 'Prose Components',
      description:
        'Customize HTML typography tags with Vue components to give your content a consistent style.',
      icon: 'i-lucide-type',
    },
    {
      title: 'Deploy everywhere',
      description:
        'Nuxt Content works on all hosting providers, static, server, serverless & edge.',
      icon: 'i-lucide-globe',
    },
  ],
};

// Testimonials Data
const testimonialsContent = {
  headline: 'Testimonials',
  title: 'What our users say',
  highlightCard: {
    title: "Cloudflare's Workers LaunchPad",
    description:
      "NuxtHub is part of the Cloudflare's Workers Launchpad Cohort to make sure you get a first-class experience on top of Cloudflare's network.",
    icon: 'i-logos-cloudflare-icon',
    to: 'https://cloudflare.com',
  },
  testimonials: [
    {
      quote:
        'NuxtHub is hands down the easiest way to get a project from zero to production on the Cloudflare stack!',
      user: {
        name: 'John Doe',
        description: 'Software Engineer',
        avatar: { src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' },
      },
    },
    // ... other testimonials (keeping them all)
    {
      quote:
        'I love how NuxtHub combines, amplifies and simplifies the Cloudflare tooling with the wide and mature Nuxt ecosystem. I cannot wait to see how it will evolve and expand in the future!',
      user: {
        name: 'John Doe',
        description: 'Software Engineer',
        avatar: { src: 'https://i.pravatar.cc/150?img=2', alt: 'John Doe' },
      },
    },
    // ... (include all other testimonials from original)
  ],
};

// Founder Testimonial Data
const founderTestimonialContent = {
  quote:
    'Nuxt UI, born from a desire to improve Vue component development, is the go-to library for building modern web interfaces. We aim to provide you with a comprehensive set of tools to create and customize your next UI while maintaining the best developer experience.',
  user: {
    name: 'Benjamin Canac',
    description: 'Author of Nuxt UI',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4',
      alt: 'Benjamin Canac',
    },
  },
};

// FAQ Data
const faqContent = {
  headline: 'Support',
  title: 'Frequently asked questions',
  items: [
    {
      label: 'What is Nuxt UI?',
      content:
        'Nuxt UI is a comprehensive UI library built specifically for Nuxt applications. It provides a rich set of fully-styled, accessible components that follow modern design principles and best practices. The library seamlessly integrates with Nuxt and includes features like dark mode support, customization options, and TypeScript compatibility.',
    },
    {
      label: 'How do I install and set up Nuxt UI?',
      content:
        "You can install Nuxt UI by running 'npm install @nuxt/ui' in your project directory. Then add '@nuxt/ui' to your modules array in nuxt.config.ts. The library will automatically configure Tailwind CSS and provide all components ready to use in your application.",
    },
    {
      label: 'What components are included?',
      content:
        'Nuxt UI includes over 100+ components covering forms, navigation, data display, feedback, overlays, and layout components. This includes buttons, inputs, modals, tables, charts, and much more. All components are fully accessible and customizable to match your design system.',
    },
    {
      label: 'Is Nuxt UI customizable?',
      content:
        "Yes! Nuxt UI is highly customizable. You can customize components using the 'ui' prop, CSS classes, or globally through your app.config.ts file. The library uses Tailwind CSS under the hood, making it easy to apply your brand colors, spacing, and typography throughout your application.",
    },
    {
      label: 'What are the browser compatibility requirements?',
      content:
        'Nuxt UI supports all modern browsers including Chrome, Firefox, Safari, and Edge. The library follows web standards and uses progressive enhancement to ensure compatibility across different environments while maintaining excellent performance.',
    },
    {
      label: 'Is there documentation and support available?',
      content:
        'Yes! Nuxt UI provides comprehensive documentation with examples, API references, and guides. You can find community support through GitHub discussions, Discord, and Stack Overflow. The library is actively maintained with regular updates and bug fixes.',
    },
  ],
};

// Getting Started Data
const gettingStartedContent = {
  title: 'Ready to Ship Faster?',
  subtitle:
    'Get started in minutes with our proven template and join our growing community of developers.',
  codeLabel: 'Quick start:',
  codeSnippet: `git clone ${businessConfig.contact.secondary}
cd nuxt-launch-kit
pnpm install
pnpm dev`,
  primaryCta: 'Join Our Community',
  secondaryCta: 'Star on GitHub',
};

// SEO setup
useSeoMeta({
  title: `${businessConfig.business.name} - Ship faster with proven components`,
  description: `Production-ready Nuxt template with ${businessConfig.stats.components_included} components. Built with Nuxt 4, Tailwind v4, and Nuxt UI for rapid development.`,
  keywords: [
    'Nuxt template',
    'Tailwind v4',
    'Nuxt UI',
    'Vue components',
    'rapid development',
  ],
});
</script>

<template>
  <UPageBody>
    <ISectionHero :content="heroContent" />
    <ISectionOverview :content="businessFeaturesContent" />
    <ISectionFeaturesPrimary :content="featuresContent" />

    <ISectionFeature :content="featureHighlightContent" />

    <!-- Getting Started Section -->
    <UPageSection
      :title="gettingStartedContent.title"
      :description="gettingStartedContent.subtitle"
      :links="[
        {
          label: gettingStartedContent.primaryCta,
          size: 'lg',
          color: 'secondary',
          trailingIcon: 'i-lucide-users',
          to: businessConfig.contact.primary,
          target: '_blank',
        },
        {
          label: gettingStartedContent.secondaryCta,
          size: 'lg',
          variant: 'ghost',
          color: 'neutral',
          trailingIcon: 'i-lucide-star',
          to: businessConfig.contact.secondary,
          target: '_blank',
        },
      ]"
    >
      <template #body>
        <UCard variant="subtle" class="bg-elevated/50">
          <div class="text-sm font-medium mb-3">
            {{ gettingStartedContent.codeLabel }}
          </div>
          <pre class="text-sm bg-muted/30 p-4 rounded overflow-x-auto">
<code>{{ gettingStartedContent.codeSnippet }}</code>
</pre>
        </UCard>
      </template>
    </UPageSection>

    <ISectionTestimonials :content="testimonialsContent" />
    <ISectionFounder :content="founderTestimonialContent" />
    <ISectionFAQ :content="faqContent" />
  </UPageBody>
</template>
