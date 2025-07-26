<!-- app/pages/showcase/index.vue -->
<script setup lang="ts">
// Showcase navigation data
const showcasePages = [
  {
    title: 'Hero Sections',
    description: 'First impression variants with different emotional triggers',
    href: '/showcase/hero',
    icon: 'i-lucide-star',
    variants: ['Trust', 'Authority', 'Urgency'],
    color: 'blue',
  },
  {
    title: 'Results Sections',
    description: 'Metrics and achievements with social proof, expertise, or urgency',
    href: '/showcase/results',
    icon: 'i-lucide-trending-up',
    variants: ['Trust', 'Authority', 'Urgency'],
    color: 'green',
  },
  {
    title: 'Work Sections',
    description: 'Portfolio showcase with testimonials, expertise, or availability focus',
    href: '/showcase/work',
    icon: 'i-lucide-briefcase',
    variants: ['Trust', 'Authority', 'Urgency'],
    color: 'purple',
  },
  {
    title: 'About Sections',
    description: 'Personal presentation with trust-building, credentials, or availability',
    href: '/showcase/about',
    icon: 'i-lucide-user',
    variants: ['Trust', 'Authority', 'Urgency'],
    color: 'amber',
  },
  {
    title: 'CTA Sections',
    description: 'Call-to-action variants with risk-free, expert, or urgent offers',
    href: '/showcase/cta',
    icon: 'i-lucide-zap',
    variants: ['Trust', 'Authority', 'Urgency'],
    color: 'red',
  },
  {
    title: 'FAQ Sections',
    description: 'Question handling with reassurance, technical depth, or quick decisions',
    href: '/showcase/faq',
    icon: 'i-lucide-help-circle',
    variants: ['Trust', 'Authority', 'Urgency'],
    color: 'cyan',
  },
]

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
</script>

