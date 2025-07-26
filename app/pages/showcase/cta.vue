<!-- app/pages/showcase/cta.vue -->
<script setup lang="ts">
// Sample CTA cards for different variants
const trustCards = [
  {
    title: 'Free Consultation',
    subtitle: 'Risk-free discovery session to understand your automation needs',
    action: {
      text: 'Schedule Free Call',
      link: '#consultation',
    },
  },
  {
    title: 'Success Guarantee',
    subtitle: '100% satisfaction guarantee with full refund if goals aren\'t met',
    action: {
      text: 'Learn About Guarantee',
      link: '#guarantee',
    },
  },
]

const authorityCards = [
  {
    title: 'Expert Consultation',
    subtitle: 'Strategic automation assessment with detailed implementation roadmap',
    action: {
      text: 'Book Expert Session',
      link: '#expert-consultation',
    },
  },
  {
    title: 'Enterprise Partnership',
    subtitle: 'Comprehensive automation transformation with ongoing support',
    action: {
      text: 'Discuss Enterprise Needs',
      link: '#enterprise',
    },
  },
]

const urgencyCards = [
  {
    title: 'Limited Time: 50% Off',
    subtitle: 'Launch week special - exclusive pricing for early adopters only',
    action: {
      text: 'Claim Launch Discount',
      link: '#launch-offer',
    },
  },
  {
    title: 'Last 3 Spots Available',
    subtitle: 'Final availability for Q1 2025 - secure your spot immediately',
    action: {
      text: 'Reserve Your Spot',
      link: '#reserve',
    },
  },
]

const ctaVariants = [
  {
    name: 'Trust Variant',
    description: 'Risk-free offers with guarantees and social proof emphasis',
    emotional: 'trust',
    props: {
      variant: 'trust',
      title: 'Start Your Automation Journey Risk-Free',
      subtitle: 'Join 50+ successful clients who trust our proven process',
      items: trustCards,
    },
  },
  {
    name: 'Authority Variant',
    description: 'Expert-level consultations and professional services focus',
    emotional: 'authority',
    props: {
      variant: 'authority',
      title: 'Work With Industry-Recognized Experts',
      subtitle: 'Get strategic guidance from certified automation professionals',
      items: authorityCards,
    },
  },
  {
    name: 'Urgency Variant',
    description: 'Time-sensitive offers with scarcity and immediate action',
    emotional: 'urgency',
    props: {
      variant: 'urgency',
      title: 'Don\'t Miss These Limited Opportunities',
      subtitle: 'Exclusive launch pricing ends soon - secure your transformation today',
      items: urgencyCards,
    },
  },
]

const { getComponent } = useSectionComponents()
</script>

<template>
  <LayoutCenter variant="full">
    <LayoutStack variant="spacious">
      <!-- Page Header -->
      <LayoutCenter variant="text-only">
        <LayoutStack variant="default">
          <LayoutHeading
            variant="hero"
            :text="'CTA Section Emotional Variants'"
          />
          <LayoutText
            variant="subtitle"
            :text="'Different call-to-action approaches: Trust (risk-free), Authority (expert consultation), and Urgency (limited-time) variants.'"
          />
        </LayoutStack>
      </LayoutCenter>

      <!-- Emotional Variants -->
      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in ctaVariants"
          :key="variant.name"
          class="space-y-4"
        >
          <!-- Variant Info -->
          <LayoutCenter variant="prose">
            <LayoutStack variant="compact">
              <div class="flex items-center gap-3">
                <UBadge
                  :label="variant.emotional.toUpperCase()"
                  :color="variant.emotional === 'trust' ? 'green' : variant.emotional === 'authority' ? 'blue' : 'orange'"
                  variant="solid"
                  size="lg"
                />
                <LayoutHeading
                  :text="variant.name"
                  variant="card"
                />
              </div>
              <LayoutText
                :text="variant.description"
                variant="description"
              />
            </LayoutStack>
          </LayoutCenter>

          <!-- CTA Section Component -->
          <component
            :is="getComponent('cta', variant.props.variant, index + 4)"
            v-bind="variant.props"
            :section-index="index + 4"
          />
        </div>
      </LayoutStack>
    </LayoutStack>
  </LayoutCenter>
</template>
