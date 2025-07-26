<!-- app/pages/showcase/about.vue -->
<script setup lang="ts">
// Sample data for different about variants
const trustStats = [
  { label: 'Happy Clients', value: '50+' },
  { label: 'Success Rate', value: '99%' },
  { label: 'Years Trusted', value: '10+' },
  { label: 'Referrals', value: '85%' },
]

const authorityCredentials = [
  { label: 'Certifications', value: '15+' },
  { label: 'Speaking Events', value: '25+' },
  { label: 'Published Articles', value: '40+' },
  { label: 'Industry Awards', value: '8' },
]

const urgencyAvailability = [
  { label: 'Response Time', value: '< 24hrs' },
  { label: 'Next Available', value: '2 weeks' },
  { label: 'Queue Position', value: '#3' },
  { label: 'Booking Rate', value: '95%' },
]

const aboutVariants = [
  {
    name: 'Trust Variant',
    description: 'Personal story with social proof and trust-building elements',
    emotional: 'trust',
    props: {
      variant: 'trust',
      title: 'Hi, I\'m Drew MacGibbon',
      story: `
        <p>For over a decade, I've been helping businesses transform their operations through intelligent automation. What started as curiosity about making tedious tasks disappear has grown into a passion for creating systems that genuinely improve people's work lives.</p>
        
        <p>I believe in <strong>transparent communication</strong>, <strong>reliable delivery</strong>, and building solutions that actually work. My clients often become long-term partners because they know they can trust me to deliver on my promises.</p>
        
        <p>When I'm not automating workflows, you'll find me exploring new technologies, writing about automation best practices, or helping other developers learn the craft.</p>
      `,
      image: '/images/drew-professional.jpg',
      items: trustStats,
    },
  },
  {
    name: 'Authority Variant',
    description: 'Professional credentials and expertise-focused presentation',
    emotional: 'authority',
    props: {
      variant: 'authority',
      title: 'Drew MacGibbon, Automation Expert',
      story: `
        <p>As a <strong>certified automation architect</strong> with 15+ years of enterprise experience, I specialize in designing scalable automation solutions for Fortune 500 companies and high-growth startups.</p>
        
        <p>My expertise spans the entire automation lifecycle: from initial assessment and architecture design to implementation, monitoring, and optimization. I've led teams implementing automation solutions that process millions of transactions daily.</p>
        
        <p><strong>Industry Recognition:</strong> AWS Advanced Partner, Microsoft MVP, frequent conference speaker, and contributor to open-source automation frameworks used by thousands of developers worldwide.</p>
        
        <p>I combine deep technical knowledge with business acumen to deliver automation solutions that drive measurable ROI and competitive advantage.</p>
      `,
      image: '/images/drew-professional.jpg',
      items: authorityCredentials,
    },
  },
  {
    name: 'Urgency Variant',
    description: 'Availability-focused with immediate booking emphasis',
    emotional: 'urgency',
    props: {
      variant: 'urgency',
      title: 'Ready to Start Your Project Today',
      story: `
        <p><strong>Limited availability for Q1 2025:</strong> I only take on 3-4 major projects per quarter to ensure each client gets the attention and quality they deserve.</p>
        
        <p>My rapid-deployment methodology means most automation projects are live within 2-4 weeks. I maintain a 95% on-time delivery rate because I understand that time is your most valuable resource.</p>
        
        <p><strong>Current status:</strong> I have one remaining slot for January 2025. If you're ready to transform your business operations, let's discuss your project immediately.</p>
        
        <p>Emergency support available 24/7 for critical system issues.</p>
      `,
      image: '/images/drew-professional.jpg',
      items: urgencyAvailability,
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
            :text="'About Section Emotional Variants'"
          />
          <LayoutText
            variant="subtitle"
            :text="'Different approaches to personal presentation: Trust (personal connection), Authority (credentials), and Urgency (availability) variants.'"
          />
        </LayoutStack>
      </LayoutCenter>

      <!-- Emotional Variants -->
      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in aboutVariants"
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

          <!-- About Section Component -->
          <component
            :is="getComponent('about', variant.props.variant, index + 3)"
            v-bind="variant.props"
            :section-index="index + 3"
          />
        </div>
      </LayoutStack>
    </LayoutStack>
  </LayoutCenter>
</template>
