<!-- app/pages/showcase/faq.vue -->
<script setup lang="ts">
// Different FAQ configurations for each variant
const faqVariants = [
  {
    name: 'Trust Variant',
    description: 'Reassurance-focused FAQs with transparent, honest answers',
    emotional: 'trust',
    props: {
      variant: 'trust',
      title: 'Transparent Answers to Common Questions',
      description: 'We believe in honest, straightforward communication about our services',
      categories: ['general', 'pricing'], // Focus on trust-building categories
      twoColumn: true,
    },
  },
  {
    name: 'Authority Variant',
    description: 'Technical depth with expert knowledge and professional insights',
    emotional: 'authority',
    props: {
      variant: 'authority',
      title: 'Technical Documentation & Expert Insights',
      description: 'In-depth answers backed by 15+ years of industry experience',
      categories: ['technical', 'process'], // Focus on expertise categories
      twoColumn: true,
    },
  },
  {
    name: 'Urgency Variant',
    description: 'Quick decision help with priority questions and fast response',
    emotional: 'urgency',
    props: {
      variant: 'urgency',
      title: 'Quick Decision Help - Get Answers Fast',
      description: 'Priority questions to help you make informed decisions quickly',
      categories: ['general', 'pricing'], // Focus on decision-making categories
      twoColumn: false, // Single column for urgency focus
    },
  },
]

const { getComponent } = useSectionComponents()
</script>

<template>
  <LayoutCenter variant="full">
    <LayoutStack variant="spacious">
      <ShowcasePageHeader
        title="FAQ Section Emotional Variants"
        subtitle="Different FAQ approaches: Trust (reassurance), Authority (technical depth), and Urgency (quick decisions) variants."
      />
      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in faqVariants"
          :key="variant.name"
          class="space-y-4"
        >
          <!-- Variant Info -->
          <ShowcaseVariantHeader
            :name="variant.name"
            :description="variant.description"
            :emotional="variant.emotional"
          />

          <!-- FAQ Section Component -->
          <component
            :is="getComponent('faq', variant.props.variant, index + 5)"
            v-bind="variant.props"
            :section-index="index + 5"
          />
        </div>
      </LayoutStack>
    </LayoutStack>
  </LayoutCenter>
</template>