<template>
  <LayoutCenter variant="full">
    <LayoutStack variant="spacious">
      <!-- Page Header -->
      <LayoutCenter variant="text-only">
        <LayoutStack variant="default">
          <LayoutHeading
            variant="hero"
            :text="'Intent-Driven Template Showcase'"
          />
          <LayoutText
            variant="subtitle"
            :text="'Explore how emotional triggers transform section presentation and user experience across different components.'"
          />
        </LayoutStack>
      </LayoutCenter>

      <!-- Emotional Triggers Overview -->
      <LayoutSection
        variant="default"
        background="minimal"
      >
        <LayoutCenter variant="prose">
          <LayoutStack variant="spacious">
            <LayoutCenter variant="text-only">
              <LayoutStack variant="compact">
                <LayoutHeading
                  text="Three Core Emotional Triggers"
                  variant="section"
                />
                <LayoutText
                  text="Each section can be optimized for different psychological responses to match your business goals and target audience."
                  variant="description"
                />
              </LayoutStack>
            </LayoutCenter>

            <LayoutGrid variant="thirds">
              <UCard
                v-for="trigger in emotionalTriggers"
                :key="trigger.name"
                :class="`border-${trigger.color}/20 bg-${trigger.color}/5 hover:border-${trigger.color}/40 transition-all duration-200`"
              >
                <LayoutStack variant="centered">
                  <div :class="`w-12 h-12 rounded-lg bg-${trigger.color}/10 flex items-center justify-center`">
                    <UIcon
                      :name="trigger.icon"
                      :class="`size-6 text-${trigger.color}-600`"
                    />
                  </div>

                  <LayoutStack variant="centered">
                    <LayoutHeading
                      :text="trigger.name"
                      variant="card"
                    />

                    <LayoutText
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
                  </LayoutStack>
                </LayoutStack>
              </UCard>
            </LayoutGrid>
          </LayoutStack>
        </LayoutCenter>
      </LayoutSection>

      <!-- Section Showcases -->
      <LayoutCenter variant="prose">
        <LayoutStack variant="spacious">
          <LayoutCenter variant="text-only">
            <LayoutStack variant="compact">
              <LayoutHeading
                text="Section Showcases"
                variant="section"
              />
              <LayoutText
                text="Explore how each section type adapts to different emotional triggers with distinct layouts, content, and user experience patterns."
                variant="description"
              />
            </LayoutStack>
          </LayoutCenter>

          <LayoutGrid variant="halves">
            <NuxtLink
              v-for="page in showcasePages"
              :key="page.title"
              :to="page.href"
              class="group"
            >
              <UCard
                :class="`border-${page.color}/20 bg-${page.color}/5 hover:border-${page.color}/40 transition-all duration-200 group-hover:scale-[1.02]`"
              >
                <LayoutStack variant="default">
                  <!-- Section icon and title -->
                  <div class="flex items-center gap-3">
                    <div :class="`w-10 h-10 rounded-lg bg-${page.color}/10 flex items-center justify-center`">
                      <UIcon
                        :name="page.icon"
                        :class="`size-5 text-${page.color}-600`"
                      />
                    </div>
                    <LayoutHeading
                      :text="page.title"
                      variant="card"
                    />
                  </div>

                  <!-- Description -->
                  <LayoutText
                    :text="page.description"
                    variant="small"
                    class="text-muted"
                  />

                  <!-- Variant badges -->
                  <div class="flex gap-1 mt-4">
                    <UBadge
                      v-for="variant in page.variants"
                      :key="variant"
                      :color="variant === 'Trust' ? 'success' : variant === 'Authority' ? 'primary' : 'warning'"
                      variant="soft"
                      size="sm"
                    >
                      {{ variant }}
                    </UBadge>
                  </div>

                  <!-- Explore button -->
                  <div class="mt-4 pt-4 border-t border-muted/20">
                    <div class="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-200">
                      <span>Explore Variants</span>
                      <UIcon
                        name="i-lucide-arrow-right"
                        class="size-4"
                      />
                    </div>
                  </div>
                </LayoutStack>
              </UCard>
            </NuxtLink>
          </LayoutGrid>
        </LayoutStack>
      </LayoutCenter>

      <!-- Auto-Assignment Demo -->
      <LayoutSection
        variant="default"
        background="neural"
      >
        <LayoutCenter variant="prose">
          <LayoutStack variant="spacious">
            <LayoutCenter variant="text-only">
              <LayoutStack variant="compact">
                <UBadge
                  label="INTELLIGENT SYSTEM"
                  color="purple"
                  variant="solid"
                  size="lg"
                />
                <LayoutHeading
                  text="Automatic Intent Assignment"
                  variant="section"
                />
                <LayoutText
                  text="Our system automatically assigns emotional triggers based on section position and business goals, eliminating configuration decisions while optimizing conversion psychology."
                  variant="description"
                />
              </LayoutStack>
            </LayoutCenter>

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
                <LayoutText
                  text="Pattern: Primary → Secondary → Primary → Secondary"
                  variant="caption"
                  class="text-muted font-mono"
                />
              </div>
            </div>

            <!-- Benefits -->
            <LayoutGrid variant="thirds">
              <UCard class="bg-success/5 border-success/20">
                <LayoutStack variant="centered">
                  <UIcon
                    name="i-lucide-zap"
                    class="size-8 text-success-600"
                  />
                  <LayoutText
                    text="15-Minute Setup"
                    variant="card"
                    class="font-semibold"
                  />
                  <LayoutText
                    text="No configuration needed"
                    variant="small"
                    class="text-muted text-center"
                  />
                </LayoutStack>
              </UCard>

              <UCard class="bg-primary/5 border-primary/20">
                <LayoutStack variant="centered">
                  <UIcon
                    name="i-lucide-brain"
                    class="size-8 text-primary-600"
                  />
                  <LayoutText
                    text="Psychology-Driven"
                    variant="card"
                    class="font-semibold"
                  />
                  <LayoutText
                    text="Conversion-optimized patterns"
                    variant="small"
                    class="text-muted text-center"
                  />
                </LayoutStack>
              </UCard>

              <UCard class="bg-warning/5 border-warning/20">
                <LayoutStack variant="centered">
                  <UIcon
                    name="i-lucide-settings"
                    class="size-8 text-warning-600"
                  />
                  <LayoutText
                    text="Override Ready"
                    variant="card"
                    class="font-semibold"
                  />
                  <LayoutText
                    text="Manual control when needed"
                    variant="small"
                    class="text-muted text-center"
                  />
                </LayoutStack>
              </UCard>
            </LayoutGrid>
          </LayoutStack>
        </LayoutCenter>
      </LayoutSection>
    </LayoutStack>
  </LayoutCenter>
</template>
