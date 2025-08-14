<!-- app/pages/showcase/index.vue -->
<script setup lang="ts">
const router = useRouter()

const emotionalTriggers = [
  {
    name: 'Trust',
    description: 'Builds confidence through social proof, testimonials, and transparency',
    color: 'success',
    icon: 'i-lucide-shield-check',
    characteristics: ['Social proof', 'Testimonials', 'Guarantees', 'Transparency'],
  },
  {
    name: 'Authority',
    description: 'Establishes expertise through credentials, achievements, and professionalism',
    color: 'primary',
    icon: 'i-lucide-award',
    characteristics: ['Credentials', 'Expertise', 'Recognition', 'Professionalism'],
  },
  {
    name: 'Urgency',
    description: 'Creates action through scarcity, time-limits, and immediate benefits',
    color: 'warning',
    icon: 'i-lucide-timer',
    characteristics: ['Scarcity', 'Time-limits', 'Availability', 'Immediate action'],
  },
]

// Get all showcase child routes
const showcaseRoutes = computed(() => {
  return router.getRoutes()
    .filter((route) => {
      // Filter for showcase/* routes, excluding the index
      return route.path.startsWith('/showcase/')
        && route.path !== '/showcase/'
        && !route.path.includes('[') // Exclude dynamic routes if needed
    })
    .map((route) => ({
      path: route.path,
      name: route.name,
      // Extract display name from path
      title: route.meta?.title || formatRouteName(route.path),
      description: route.meta?.description || `${formatRouteName(route.path)} component examples and variants`,
      icon: route.meta?.icon || getDefaultIcon(route.path),
      category: route.meta?.category || 'components',
      order: route.meta?.order || 999,
    }))
    .sort((a, b) => {
      // Sort by order first, then by title
      if (a.order !== b.order) {
        return a.order - b.order
      }
      return a.title.localeCompare(b.title)
    })
})

// Group routes by category
const groupedRoutes = computed(() => {
  return showcaseRoutes.value.reduce((acc, route) => {
    if (!acc[route.category]) {
      acc[route.category] = []
    }
    acc[route.category].push(route)
    return acc
  }, {} as Record<string, typeof showcaseRoutes.value>)
})

// Helper function to format route names
function formatRouteName(path: string): string {
  return path.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Unknown'
}

// Helper function to get default icons based on route name
function getDefaultIcon(path: string): string {
  const routeName = path.split('/').pop() || ''

  const iconMap: Record<string, string> = {
    hero: 'i-lucide-zap',
    about: 'i-lucide-user',
    work: 'i-lucide-briefcase',
    results: 'i-lucide-trending-up',
    cta: 'i-lucide-mouse-pointer-click',
    faq: 'i-lucide-help-circle',
    center: 'i-lucide-align-center',
    grid: 'i-lucide-grid-3x3',
    split: 'i-lucide-columns',
    stack: 'i-lucide-layers',
    layout: 'i-lucide-layout',
  }

  return iconMap[routeName] || 'i-lucide-component'
}

// Category display configuration
const categoryConfig = {
  sections: {
    title: 'Section Components',
    description: 'Complete page sections with intent-driven variations',
    icon: 'i-lucide-layout',
    color: 'primary',
  },
  components: {
    title: 'Layout Components',
    description: 'Atomic layout primitives for building custom sections',
    icon: 'i-lucide-component',
    color: 'success',
  },
  examples: {
    title: 'Example Pages',
    description: 'Real-world page examples and templates',
    icon: 'i-lucide-file-text',
    color: 'warning',
  },
}

console.log('🔍 Showcase Routes:', showcaseRoutes.value)
console.log('📁 Grouped Routes:', groupedRoutes.value)
</script>

