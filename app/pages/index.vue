<!-- app/pages/index.vue -->
<script setup lang="ts">
import { businessConfig } from '#shared/config/business';

const gettingStarted = {
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
    <ISectionHero />
    <ISectionPoweredBy />

    <ISectionStacking />

    <IUPageColumns preset="articles">
      <div v-for="i in 5" :key="i" class="text-center">
        <div
          class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1"
        >
          Some content
        </div>
        <div class="text-sm text-muted">Some description</div>
      </div>
    </IUPageColumns>

    <UPageSection
      :title="gettingStarted.title"
      :description="gettingStarted.subtitle"
      :links="[
        {
          label: gettingStarted.primaryCta,
          size: 'lg',
          color: 'primary',
          trailingIcon: 'i-lucide-users',
          to: businessConfig.contact.primary,
          target: '_blank',
        },
        {
          label: gettingStarted.secondaryCta,
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
        <!-- Code example -->
        <UCard variant="subtle" class="bg-elevated/50">
          <div class="text-sm font-medium mb-3">
            {{ gettingStarted.codeLabel }}
          </div>
          <pre class="text-sm bg-muted/30 p-4 rounded overflow-x-auto">
<code>{{ gettingStarted.codeSnippet }}</code>
</pre>
        </UCard>
      </template>
    </UPageSection>
  </UPageBody>
</template>
