<!-- pages/showcase/heading.vue - COMPLETE VERSION -->
<script setup>
import { headingData } from '#theme/content/heading'

const { setShowcaseData } = useShowcase()

setShowcaseData({
  title: 'Content Headings',
  subtitle: 'Semantic headings with visual effects and responsive sizing',
  componentData: headingData,
})

// ALL variant combinations organized by category
const basicVariants = [
  { level: 1, variant: 'default', effect: 'none', text: 'Default H1 Heading' },
  { level: 1, variant: 'hero', effect: 'none', text: 'Hero H1 Heading' },
  { level: 1, variant: 'display', effect: 'none', text: 'Display H1 Heading' },
  { level: 2, variant: 'default', effect: 'none', text: 'Default H2 Heading' },
  { level: 2, variant: 'section', effect: 'none', text: 'Section H2 Heading' },
  { level: 2, variant: 'accent', effect: 'none', text: 'Accent H2 Heading' },
  { level: 3, variant: 'default', effect: 'none', text: 'Default H3 Heading' },
  { level: 3, variant: 'section', effect: 'none', text: 'Section H3 Heading' },
  { level: 2, variant: 'muted', effect: 'none', text: 'Muted H2 Heading' },
  { level: 2, variant: 'card', effect: 'none', text: 'Card H2 Heading' },
  { level: 2, variant: 'content', effect: 'none', text: 'Content H2 Heading' },
  { level: 4, variant: 'default', effect: 'none', text: 'H4 Default Heading' },
  { level: 5, variant: 'default', effect: 'none', text: 'H5 Default Heading' },
  { level: 6, variant: 'default', effect: 'none', text: 'H6 Default Heading' },
]

const demoStyles = {
  container: 'p-6 rounded-lg border border-default bg-elevated/50',
  darkContainer: 'p-6 rounded-lg border border-default bg-gray-900 text-white',
}
</script>

<template>
  <NuxtLayout name="showcase">
    <!-- Basic Variants Grid -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <div class="text-center space-y-4">
          <h2 class="text-2xl font-bold text-highlighted">
            All Basic Variants
          </h2>
          <p class="text-muted">
            Complete coverage of levels, variants, and sizes
          </p>
        </div>

        <ILayoutGrid
          variant="thirds"
          gap="lg"
        >
          <div
            v-for="(heading, index) in basicVariants"
            :key="index"
            :class="demoStyles.container"
          >
            <ILayoutStack gap="sm">
              <!-- Use ONLY TV theme, no dynamic props -->
              <ContentHeading
                :level="heading.level"
                :variant="heading.variant"
                :effect="heading.effect"
                :text="heading.text"
              />

              <div class="text-xs text-muted font-mono bg-muted/30 p-2 rounded">
                level: {{ heading.level }}<br>
                variant: "{{ heading.variant }}"<br>
                effect: "{{ heading.effect }}"
              </div>
            </ILayoutStack>
          </div>
        </ILayoutGrid>
      </ILayoutStack>
    </ISection>

    <ISection variant="default">
      <!-- ALL Effect Variants -->
      <ContentHeading
        :level="1"
        variant="display"
      >
        Launch your
        <ContentTextEffect
          effect="gradient"
          color="primary"
          intensity="strong"
        >
          MVP
        </ContentTextEffect>
        in days, not months
      </ContentHeading>

      <!-- Example 2: Mixed effects in same heading -->
      <ContentHeading
        :level="1"
        variant="hero"
      >
        <ContentTextEffect
          effect="glow"
          color="primary"
          intensity="medium"
        >
          Ready to
        </ContentTextEffect>
        <ContentTextEffect
          effect="gradient"
          color="secondary"
          intensity="strong"
        >
          Transform
        </ContentTextEffect>
        <ContentTextEffect
          effect="glow"
          color="accent"
          intensity="strong"
        >
          Your Design?
        </ContentTextEffect>
      </ContentHeading>

      <!-- Example 3: Single word emphasis -->
      <ContentHeading
        :level="2"
        variant="section"
      >
        Accelerate your MVP with
        <ContentTextEffect
          effect="gradient"
          color="accent"
        >
          free
        </ContentTextEffect>
        starter kits
      </ContentHeading>

      <!-- Example 4: Multiple lines with consistent effect -->
      <ContentHeading
        :level="1"
        variant="display"
      >
        <ContentTextEffect
          effect="gradient"
          color="primary"
          intensity="strong"
        >
          Ship faster with
          Nuxt Launch Kit
        </ContentTextEffect>
      </ContentHeading>

      <!-- Example 5: Button text effects -->
      <UButton size="xl">
        <ContentTextEffect
          effect="glow"
          color="secondary"
          intensity="subtle"
        >
          Get Started
        </ContentTextEffect>
        — it's free
      </UButton>

      <!-- Example 6: Different intensities in same heading -->
      <ContentHeading
        :level="1"
        variant="hero"
      >
        <ContentTextEffect
          effect="gradient"
          color="primary"
          intensity="subtle"
        >
          Extend
        </ContentTextEffect>
        <ContentTextEffect
          effect="gradient"
          color="primary"
          intensity="strong"
        >
          Nuxt UI
        </ContentTextEffect>
        <ContentTextEffect
          effect="gradient"
          color="secondary"
          intensity="medium"
        >
          with
        </ContentTextEffect>
      </ContentHeading>
    </ISection>

    <!-- Size Comparison -->
    <ISection variant="default">
      <ILayoutStack gap="xl">
        <div class="text-center space-y-4">
          <h2 class="text-2xl font-bold text-highlighted">
            Size Comparison
          </h2>
          <p class="text-muted">
            All heading levels with consistent text
          </p>
        </div>

        <div :class="demoStyles.container">
          <ILayoutStack gap="lg">
            <ContentHeading
              :level="1"
              variant="display"
              effect="none"
              text="Display Heading (H1)"
            />
            <ContentHeading
              :level="1"
              variant="hero"
              effect="none"
              text="Hero Heading (H1)"
            />
            <ContentHeading
              :level="1"
              variant="default"
              effect="none"
              text="Default Heading (H1)"
            />
            <ContentHeading
              :level="2"
              variant="section"
              effect="none"
              text="Section Heading (H2)"
            />
            <ContentHeading
              :level="2"
              variant="default"
              effect="none"
              text="Default Heading (H2)"
            />
            <ContentHeading
              :level="3"
              variant="default"
              effect="none"
              text="Default Heading (H3)"
            />
            <ContentHeading
              :level="4"
              variant="default"
              effect="none"
              text="Default Heading (H4)"
            />
            <ContentHeading
              :level="5"
              variant="default"
              effect="none"
              text="Default Heading (H5)"
            />
            <ContentHeading
              :level="6"
              variant="default"
              effect="none"
              text="Default Heading (H6)"
            />
          </ILayoutStack>
        </div>
      </ILayoutStack>
    </ISection>

    <!-- Debug variant for layout -->
    <template #debug="{ variantProps, variant }">
      <div :class="demoStyles.container">
        <ContentHeading
          v-bind="variantProps"
          :text="`${variant.name} Heading`"
          effect="none"
        />
      </div>
    </template>
  </NuxtLayout>
</template>
