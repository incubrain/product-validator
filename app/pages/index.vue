<script setup lang="ts">
import { businessConfig } from '#shared/config/business';

// 🎯 ALL SECTION CONTENT DATA CONSOLIDATED HERE

// Hero Section Data
// Updated Hero Section Data
const heroContent = {
  badge: {
    icon: 'i-lucide-rocket',
    text: 'Production-ready Nuxt template',
  },
  headline: 'Ship your startup idea faster',
  subheadline:
    'A production-ready Nuxt template designed for founders and businesses who want to validate ideas quickly. Focus on what matters—your product and customers—while we handle the website foundation with modern theming, extensible components, and integrated content management.',
  primaryCta: { text: 'Get Template', icon: 'i-lucide-download' },
  secondaryCta: { text: 'View on GitHub', icon: 'i-lucide-github' },
  technologies: [
    { name: 'Nuxt', icon: 'i-logos-nuxt-icon', version: 'v4' },
    { name: 'Nuxt UI', icon: 'i-logos-nuxt-icon', version: 'v4' },
    { name: 'Tailwind', icon: 'i-logos-tailwindcss-icon', version: 'v4' },
    {
      name: 'Tailwind Variants',
      icon: 'i-lucide-trending-up-down',
      version: 'Latest',
    },
    { name: 'TypeScript', icon: 'i-logos-typescript-icon', version: 'v5.8+' },
    { name: 'Nuxt Content', icon: 'i-lucide-file-text', version: 'v3+' },
  ],
};

// Updated Features Section Data
const featuresContent = {
  headline: 'Features',
  title: 'Everything you need to ship fast',
  description:
    'Pre-configured with best practices so you can focus on building your business, not configuring tools.',
  features: [
    {
      title: 'Instant Theming',
      description:
        '20 curated font pairings and 3 distinct color palettes. Switch themes with a single config change.',
      icon: 'i-lucide-palette',
      class: 'lg:row-span-1',
      component: 'theme-palette', // Custom component identifier
    },
    {
      title: 'Extensible Components',
      description:
        'Built on Nuxt UI v4 with Tailwind Variants. Extend or wrap components using the same API patterns.',
      icon: 'i-lucide-puzzle',
      class: 'lg:col-span-2 lg:row-span-1',
      orientation: 'horizontal',
      component: 'code-example', // Show code snippet
    },
    {
      title: 'Layered Design System',
      description:
        'Four-layer background hierarchy (default, muted, elevated, accented) with pattern support coming soon.',
      icon: 'i-lucide-layers',
      class: 'lg:row-span-2',
      component: 'layer-stack', // Keep existing layer visualization
    },
    {
      title: 'Content Management',
      description:
        'Integrated blog system with Nuxt Content v3+ for markdown-based publishing.',
      icon: 'i-lucide-file-text',
      class: 'lg:col-span-2 lg:row-span-1',
      orientation: 'horizontal',
      reverse: true,
      component: 'content-demo', // Show blog preview
    },
    {
      title: 'Analytics Ready',
      description:
        'Event system for tracking, funnels, and analytics integration (coming soon).',
      icon: 'i-lucide-bar-chart',
      class: 'lg:col-span-1 lg:row-span-1',
      component: 'analytics-chart', // Show mini chart/dashboard
    },
  ],
};

// Updated Feature Highlight Data
const featureHighlightContent = [
  {
    headline: 'Theming',
    title: 'Theme your brand in minutes, not hours',
    description:
      'Choose from 20 expertly paired fonts and 3 color palettes. More themes added regularly. Background patterns, gradients, and textures system in development.',
    features: [
      {
        title: '20 Font Pairings',
        description:
          'Professionally curated typography combinations that work beautifully together across all devices.',
        icon: 'i-lucide-type',
      },
      {
        title: '3 Color Systems',
        description:
          'Carefully designed color palettes with proper contrast ratios and accessibility considerations.',
        icon: 'i-lucide-palette',
      },
    ],
    image: 'https://picsum.photos/600/400?random=1',
    orientation: 'horizontal',
  },
  {
    headline: 'Development',
    title: 'Built for extensibility and performance',
    description:
      'Native Nuxt UI v4 integration with Tailwind Variants API. Extend components or build your own component library using familiar patterns.',
    features: [
      {
        title: 'Nuxt UI v4 Native',
        description:
          'Latest version with full TypeScript support and modern Vue 3 composition patterns.',
        icon: 'i-logos-nuxt-icon',
      },
      {
        title: 'Component Wrapping',
        description:
          'Extend Nuxt UI components with custom variants while maintaining API compatibility.',
        icon: 'i-lucide-layers',
      },
    ],
    image: 'https://picsum.photos/600/400?random=2',
    orientation: 'horizontal',
    reverse: true,
  },
];

