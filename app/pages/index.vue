<!-- app/pages/index.vue -->
<script setup lang="ts">
import { businessConfig } from '#shared/config/business'

// Content configuration
const content = {
  hero: {
    headline: 'Ship faster with',
    brandName: businessConfig.business.name,
    subtitle: `${businessConfig.business.description}. Join our community and stop rebuilding the same components.`,
    primaryCta: 'Join Community',
    secondaryCta: 'View on GitHub',
    founderCredit: `Built by ${businessConfig.business.founder.name} • ${businessConfig.business.founder.experience}`,
  },

  technologies: {
    title: 'Built with Modern Technologies',
    subtitle: 'Leveraging the latest tools and frameworks for optimal developer experience and performance.',
    items: [
      { name: 'Nuxt 4', description: 'Latest framework features', icon: 'i-lucide-zap' },
      { name: 'Tailwind v4', description: 'Cutting-edge CSS engine', icon: 'i-lucide-palette' },
      { name: 'Tailwind Variants', description: 'Component styling system', icon: 'i-lucide-layers' },
      { name: 'Nuxt UI', description: 'Professional components', icon: 'i-lucide-component' },
      { name: 'VueUse', description: 'Composition utilities', icon: 'i-lucide-pocket-knife' },
      { name: 'TypeScript', description: 'Type-safe development', icon: 'i-lucide-shield-check' },
    ],
  },

  components: {
    title: 'Layout Components Included',
    subtitle: 'Production-ready layout primitives that handle the common patterns so you can focus on your unique features.',
    viewAllText: 'View All Components',
    items: [
      { name: 'Stack', description: 'Vertical & horizontal layouts', demo: 'stack' },
      { name: 'Grid', description: 'Responsive grid patterns', demo: 'grid' },
      { name: 'Split', description: 'Two-column layouts', demo: 'split' },
      { name: 'Container', description: 'Content width control', demo: 'container' },
      { name: 'Cluster', description: 'Flexible grouping', demo: 'cluster' },
      { name: 'Frame', description: 'Aspect ratio containers', demo: 'frame' },
    ],
  },

  demos: {
    masonry: {
      title: 'Masonry Layout Demo',
      components: ['ILayoutColumns', 'ContentImage'],
      description: 'Pinterest-style masonry layout with varied image heights',
      items: [
        {
          image: { src: '/images/demo/demo-1.jpg', alt: 'Tall image', width: 200, height: 400 },
        },
        {
          image: { src: '/images/demo/demo-2.jpg', alt: 'Short image', width: 200, height: 200 },
        },
        {
          image: { src: '/images/demo/demo-3.jpg', alt: 'Very tall image', width: 200, height: 500 },
        },
        {
          image: { src: '/images/demo/demo-4.jpg', alt: 'Medium image', width: 200, height: 250 },
        },
        {
          image: { src: '/images/demo/demo-5.jpg', alt: 'Tall image', width: 200, height: 350 },
        },
        {
          image: { src: '/images/demo/demo-6.jpg', alt: 'Short image', width: 200, height: 180 },
        },
        {
          image: { src: '/images/demo/demo-7.jpg', alt: 'Very tall image', width: 200, height: 450 },
        },
        {
          image: { src: '/images/demo/demo-8.jpg', alt: 'Short image', width: 200, height: 220 },
        },
        {
          image: { src: '/images/demo/demo-9.jpg', alt: 'Tall image', width: 200, height: 380 },
        },
      ],
    },
    scrollBox: {
      title: 'Scroll Box Demo',
      components: ['ILayoutScrollBox', 'ILayoutCluster'],
      description: 'Horizontal scrolling with snap behavior for image galleries',
      content: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Gallery ${i + 1}`,
        image: { src: `/images/demo/demo-${i + 1}.jpg`, alt: `Gallery ${i + 1} preview` },
      })),
    },

    float: {
      title: 'Float Layout Demo',
      components: ['ILayoutFloat', 'ContentText'],
      description: 'Text wrapping around floated elements with responsive behavior',
      content: {
        text: 'lorem_300',
        floatedElement: {
          title: 'Floated Content',
          image: { src: '/images/demo/demo-1.jpg', alt: 'Float demo' },
        },
      },
    },
    codeExample: {
      title: 'Real Implementation Code',
      components: ['ContentProsePre', 'ILayoutStack'],
      description: 'See how easy it is to build the masonry layout above',
      code: `<template>
  <ILayoutColumns variant="masonry" gap="md" spacing="md">
    <div
      v-for="item in items"
      :key="item.title"
      class="rounded-lg"
    >
        <ContentImage
          :src="item.image.src"
          :alt="item.image.alt"
          class="rounded-lg"
        />
    </div>
  </ILayoutColumns>
</template>
`,
    },
  },

  gettingStarted: {
    title: 'Ready to Ship Faster?',
    subtitle: 'Get started in minutes with our proven template and join our growing community of developers.',
    codeLabel: 'Quick start:',
    codeSnippet: `git clone ${businessConfig.contact.secondary}
cd nuxt-launch-kit
pnpm install
pnpm dev`,
    primaryCta: 'Join Our Community',
    secondaryCta: 'Star on GitHub',
  },
}

const stats = [
  { value: businessConfig.stats.setup_time, label: 'Setup time' },
  { value: businessConfig.stats.launch_ready, label: 'Launch ready' },
  { value: businessConfig.stats.components_included, label: 'Components' },
  { value: businessConfig.stats.time_saved, label: 'Time saved' },
]

// SEO setup
useSeoMeta({
  title: `${businessConfig.business.name} - Ship faster with proven components`,
  description: `Production-ready Nuxt template with ${businessConfig.stats.components_included} components. Built with Nuxt 4, Tailwind v4, and Nuxt UI for rapid development.`,
  keywords: ['Nuxt template', 'Tailwind v4', 'Nuxt UI', 'Vue components', 'rapid development'],
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <ISection variant="hero">
      <ILayoutStack
        variant="centered"
        gap="xl"
      >
        <!-- Main headline -->
        <ILayoutStack
          variant="centered"
          gap="md"
        >
          <h1 class="text-4xl md:text-6xl font-bold text-center text-highlighted">
            {{ content.hero.headline }}
            <span class="text-primary">{{ content.hero.brandName }}</span>
          </h1>

          <p class="text-xl md:text-2xl text-center text-muted max-w-2xl">
            {{ content.hero.subtitle }}
          </p>
        </ILayoutStack>

        <!-- CTA Buttons -->
        <ILayoutCluster variant="centered">
          <UButton
            size="lg"
            color="primary"
            :to="businessConfig.contact.primary"
            target="_blank"
            trailing-icon="i-lucide-external-link"
          >
            {{ content.hero.primaryCta }}
          </UButton>

          <UButton
            size="lg"
            variant="outline"
            color="secondary"
            :to="businessConfig.contact.secondary"
            target="_blank"
            trailing-icon="i-lucide-github"
          >
            {{ content.hero.secondaryCta }}
          </UButton>
        </ILayoutCluster>

        <!-- Quick stats -->
        <ILayoutGrid
          variant="quarters"
          gap="md"
          class="w-full max-w-2xl"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center p-4 bg-elevated/50 rounded-lg border border-default"
          >
            <div class="text-2xl font-bold text-secondary">
              {{ stat.value }}
            </div>
            <div class="text-sm text-muted">
              {{ stat.label }}
            </div>
          </div>
        </ILayoutGrid>
      </ILayoutStack>
    </ISection>

    <!-- Technologies Section -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <ILayoutStack
          variant="centered"
          gap="md"
        >
          <h2 class="text-3xl font-bold text-center text-highlighted">
            {{ content.technologies.title }}
          </h2>
          <p class="text-lg text-center text-muted max-w-2xl">
            {{ content.technologies.subtitle }}
          </p>
        </ILayoutStack>

        <ILayoutGrid
          variant="thirds"
          gap="lg"
        >
          <div
            v-for="tech in content.technologies.items"
            :key="tech.name"
            class="p-6 bg-elevated/50 rounded-lg border border-default hover:border-secondary/50 transition-colors"
          >
            <ILayoutStack gap="sm">
              <UIcon
                :name="tech.icon"
                class="w-8 h-8 text-info"
              />
              <h3 class="text-lg font-semibold text-highlighted">
                {{ tech.name }}
              </h3>
              <p class="text-muted">
                {{ tech.description }}
              </p>
            </ILayoutStack>
          </div>
        </ILayoutGrid>
      </ILayoutStack>
    </ISection>

    <!-- Component Showcase -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <!-- Section header with component badges -->
        <div class="relative">
          <div class="absolute top-0 right-0 flex gap-2">
            <UBadge
              variant="soft"
              color="success"
              size="xs"
            />
            <UBadge
              variant="soft"
              color="success"
              size="xs"
            >
              ILayoutStack
            </UBadge>
          </div>

          <ContentTitle
            variant="center"
            :heading="{ text: content.components.title, level: 2 }"
            :subtitle="{ text: content.components.subtitle }"
          />
        </div>

        <!-- Component grid -->
        <ILayoutGrid
          variant="thirds"
          gap="lg"
        >
          <div
            v-for="component in content.components.items"
            :key="component.name"
            class="group p-6 bg-elevated/50 rounded-lg border border-default hover:border-success/50 transition-colors"
          >
            <ILayoutStack gap="md">
              <!-- Mini visual demo -->
              <div class="h-24 bg-muted/30 rounded border-2 border-dashed border-muted/50 flex items-center justify-center">
                <div class="text-xs text-muted font-mono">
                  {{ component.demo }} demo
                </div>
              </div>

              <ILayoutStack gap="xs">
                <ContentHeading
                  :level="3"
                  :text="component.name"
                />
                <ContentText
                  variant="description"
                  :text="component.description"
                />
              </ILayoutStack>

              <NuxtLink
                :to="`/showcase/${component.demo}`"
                class="inline-flex items-center gap-1 text-sm text-success hover:text-success/80 transition-colors"
              >
                View demo
                <UIcon
                  name="i-lucide-arrow-right"
                  class="w-3 h-3"
                />
              </NuxtLink>
            </ILayoutStack>
          </div>
        </ILayoutGrid>

        <!-- View all components link -->
        <div class="text-center">
          <UButton
            variant="outline"
            color="success"
            to="/showcase"
            trailing-icon="i-lucide-layout-template"
          >
            {{ content.components.viewAllText }}
          </UButton>
        </div>
      </ILayoutStack>
    </ISection>

    <!-- Masonry Demo Section -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <!-- Section header with component badges -->
        <div class="relative">
          <div class="absolute top-0 right-0 flex gap-2">
            <UBadge
              variant="soft"
              color="info"
              size="xs"
            >
              ILayoutColumns
            </UBadge>
            <UBadge
              variant="soft"
              color="info"
              size="xs"
            >
              ILayoutStack
            </UBadge>
          </div>

          <ContentTitle
            variant="center"
            :heading="{ text: content.demos.masonry.title, level: 2 }"
            :subtitle="{ text: content.demos.masonry.description }"
          />
        </div>

        <!-- Masonry layout demo -->
        <WipResize>
          <ILayoutColumns
            variant="auto"
            gap="sm"
            spacing="sm"
          >
            <div
              v-for="(item, index) in content.demos.masonry.items"
              :key="index"
              class="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer "
            >
              <ContentImage
                :src="item.image.src"
                :alt="item.image.alt"
                :width="item.image.width"
                :height="item.image.height"
                class="w-full h-auto group-hover:scale-105 transition-transform duration-200 rounded-xl overflow-hidden"
                loading="lazy"
              />

              <!-- Pinterest-style overlay on hover -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
            </div>
          </ILayoutColumns>
        </WipResize>
      </ILayoutStack>
    </ISection>

    <ISection variant="default">
      <ILayoutStack gap="xl">
        <!-- Section header with component badges -->
        <div class="relative">
          <div class="absolute top-0 right-0 flex gap-2">
            <UBadge
              variant="soft"
              color="secondary"
              size="xs"
            >
              ContentProsePre
            </UBadge>
            <UBadge
              variant="soft"
              color="secondary"
              size="xs"
            >
              ILayoutStack
            </UBadge>
          </div>

          <ContentTitle
            variant="center"
            :heading="{ text: content.demos.codeExample.title, level: 2 }"
            :subtitle="{ text: content.demos.codeExample.description }"
          />
        </div>

        <!-- Code example -->
        <ContentProsePre
          :code="content.demos.codeExample.code"
          language="vue"
          filename="MasonryLayout.vue"
          theme="mac"
        />
      </ILayoutStack>
    </ISection>

    <!-- ScrollBox Demo Section -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <!-- Section header -->
        <div class="relative">
          <div class="absolute top-0 right-0 flex gap-2">
            <UBadge
              variant="soft"
              color="warning"
              size="xs"
            >
              ILayoutScrollBox
            </UBadge>
            <UBadge
              variant="soft"
              color="warning"
              size="xs"
            >
              ILayoutCluster
            </UBadge>
          </div>

          <ContentTitle
            variant="center"
            :heading="{ text: content.demos.scrollBox.title, level: 2 }"
            :subtitle="{ text: content.demos.scrollBox.description }"
          />
        </div>

        <!-- Horizontal carousel -->
        <ILayoutScrollBox
          direction="x"
          height="auto"
          snap="x-proximity"
          padding="lg"
          gap="sm"
        >
          <div
            v-for="item in content.demos.scrollBox.content"
            :key="item.id"
            class="flex-shrink-0 w-80 snap-center p-4 bg-elevated/50 rounded-lg border border-default"
          >
            <ILayoutStack gap="sm">
              <ContentImage
                :src="item.image.src"
                :alt="item.image.alt"
                aspect-ratio="square"
                :height="200"
                :width="200"
                class="rounded"
              />
              <ContentHeading
                :level="4"
                :text="item.title"
              />
            </ILayoutStack>
          </div>
        </ILayoutScrollBox>
      </ILayoutStack>
    </ISection>

    <!-- Add Float Demo Section -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <!-- Section header -->
        <div class="relative">
          <div class="absolute top-0 right-0 flex gap-2">
            <UBadge
              variant="soft"
              color="info"
              size="xs"
            >
              ILayoutFloat
            </UBadge>
            <UBadge
              variant="soft"
              color="info"
              size="xs"
            >
              ContentText
            </UBadge>
          </div>

          <ContentTitle
            variant="center"
            :heading="{ text: content.demos.float.title, level: 2 }"
            :subtitle="{ text: content.demos.float.description }"
          />
        </div>

        <!-- Float demo -->
        <div class="relative min-h-[400px] p-6 bg-elevated/50 rounded-lg border border-default">
          <ILayoutFloat
            variant="right"
            clear="none"
            responsive="stack-mobile"
            class="relative z-10"
          >
            <ILayoutStack
              gap="sm"
              class="w-84 aspect-video p-4 bg-secondary/10 border border-secondary/20 rounded-lg"
            >
              <ContentImage
                :src="content.demos.float.content.floatedElement.image.src"
                :alt="content.demos.float.content.floatedElement.image.alt"
                aspect-ratio="video"
                class="rounded"
              />
              <ContentHeading
                class="text-center"
                :level="5"
                :text="content.demos.float.content.floatedElement.title"
              />
            </ILayoutStack>
          </ILayoutFloat>

          <ContentText
            variant="justified"
            :text="content.demos.float.content.text"
          />
        </div>
      </ILayoutStack>
    </ISection>

    <!-- Getting Started -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <ILayoutStack
          variant="centered"
          gap="md"
        >
          <h2 class="text-3xl font-bold text-center text-highlighted">
            {{ content.gettingStarted.title }}
          </h2>
          <p class="text-lg text-center text-muted">
            {{ content.gettingStarted.subtitle }}
          </p>
        </ILayoutStack>

        <!-- Code example -->
        <div class="bg-elevated/50 rounded-lg border border-default p-6">
          <ILayoutStack gap="sm">
            <div class="text-sm font-medium text-highlighted">
              {{ content.gettingStarted.codeLabel }}
            </div>
            <pre class="text-sm bg-muted/30 p-4 rounded overflow-x-auto"><code>{{ content.gettingStarted.codeSnippet }}</code></pre>
          </ILayoutStack>
        </div>

        <!-- Final CTA -->
        <ILayoutStack
          variant="centered"
          gap="md"
        >
          <ILayoutCluster variant="centered">
            <UButton
              size="lg"
              color="primary"
              :to="businessConfig.contact.primary"
              target="_blank"
              trailing-icon="i-lucide-users"
            >
              {{ content.gettingStarted.primaryCta }}
            </UButton>

            <UButton
              size="lg"
              variant="ghost"
              color="neutral"
              :to="businessConfig.contact.secondary"
              target="_blank"
              trailing-icon="i-lucide-star"
            >
              {{ content.gettingStarted.secondaryCta }}
            </UButton>
          </ILayoutCluster>

          <p class="text-sm text-muted text-center">
            {{ content.hero.founderCredit }}
          </p>
        </ILayoutStack>
      </ILayoutStack>
    </ISection>
  </div>
</template>