<template>
  <ISection>
    <ILayoutCenter variant="full">
      <ILayoutStack variant="spacious">
        <!-- Page Header -->
        <ILayoutCenter variant="text-only">
          <ILayoutStack variant="default">
            <IHeading
              variant="hero"
              :text="'Intent-Driven Template Showcase'"
            />
            <IText
              variant="subtitle"
              :text="'Explore how emotional triggers transform section presentation and user experience across different components.'"
            />
          </ILayoutStack>
        </ILayoutCenter>

        <ILayoutCenter variant="prose">
          <ILayoutStack variant="spacious">
            <ILayoutCenter variant="text-only">
              <ILayoutStack variant="compact">
                <IHeading
                  text="Three Core Emotional Triggers"
                  variant="section"
                />
                <IText
                  text="Each section can be optimized for different psychological responses to match your business goals and target audience."
                  variant="description"
                />
              </ILayoutStack>
            </ILayoutCenter>

            <ILayoutGrid variant="thirds">
              <UCard
                v-for="trigger in emotionalTriggers"
                :key="trigger.name"
                :class="`border-${trigger.color}/20 bg-${trigger.color}/5 hover:border-${trigger.color}/40 transition-all duration-200`"
              >
                <ILayoutStack variant="centered">
                  <div :class="`w-12 h-12 rounded-lg bg-${trigger.color}/10 flex items-center justify-center`">
                    <UIcon
                      :name="trigger.icon"
                      :class="`size-6 text-${trigger.color}-600`"
                    />
                  </div>

                  <ILayoutStack variant="centered">
                    <IHeading
                      :text="trigger.name"
                      variant="card"
                    />

                    <IText
                      :text="trigger.description"
                      variant="small"
                      class="text-center"
                    />

                    <!-- Characteristics -->
                    <div class="flex flex-wrap gap-1 justify-center mt-4">
                      <UBadge
                        v-for="char in trigger.characteristics"
                        :key="char"
                        :color="trigger.color"
                        variant="soft"
                        size="sm"
                      >
                        {{ char }}
                      </UBadge>
                    </div>
                  </ILayoutStack>
                </ILayoutStack>
              </UCard>
            </ILayoutGrid>
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Component Showcases Navigation -->
        <ILayoutCenter variant="prose">
          <ILayoutStack variant="spacious">
            <ILayoutCenter variant="text-only">
              <ILayoutStack variant="compact">
                <IHeading
                  text="Component Showcases"
                  variant="section"
                />
                <IText
                  text="Explore how each component type adapts to different emotional triggers with distinct layouts, content, and user experience patterns."
                  variant="description"
                />
              </ILayoutStack>
            </ILayoutCenter>

            <!-- Category-based Navigation -->
            <div
              v-for="(routes, category) in groupedRoutes"
              :key="category"
              class="space-y-6"
            >
              <div
                v-if="categoryConfig[category]"
                class="text-center"
              >
                <div class="flex items-center justify-center gap-3 mb-3">
                  <div :class="`w-10 h-10 rounded-lg bg-${categoryConfig[category].color}/10 flex items-center justify-center`">
                    <UIcon
                      :name="categoryConfig[category].icon"
                      :class="`size-5 text-${categoryConfig[category].color}-600`"
                    />
                  </div>
                  <IHeading
                    :text="categoryConfig[category].title"
                    variant="section"
                    class="text-xl"
                  />
                </div>
                <IText
                  :text="categoryConfig[category].description"
                  variant="description"
                  class="mb-6"
                />
              </div>

              <!-- Route Cards -->
              <ILayoutGrid variant="thirds">
                <UCard
                  v-for="route in routes"
                  :key="route.path"
                  class="hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer group"
                  @click="$router.push(route.path)"
                >
                  <ILayoutStack variant="default">
                    <!-- Icon and Title -->
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <UIcon
                          :name="route.icon"
                          class="size-5 text-primary-600"
                        />
                      </div>
                      <IHeading
                        :text="route.title"
                        variant="card"
                        class="group-hover:text-primary transition-colors"
                      />
                    </div>

                    <!-- Description -->
                    <IText
                      :text="route.description"
                      variant="small"
                      class="text-muted"
                    />

                    <!-- Action Button -->
                    <div class="mt-4">
                      <UButton
                        :to="route.path"
                        variant="outline"
                        color="primary"
                        block
                        class="group-hover:bg-primary group-hover:text-white transition-all"
                      >
                        View Examples
                        <UIcon
                          name="i-lucide-arrow-right"
                          class="size-4 ml-2"
                        />
                      </UButton>
                    </div>
                  </ILayoutStack>
                </UCard>
              </ILayoutGrid>
            </div>

            <!-- Empty State if no routes found -->
            <div
              v-if="showcaseRoutes.length === 0"
              class="text-center py-12"
            >
              <UIcon
                name="i-lucide-component"
                class="size-12 text-muted mx-auto mb-4"
              />
              <IHeading
                text="No Showcase Components Found"
                variant="card"
                class="mb-2"
              />
              <IText
                text="Create showcase pages in the /pages/showcase/ directory to see them here."
                variant="description"
              />
            </div>
          </ILayoutStack>
        </ILayoutCenter>

        <!-- Auto-Assignment Demo -->

        <ILayoutCenter variant="prose">
          <ILayoutStack variant="spacious">
            <ILayoutCenter variant="text-only">
              <ILayoutStack variant="compact">
                <UBadge
                  label="INTELLIGENT SYSTEM"
                  color="purple"
                  variant="solid"
                  size="lg"
                />
                <IHeading
                  text="Automatic Intent Assignment"
                  variant="section"
                />
                <IText
                  text="Our system automatically assigns emotional triggers based on section position and business goals, eliminating configuration decisions while optimizing conversion psychology."
                  variant="description"
                />
              </ILayoutStack>
            </ILayoutCenter>

            <!-- Auto-assignment pattern visualization -->
            <div class="bg-elevated border border-muted rounded-lg p-6">
              <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div
                  v-for="(section, index) in ['Hero', 'Results', 'Work', 'About', 'CTA', 'FAQ']"
                  :key="section"
                  class="text-center"
                >
                  <div class="mb-2">
                    <div
                      :class="`w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-white font-bold ${
                        index % 2 === 0 ? 'bg-success-500' : 'bg-primary-500'
                      }`"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>

                  <div class="space-y-1">
                    <div class="text-sm font-medium">
                      {{ section }}
                    </div>
                    <UBadge
                      :label="index % 2 === 0 ? 'Trust' : 'Authority'"
                      :color="index % 2 === 0 ? 'success' : 'primary'"
                      variant="soft"
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-6 text-center">
                <IText
                  text="Pattern: Primary → Secondary → Primary → Secondary"
                  variant="caption"
                  class="text-muted font-mono"
                />
              </div>
            </div>

            <!-- Benefits -->
            <ILayoutGrid variant="thirds">
              <UCard class="bg-success/5 border-success/20">
                <ILayoutStack variant="centered">
                  <UIcon
                    name="i-lucide-zap"
                    class="size-8 text-success-600"
                  />
                  <IText
                    text="15-Minute Setup"
                    variant="card"
                    class="font-semibold"
                  />
                  <IText
                    text="No configuration needed"
                    variant="small"
                    class="text-muted text-center"
                  />
                </ILayoutStack>
              </UCard>

              <UCard class="bg-primary/5 border-primary/20">
                <ILayoutStack variant="centered">
                  <UIcon
                    name="i-lucide-brain"
                    class="size-8 text-primary-600"
                  />
                  <IText
                    text="Psychology-Driven"
                    variant="card"
                    class="font-semibold"
                  />
                  <IText
                    text="Conversion-optimized patterns"
                    variant="small"
                    class="text-muted text-center"
                  />
                </ILayoutStack>
              </UCard>

              <UCard class="bg-warning/5 border-warning/20">
                <ILayoutStack variant="centered">
                  <UIcon
                    name="i-lucide-settings"
                    class="size-8 text-warning-600"
                  />
                  <IText
                    text="Override Ready"
                    variant="card"
                    class="font-semibold"
                  />
                  <IText
                    text="Manual control when needed"
                    variant="small"
                    class="text-muted text-center"
                  />
                </ILayoutStack>
              </UCard>
            </ILayoutGrid>
          </ILayoutStack>
        </ILayoutCenter>
      </ILayoutStack>
    </ILayoutCenter>
  </ISection>
</template>
