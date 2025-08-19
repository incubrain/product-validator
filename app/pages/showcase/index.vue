<!-- app/pages/showcase/index.vue - ENHANCED WITH NAVIGATION INTEGRATION -->
<script setup lang="ts">
import { getShowcaseRoutes } from '#shared/config/navigation'

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

// ✅ USE NAVIGATION CONFIG INSTEAD OF DYNAMIC ROUTE DETECTION
const showcaseRoutes = computed(() => getShowcaseRoutes())

// ✅ ENHANCED CATEGORIZATION WITH PROPER GROUPING
const groupedRoutes = computed(() => {
  const layoutComponents = showcaseRoutes.value.filter((route) =>
    ['container', 'stack', 'split', 'grid', 'cluster', 'columns'].includes(
      route.path.split('/').pop() || '',
    ),
  )

  const specializedComponents = showcaseRoutes.value.filter((route) =>
    ['frame', 'float', 'scroll-box', 'transform', 'divider'].includes(
      route.path.split('/').pop() || '',
    ),
  )

  return {
    layout: layoutComponents,
    specialized: specializedComponents,
  }
})

const categoryConfig = {
  layout: {
    title: 'Core Layout Components',
    description: 'Essential layout primitives for building responsive page structures',
    icon: 'i-lucide-component',
    color: 'primary',
    order: 1,
  },
  specialized: {
    title: 'Specialized Components',
    description: 'Purpose-built components for specific layout needs and interactions',
    icon: 'i-lucide-settings',
    color: 'secondary',
    order: 2,
  },
}

console.log('🔍 Showcase Routes from Navigation:', showcaseRoutes.value)
console.log('📁 Grouped Routes:', groupedRoutes.value)
</script>

<template>
  <NuxtLayout name="showcase">
    <ISection>
      <ILayoutCenter variant="full">
        <ILayoutStack variant="spacious">
          <!-- Page Header -->
          <ILayoutCenter variant="text-only">
            <ILayoutStack variant="default">
              <ContentHeading
                variant="hero"
                :text="'Layout Component Showcase'"
              />
              <ContentText
                variant="subtitle"
                :text="'Explore our comprehensive layout component system with interactive examples, real-world presets, and detailed documentation.'"
              />
            </ILayoutStack>
          </ILayoutCenter>

          <ILayoutCenter variant="prose">
            <ILayoutStack variant="spacious">
              <ILayoutCenter variant="text-only">
                <ILayoutStack variant="compact">
                  <ContentHeading
                    text="Three Design Principles"
                    variant="section"
                  />
                  <ContentText
                    text="Our layout components are built on proven design principles that create effective user experiences."
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
                      <ContentHeading
                        :text="trigger.name"
                        variant="card"
                      />

                      <ContentText
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
                  <ContentHeading
                    text="Component Documentation"
                    variant="section"
                  />
                  <ContentText
                    text="Interactive examples with live controls, real-world presets, and comprehensive API documentation for each component."
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
                    <ContentHeading
                      :text="categoryConfig[category].title"
                      variant="section"
                      class="text-xl"
                    />
                  </div>
                  <ContentText
                    :text="categoryConfig[category].description"
                    variant="description"
                    class="mb-6"
                  />
                </div>

                <!-- Route Cards -->
                <ILayoutGrid variant="quarters">
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
                        <ContentHeading
                          :text="route.title"
                          variant="card"
                          class="group-hover:text-primary transition-colors"
                        />
                      </div>

                      <!-- Description -->
                      <ContentText
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
                <ContentHeading
                  text="No Showcase Components Found"
                  variant="card"
                  class="mb-2"
                />
                <ContentText
                  text="Components will appear here once navigation config is updated."
                  variant="description"
                />
              </div>
            </ILayoutStack>
          </ILayoutCenter>

          <!-- Component Stats -->
          <ILayoutCenter variant="prose">
            <ILayoutStack variant="spacious">
              <ILayoutCenter variant="text-only">
                <ILayoutStack variant="compact">
                  <UBadge
                    label="COMPONENT SYSTEM"
                    color="purple"
                    variant="solid"
                    size="lg"
                  />
                  <ContentHeading
                    text="Production-Ready Components"
                    variant="section"
                  />
                  <ContentText
                    text="Built with TypeScript, Tailwind Variants, and modern Vue patterns for maximum developer experience and type safety."
                    variant="description"
                  />
                </ILayoutStack>
              </ILayoutCenter>

              <!-- Component system features -->
              <ILayoutGrid variant="thirds">
                <UCard class="bg-success/5 border-success/20">
                  <ILayoutStack variant="centered">
                    <UIcon
                      name="i-lucide-zap"
                      class="size-8 text-success-600"
                    />
                    <ContentText
                      text="10+ Components"
                      variant="card"
                      class="font-semibold"
                    />
                    <ContentText
                      text="Complete layout system"
                      variant="small"
                      class="text-muted text-center"
                    />
                  </ILayoutStack>
                </UCard>

                <UCard class="bg-primary/5 border-primary/20">
                  <ILayoutStack variant="centered">
                    <UIcon
                      name="i-lucide-shield-check"
                      class="size-8 text-primary-600"
                    />
                    <ContentText
                      text="Type Safe"
                      variant="card"
                      class="font-semibold"
                    />
                    <ContentText
                      text="Full TypeScript support"
                      variant="small"
                      class="text-muted text-center"
                    />
                  </ILayoutStack>
                </UCard>

                <UCard class="bg-warning/5 border-warning/20">
                  <ILayoutStack variant="centered">
                    <UIcon
                      name="i-lucide-palette"
                      class="size-8 text-warning-600"
                    />
                    <ContentText
                      text="Customizable"
                      variant="card"
                      class="font-semibold"
                    />
                    <ContentText
                      text="Tailwind Variants powered"
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
  </NuxtLayout>
</template>
