<!-- app/pages/showcase/hero.vue - UPDATED FOR NEW COMPONENT PATTERN -->
<script setup lang="ts">
// Sample data for different emotional contexts
const trustCards = [
  {
    title: 'Proven Template',
    description: 'Used by 50+ successful projects worldwide',
    icon: 'i-lucide-shield-check',
    iconColor: 'success',
  },
  {
    title: '24 Hour Setup',
    description: 'From clone to live in minutes, guaranteed',
    icon: 'i-lucide-timer',
    iconColor: 'success',
  },
  {
    title: 'Full Support',
    description: 'Documentation + active community',
    icon: 'i-lucide-users',
    iconColor: 'success',
  },
]

const authorityCards = [
  {
    title: 'Expert Built',
    description: '6 years SaaS development experience',
    icon: 'i-lucide-award',
    iconColor: 'primary',
  },
  {
    title: 'Industry Recognition',
    description: 'Featured in top developer communities',
    icon: 'i-lucide-star',
    iconColor: 'primary',
  },
  {
    title: 'Thought Leadership',
    description: 'Speaking at conferences worldwide',
    icon: 'i-lucide-megaphone',
    iconColor: 'primary',
  },
]

const urgencyCards = [
  {
    title: 'Limited Time',
    description: 'Early access pricing ends soon',
    icon: 'i-lucide-clock',
    iconColor: 'amber',
  },
  {
    title: 'First 100 Users',
    description: 'Exclusive bonuses for early adopters',
    icon: 'i-lucide-users',
    iconColor: 'amber',
  },
  {
    title: 'Launch Week',
    description: 'Special pricing this week only',
    icon: 'i-lucide-rocket',
    iconColor: 'amber',
  },
]

const heroVariants = [
  {
    name: 'Trust Variant',
    description: 'Social proof, testimonials, and safety signals',
    emotional: 'trust',
    props: {
      variant: 'trust',
      goal: 'convert',
      title: 'Trusted by 50+ Developers Worldwide',
      subtitle: 'The same template powering this site is <strong>proven and reliable</strong>',
      description: 'Join developers who have successfully launched their personal brands using our battle-tested template.',
      items: trustCards,
      action: {
        text: 'Get Trusted Template',
        link: '#download',
        description: 'Free download • Proven results • Full support',
      },
    },
  },
  {
    name: 'Authority Variant',
    description: 'Expert positioning and thought leadership focus',
    emotional: 'authority',
    props: {
      variant: 'authority',
      goal: 'credibility',
      title: 'Built by SaaS Development Expert',
      subtitle: 'The template created by <strong>6 years of experience</strong>',
      description: 'Leverage professional expertise and industry knowledge to build your authoritative personal brand.',
      items: authorityCards,
      action: {
        text: 'Access Expert Template',
        link: '#download',
        description: 'Professional grade • Industry standards • Expert support',
      },
    },
  },
  {
    name: 'Urgency Variant',
    description: 'Scarcity, FOMO, and time-sensitive offers',
    emotional: 'urgency',
    props: {
      variant: 'urgency',
      goal: 'convert',
      title: 'Launch Week - 48 Hours Left!',
      subtitle: 'The template with <strong>limited-time bonuses</strong>',
      description: 'Don\'t miss out on exclusive launch week pricing and bonuses for early adopters.',
      items: urgencyCards,
      action: {
        text: 'Claim Your Spot',
        link: '#download',
        description: 'Limited time • Exclusive bonuses • Act now',
      },
    },
  },
]

// Auto-assignment test data
const autoAssignmentTest = [
  {
    name: 'Auto-Assignment Test (No Variant)',
    description: 'Tests automatic intent assignment based on section index',
    emotional: 'auto',
    props: {
      // No variant specified - should auto-assign based on sectionIndex
      sectionIndex: 0, // Should get 'trust' (primary intent)
      goal: 'convert',
      title: 'Auto-Assigned Emotional Trigger',
      subtitle: 'This hero should automatically use <strong>trust variant</strong>',
      description: 'Testing the automatic intent assignment system based on section position.',
      items: trustCards,
      action: {
        text: 'Test Auto-Assignment',
        link: '#test',
        description: 'Automatic • Intent-driven • Smart defaults',
      },
    },
  },
]

const { getComponent } = useSectionComponents()
</script>

