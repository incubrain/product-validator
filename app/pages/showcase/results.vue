<!-- app/pages/showcase/results.vue -->
<script setup lang="ts">
// Sample data for different emotional variants
const trustCards = [
  {
    title: '500+ Projects',
    value: '500+',
    description: 'Successfully completed automation projects with verified results',
    icon: 'i-lucide-check-circle',
  },
  {
    title: '99.9% Uptime',
    value: '99.9%',
    description: 'Reliable systems that our clients trust and depend on',
    icon: 'i-lucide-shield-check',
  },
  {
    title: '50+ Happy Clients',
    value: '50+',
    description: 'Satisfied customers who recommend our services',
    icon: 'i-lucide-users',
  },
  {
    title: '$2M+ Saved',
    value: '$2M+',
    description: 'Total cost savings achieved for our clients',
    icon: 'i-lucide-dollar-sign',
  },
]

const authorityCards = [
  {
    title: 'Industry Recognition',
    value: '10+',
    description: 'Awards and certifications in automation excellence',
    icon: 'i-lucide-award',
  },
  {
    title: 'Years Experience',
    value: '15+',
    description: 'Deep expertise in enterprise automation solutions',
    icon: 'i-lucide-brain',
  },
  {
    title: 'Technologies Mastered',
    value: '25+',
    description: 'Comprehensive knowledge across modern tech stack',
    icon: 'i-lucide-code',
  },
  {
    title: 'Enterprise Clients',
    value: '100+',
    description: 'Fortune 500 companies trust our expertise',
    icon: 'i-lucide-building',
  },
]

const urgencyCards = [
  {
    title: 'Response Time',
    value: '< 24hrs',
    description: 'Emergency fixes deployed within one business day',
    icon: 'i-lucide-zap',
  },
  {
    title: 'Available Slots',
    value: '3 Left',
    description: 'Limited availability for Q1 2025 projects',
    icon: 'i-lucide-calendar',
  },
  {
    title: 'Launch Bonus',
    value: '50% OFF',
    description: 'Limited-time discount for early adopters',
    icon: 'i-lucide-gift',
  },
  {
    title: 'Project Timeline',
    value: '2-4 weeks',
    description: 'Fast delivery without compromising quality',
    icon: 'i-lucide-clock',
  },
]

const resultsVariants = [
  {
    name: 'Trust Variant',
    description: 'Social proof focused metrics with verified results and client testimonials',
    emotional: 'trust',
    props: {
      variant: 'trust',
      goal: 'credibility',
      title: 'Proven Results You Can Trust',
      subtitle: 'Our track record speaks for itself with <strong>verified client outcomes</strong>',
      description: 'Every metric below has been validated by our clients and represents real business impact.',
      items: trustCards,
      action: {
        text: 'View Client Testimonials',
        link: '#testimonials',
        description: 'Verified • Transparent • Results-driven',
      },
    },
  },
  {
    name: 'Authority Variant',
    description: 'Expertise-driven metrics showcasing professional achievements and industry recognition',
    emotional: 'authority',
    props: {
      variant: 'authority',
      goal: 'credibility',
      title: 'Industry-Leading Expertise',
      subtitle: 'Professional achievements that demonstrate <strong>technical excellence</strong>',
      description: 'Our expertise is recognized across the industry with measurable impact.',
      items: authorityCards,
      action: {
        text: 'Explore Technical Portfolio',
        link: '#portfolio',
        description: 'Expert • Certified • Professional',
      },
    },
  },
  {
    name: 'Urgency Variant',
    description: 'Time-sensitive metrics emphasizing limited availability and immediate action',
    emotional: 'urgency',
    props: {
      variant: 'urgency',
      goal: 'convert',
      title: 'Time-Sensitive Opportunities',
      subtitle: 'Limited availability with <strong>exclusive launch benefits</strong>',
      description: 'Don\'t miss out on these time-limited opportunities to transform your business.',
      items: urgencyCards,
      action: {
        text: 'Claim Your Spot Now',
        link: '#booking',
        description: 'Limited time • Exclusive access • Act now',
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
      sectionIndex: 1, // Should get 'trust' (primary intent)
      goal: 'credibility',
      title: 'Auto-Assigned Results Section',
      subtitle: 'This section should automatically use <strong>trust variant</strong>',
      description: 'Testing the automatic intent assignment system for results sections.',
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
      <!-- Page Header -->
      <LayoutCenter variant="text-only">
        <LayoutStack variant="default">
          <LayoutHeading
            variant="hero"
            :text="'Results Section Emotional Variants'"
          />
          <LayoutText
            variant="subtitle"
            :text="'Explore different emotional triggers for results sections: Trust (social proof), Authority (expertise), and Urgency (time-sensitive) variants.'"
          />
        </LayoutStack>
      </LayoutCenter>

      <!-- Emotional Variants -->
      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in resultsVariants"
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

          <!-- Results Section Component -->
          <component
            :is="getComponent('results', variant.props.variant, index + 1)"
            v-bind="variant.props"
            :section-index="index + 1"
          />
        </div>
      </LayoutStack>

      <!-- Auto-Assignment Test -->
      <LayoutSection
        variant="default"
        background="neural"
      >
        <LayoutCenter variant="prose">
          <LayoutStack variant="spacious">
            <LayoutCenter variant="text-only">
              <LayoutStack variant="compact">
                <UBadge
                  label="AUTO-ASSIGNMENT TEST"
                  color="purple"
                  variant="solid"
                  size="lg"
                />
                <LayoutHeading
                  text="Automatic Intent Assignment"
                  variant="section"
                />
                <LayoutText
                  text="This section tests the automatic emotional trigger assignment based on section position in the page flow."
                  variant="description"
                />
              </LayoutStack>
            </LayoutCenter>

            <div
              v-for="test in autoAssignmentTest"
              :key="test.name"
              class="space-y-4"
            >
              <!-- Auto-assignment Results Section -->
              <component
                :is="getComponent('results', undefined, test.props.sectionIndex)"
                v-bind="test.props"
              />
            </div>
          </LayoutStack>
        </LayoutCenter>
      </LayoutSection>
    </LayoutStack>
  </LayoutCenter>
</template>
