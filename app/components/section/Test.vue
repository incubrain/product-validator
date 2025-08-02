<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui'

interface Feature {
  id: string
  icon: string
  iconColor: 'blue' | 'pink' | 'teal' | 'orange'
  title: string
  description: string
}

interface Props {
  title?: string
  subtitle?: string
  badgeLabel?: string
  badgeProps?: BadgeProps
  features?: Feature[]
  variant?: 'default' | 'featured'
}

withDefaults(defineProps<Props>(), {
  title: 'Revolutionary Features',
  subtitle: 'Provides advanced features like time tracking, integrating with third party apps (calendar / Google drive), creating subtasks.',
  badgeLabel: 'Features',
  variant: 'default',
  badgeProps: () => ({
    color: 'primary',
    variant: 'soft',
    size: 'md',
  }),
  features: () => [
    {
      id: 'projectview',
      icon: 'lucide:trending-up',
      iconColor: 'blue',
      title: 'Revolutionary Projectview',
      description: 'plan and structure work how you want. Quickly organizing tasks.',
    },
    {
      id: 'integrations',
      icon: 'lucide:layers',
      iconColor: 'pink',
      title: 'App Integrations',
      description: 'Bring all your tools and data together. Also join with hundreds of other apps.',
    },
    {
      id: 'reporting',
      icon: 'lucide:bar-chart-3',
      iconColor: 'teal',
      title: 'Data Reporting',
      description: 'Get real time insight into progress and allows teams to track their work habits',
    },
    {
      id: 'workflow',
      icon: 'lucide:workflow',
      iconColor: 'orange',
      title: 'Workflow Builder',
      description: 'Automated processes to coordinate your teams and increase communication.',
    },
  ],
})

// Icon background color mapping
const getIconColorClasses = (color: Feature['iconColor']) => {
  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  }
  return colorMap[color]
}
</script>

<template>
  <LayoutSection variant="default">
    <LayoutStack>
      <!-- ✅ TEST 1: Default Configuration -->
      <!-- ✅ TEST 1: Basic Center Layout -->
      <LayoutSectionTitle
        variant="center"
        :heading="{
          text: 'Revolutionary AI Platform',
          level: 1,
          variant: 'hero',
          highlight: 'AI',
        }"
        :subtitle="{
          text: 'Build the future with cutting-edge artificial intelligence tools designed for modern developers.',
          variant: 'hero',
          size: 'xl',
        }"
        :badge="{
          label: 'New Release',
          color: 'primary',
          variant: 'soft',
        }"
      />

      <!-- ✅ TEST 2: Left Aligned with Custom Styling -->
      <LayoutSectionTitle
        variant="left"
        :heading="{
          text: 'Feature Showcase',
          level: 2,
          variant: 'section',
        }"
        :subtitle="{
          text: 'Discover powerful features that will transform your workflow and boost productivity.',
          variant: 'section',
          size: 'lg',
        }"
        :badge="{
          label: 'Features',
          color: 'green',
          variant: 'solid',
        }"
      />

      <!-- ✅ TEST 3: No Badge, Different Heading Level -->
      <LayoutSectionTitle
        variant="center"
        :heading="{
          text: 'Pricing Plans',
          level: 3,
          variant: 'default',
        }"
        :subtitle="{
          text: 'Choose the perfect plan for your needs.',
          variant: 'default',
          size: 'base',
        }"
      />

      <!-- ✅ TEST 4: Custom UI Overrides -->
      <LayoutSectionTitle
        variant="left"
        :heading="{
          text: 'Custom Styled Section',
          level: 2,
          variant: 'accent',
          ui: { root: 'border-l-4 border-primary pl-4' },
        }"
        :subtitle="{
          text: 'This section has custom styling applied via UI overrides.',
          variant: 'muted',
          ui: { root: 'italic' },
        }"
        :badge="{
          label: 'Custom',
          color: 'orange',
          variant: 'outline',
        }"
        :ui="{
          root: 'bg-gray-50 dark:bg-gray-900 p-8 rounded-lg',
        }"
      />

      <!-- ✅ TEST 5: Minimal Configuration -->
      <LayoutSectionTitle
        :heading="{
          text: 'Simple Header',
          level: 4,
        }"
      />

      <!-- ✅ TEST 6: With Slots -->
      <LayoutSectionTitle
        variant="center"
        :heading="{
          text: 'Section with Custom Content',
          level: 2,
          variant: 'hero',
        }"
        :subtitle="{
          text: 'This section demonstrates slot usage for additional content.',
          variant: 'hero',
        }"
      >
        <template #before>
          <div class="text-center mb-4">
            <UIcon
              name="i-heroicons-star"
              class="w-8 h-8 text-yellow-500"
            />
          </div>
        </template>

        <template #after>
          <div class="flex justify-center gap-4 mt-8">
            <UButton color="primary">
              Get Started
            </UButton>
            <UButton
              color="neutral"
              variant="ghost"
            >
              Learn More
            </UButton>
          </div>
        </template>
      </LayoutSectionTitle>

      <!-- ✅ TEST 7: Edge Case - No Subtitle -->
      <LayoutSectionTitle
        variant="left"
        :heading="{
          text: 'Title Only Section',
          level: 1,
          variant: 'hero',
        }"
        :badge="{
          label: 'New',
          color: 'error',
          variant: 'soft',
        }"
      />

      <!-- Features Grid -->
      <LayoutGrid
        variant="quarters"
        class="mt-12"
      >
        <UCard
          v-for="feature in features"
          :key="feature.id"
          class="hover:shadow-lg transition-shadow duration-200"
          :ui="{
            root: 'ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm',
          }"
        >
          <!-- Icon -->
          <div class="flex mb-6">
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center"
              :class="getIconColorClasses(feature.iconColor)"
            >
              <UIcon
                :name="feature.icon"
                class="w-8 h-8"
              />
            </div>
          </div>

          <!-- Title -->
          <LayoutHeading
            :text="feature.title"
            :level="3"
            variant="card"
            class="mb-4"
          />

          <!-- Description -->
          <LayoutText
            :text="feature.description"
            variant="description"
            class="text-gray-600 dark:text-gray-400"
          />
        </UCard>
      </LayoutGrid>
    </LayoutStack>
  </LayoutSection>
</template>