<template>
  <LayoutCenter variant="full">
    <LayoutStack variant="spacious">
      <ShowcasePageHeader
        title="Hero Emotional Variants Showcase"
        subtitle="Explore different emotional triggers: Trust, Authority, and Urgency variants using our intent-driven system."
      />

      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in heroVariants"
          :key="variant.name"
          class="space-y-4"
        >
          <!-- Variant Info -->
          <ShowcaseVariantHeader
            :name="variant.name"
            :description="variant.description"
            :emotional="variant.emotional"
          />

          <!-- Hero Component - UPDATED TO USE getComponent() -->
          <component
            :is="getComponent('hero', variant.props.variant, index)"
            v-bind="variant.props"
            :section-index="index"
          />

          <!-- Divider -->
          <LayoutDivider
            v-if="index < heroVariants.length - 1"
            variant="gradient"
            spacing="xl"
          />
        </div>
      </LayoutStack>

      <!-- Auto-Assignment Section -->
      <LayoutDivider
        variant="gradient"
        spacing="xl"
      />

      <LayoutStack variant="spacious">
        <LayoutCenter variant="text-only">
          <LayoutStack variant="default">
            <UBadge
              label="AUTO-ASSIGNMENT TEST"
              color="purple"
              variant="solid"
              size="lg"
            />
            <LayoutHeading
              :text="'Automatic Intent Assignment'"
              variant="section"
            />
            <LayoutText
              :text="'Testing automatic emotional trigger assignment based on section position and website intent configuration.'"
              variant="description"
            />
          </LayoutStack>
        </LayoutCenter>

        <div
          v-for="(test, index) in autoAssignmentTest"
          :key="test.name"
          class="space-y-4"
        >
          <!-- Test Info -->
          <LayoutCenter variant="prose">
            <LayoutStack variant="compact">
              <div class="flex items-center gap-3">
                <UBadge
                  label="AUTO"
                  color="purple"
                  variant="solid"
                />
                <LayoutHeading
                  :text="test.name"
                  variant="card"
                />
              </div>
              <LayoutText
                :text="test.description"
                variant="description"
              />
            </LayoutStack>
          </LayoutCenter>

          <!-- Hero Component - UPDATED TO USE getComponent() with auto-assignment -->
          <component
            :is="getComponent('hero', undefined, test.props.sectionIndex)"
            v-bind="test.props"
          />
        </div>
      </LayoutStack>

      <!-- Implementation Info -->
      <LayoutDivider
        variant="gradient"
        spacing="xl"
      />

      <LayoutCenter variant="prose">
        <UCard class="bg-elevated/50 border border-muted">
          <LayoutStack variant="default">
            <div class="flex items-center gap-3">
              <UIcon
                name="i-lucide-info"
                class="size-5 text-primary-600"
              />
              <LayoutHeading
                :text="'Implementation Notes'"
                variant="card"
              />
            </div>

            <div class="space-y-2">
              <LayoutText
                :text="'• Trust: Social proof focus with success color scheme and shield icons'"
                variant="small"
                class="flex items-start gap-2"
              >
                <template #default>
                  <UIcon
                    name="i-lucide-shield-check"
                    class="size-4 text-success-600 mt-0.5 flex-shrink-0"
                  />
                  <span><strong>Trust:</strong> Social proof focus with success color scheme and shield icons</span>
                </template>
              </LayoutText>

              <LayoutText
                :text="'• Authority: Expert positioning with primary colors and award icons'"
                variant="small"
                class="flex items-start gap-2"
              >
                <template #default>
                  <UIcon
                    name="i-lucide-award"
                    class="size-4 text-primary-600 mt-0.5 flex-shrink-0"
                  />
                  <span><strong>Authority:</strong> Expert positioning with primary colors and award icons</span>
                </template>
              </LayoutText>

              <LayoutText
                :text="'• Urgency: Time-sensitive messaging with amber colors and timer icons'"
                variant="small"
                class="flex items-start gap-2"
              >
                <template #default>
                  <UIcon
                    name="i-lucide-timer"
                    class="size-4 text-warning-600 mt-0.5 flex-shrink-0"
                  />
                  <span><strong>Urgency:</strong> Time-sensitive messaging with amber colors and timer icons</span>
                </template>
              </LayoutText>

              <LayoutText
                :text="'• Auto-Assignment: Uses website intent config (primary: trust, secondary: authority)'"
                variant="small"
                class="flex items-start gap-2"
              >
                <template #default>
                  <UIcon
                    name="i-lucide-cpu"
                    class="size-4 text-purple-600 mt-0.5 flex-shrink-0"
                  />
                  <span><strong>Auto-Assignment:</strong> Uses website intent config (primary: trust, secondary: authority)</span>
                </template>
              </LayoutText>
            </div>

            <!-- Pattern visualization -->
            <div class="mt-6 p-4 bg-muted/30 rounded-lg">
              <div class="text-sm font-medium mb-3 text-center">
                Auto-Assignment Pattern
              </div>
              <div class="flex justify-center gap-2">
                <UBadge
                  color="success"
                  variant="soft"
                  size="sm"
                >
                  Trust (Primary)
                </UBadge>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-muted mt-1"
                />
                <UBadge
                  color="primary"
                  variant="soft"
                  size="sm"
                >
                  Authority (Secondary)
                </UBadge>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-muted mt-1"
                />
                <UBadge
                  color="success"
                  variant="soft"
                  size="sm"
                >
                  Trust
                </UBadge>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-muted mt-1"
                />
                <span class="text-muted text-sm">...</span>
              </div>
            </div>
          </LayoutStack>
        </UCard>
      </LayoutCenter>
    </LayoutStack>
  </LayoutCenter>
</template>