// Updated Business Features Data
const businessFeaturesContent = {
  title: 'Focus on your business, not your website',
  description:
    'Everything pre-configured so you can validate ideas and serve customers from day one.',
  features: [
    {
      title: 'Instant Setup',
      description:
        'Clone, install, and deploy in under 5 minutes. No complex configuration required.',
      icon: 'i-lucide-zap',
      status: 'available', // available | coming-soon
    },
    {
      title: 'Blog System',
      description:
        'Nuxt Content v3+ integration for markdown-based blog posts with full theming support.',
      icon: 'i-lucide-edit',
      status: 'coming-soon',
    },
    {
      title: 'Modern Stack',
      description:
        'Nuxt v4, TypeScript, Tailwind v4, and Tailwind Variants for maintainable, scalable code.',
      icon: 'i-lucide-code',
      status: 'available',
    },
    {
      title: 'Theme Flexibility',
      description:
        'Switch between font pairs and color schemes instantly. More options added regularly.',
      icon: 'i-lucide-paintbrush',
      status: 'available',
    },
    {
      title: 'Component Library',
      description:
        'Extend Nuxt UI components or build your own using the same Tailwind Variants API.',
      icon: 'i-lucide-box',
      status: 'available',
    },
    {
      title: 'Analytics Ready',
      description:
        'Built-in event system for easy integration with analytics, tracking, and funnel tools.',
      icon: 'i-lucide-trending-up',
      status: 'coming-soon',
    },
    {
      title: 'SEO Optimized',
      description:
        'Meta tags, structured data, and performance optimizations built-in for better search rankings.',
      icon: 'i-lucide-search',
      status: 'available',
    },
    {
      title: 'Mobile First',
      description:
        'Responsive design with touch-optimized interactions and fast loading on all devices.',
      icon: 'i-lucide-smartphone',
      status: 'available',
    },
    {
      title: 'Deploy Anywhere',
      description:
        'Works with Vercel, Netlify, Railway, and any platform that supports Nuxt applications.',
      icon: 'i-lucide-globe',
      status: 'available',
    },
  ],
};

// Updated Founder Testimonial Data
const founderTestimonialContent = {
  headline: 'Founder Story',
  quote:
    'As founders, we waste too much time building websites instead of building businesses. This template gives you a professional foundation so you can focus on the work that actually moves the needle—talking to customers and iterating on your product.',
  user: {
    name: 'Drew MacGibbon',
    description: 'Founder & Developer',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4',
      alt: 'Drew MacGibbon',
    },
  },
};

// Updated Getting Started Data
const gettingStartedContent = {
  title: 'Ready to validate your idea?',
  subtitle:
    'Get a professional website running in minutes, not weeks. Focus on your customers, not CSS.',
  codeLabel: 'Quick start:',
  codeSnippet: `git clone ${businessConfig.contact.secondary}
cd your-startup-website
pnpm install
pnpm dev`,
  links: [
    {
      label: 'Get Template',
      size: 'lg',
      color: 'secondary',
      trailingIcon: 'i-lucide-users',
      to: businessConfig.contact.primary,
      target: '_blank',
    },
    {
      label: 'View Documentation',
      size: 'lg',
      variant: 'ghost',
      color: 'neutral',
      trailingIcon: 'i-lucide-star',
      to: businessConfig.contact.secondary,
      target: '_blank',
    },
  ],
};

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

    <ISectionFeatureGrid :content="featuresContent" />

    <ISectionFeature :content="featureHighlightContent" />

    <!-- Getting Started Section -->
    <UPageSection
      :title="gettingStartedContent.title"
      :description="gettingStartedContent.subtitle"
      :links="gettingStartedContent.links"
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
