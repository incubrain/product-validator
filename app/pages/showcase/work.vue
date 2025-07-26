<!-- app/pages/showcase/work.vue -->
<script setup lang="ts">
// Sample work items for different variants
const trustTestimonials = [
  {
    title: 'E-commerce Automation Success',
    description: '"Drew transformed our order processing from 4 hours to 15 minutes. ROI was immediate." - Sarah Chen, CTO',
    client: 'TechFlow Solutions',
    icon: 'i-lucide-quote',
    category: 'case-study',
  },
  {
    title: 'Supply Chain Optimization',
    description: '"99.9% uptime since implementation. Our customers trust us because we trust Drew." - Mike Rodriguez, Operations',
    client: 'Global Logistics Inc',
    icon: 'i-lucide-quote',
    category: 'case-study',
  },
  {
    title: 'Customer Service Revolution',
    description: '"Customer satisfaction increased 40% after automating our support workflows." - Lisa Park, Customer Success',
    client: 'ServiceFirst Corp',
    icon: 'i-lucide-quote',
    category: 'case-study',
  },
]

const authorityProjects = [
  {
    title: 'Enterprise Workflow Automation',
    description: 'Built scalable automation platform serving 10,000+ users across 15 departments',
    featured: true,
    path: '/blog/enterprise-automation',
    tags: ['Enterprise', 'Scalability', 'Integration'],
  },
  {
    title: 'AI-Powered Data Processing',
    description: 'Implemented machine learning pipeline processing 1TB+ daily with 99.99% accuracy',
    featured: true,
    path: '/blog/ai-data-processing',
    tags: ['AI/ML', 'Big Data', 'Performance'],
  },
  {
    title: 'Multi-Cloud Infrastructure',
    description: 'Designed fault-tolerant system across AWS, Azure, and GCP with zero downtime',
    featured: true,
    path: '/blog/multi-cloud-setup',
    tags: ['Cloud', 'DevOps', 'Reliability'],
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'Created executive dashboard processing 100M+ events per day with sub-second latency',
    featured: true,
    path: '/blog/realtime-analytics',
    tags: ['Analytics', 'Real-time', 'Visualization'],
  },
  {
    title: 'Blockchain Integration Platform',
    description: 'Built secure DeFi integration handling $10M+ in transactions with zero security incidents',
    featured: true,
    path: '/blog/blockchain-integration',
    tags: ['Blockchain', 'Security', 'DeFi'],
  },
  {
    title: 'IoT Device Management',
    description: 'Developed platform managing 50,000+ IoT devices with predictive maintenance',
    featured: true,
    path: '/blog/iot-management',
    tags: ['IoT', 'Predictive', 'Monitoring'],
  },
]

const urgencyProjects = [
  {
    title: 'Emergency System Recovery',
    description: 'Restored critical infrastructure within 6 hours, preventing $2M+ losses',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'project',
    urgent: true,
  },
  {
    title: 'Last-Minute Launch Support',
    description: 'Delivered production-ready automation 48 hours before product launch deadline',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'project',
    urgent: true,
  },
  {
    title: 'Black Friday Scaling',
    description: 'Implemented auto-scaling solution handling 10x traffic surge in 72 hours',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'project',
    urgent: true,
  },
  {
    title: 'Security Incident Response',
    description: 'Developed and deployed security automation preventing future vulnerabilities',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'project',
    urgent: true,
  },
]

const workVariants = [
  {
    name: 'Trust Variant',
    description: 'Client testimonials and case studies building trust through social proof',
    emotional: 'trust',
    props: {
      variant: 'trust',
      title: 'Trusted by Industry Leaders',
      subtitle: 'Real client success stories and verified outcomes',
      items: trustTestimonials,
      action: {
        text: 'Read More Success Stories',
        link: '#case-studies',
        description: 'Verified • Transparent • Results-driven',
      },
    },
  },
  {
    name: 'Authority Variant',
    description: 'Portfolio showcase demonstrating technical expertise and industry recognition',
    emotional: 'authority',
    props: {
      variant: 'authority',
      title: 'Featured Technical Work',
      subtitle: 'Portfolio showcasing cutting-edge automation solutions',
      items: authorityProjects,
      action: {
        text: 'Explore Technical Portfolio',
        link: '#portfolio',
        description: 'Expert • Innovative • Professional',
      },
    },
  },
  {
    name: 'Urgency Variant',
    description: 'Recent projects emphasizing availability and fast turnaround times',
    emotional: 'urgency',
    props: {
      variant: 'urgency',
      title: 'Recent Emergency Projects',
      subtitle: 'Fast delivery when time is critical',
      items: urgencyProjects,
      action: {
        text: 'Book Emergency Consultation',
        link: '#emergency',
        description: 'Available now • Fast response • Critical support',
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
            :text="'Work Section Emotional Variants'"
          />
          <LayoutText
            variant="subtitle"
            :text="'Explore different approaches to showcasing work: Trust (testimonials), Authority (expertise), and Urgency (availability) variants.'"
          />
        </LayoutStack>
      </LayoutCenter>

      <!-- Emotional Variants -->
      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in workVariants"
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

          <!-- Work Section Component -->
          <component
            :is="getComponent('work', variant.props.variant, index + 2)"
            v-bind="variant.props"
            :section-index="index + 2"
          />
        </div>
      </LayoutStack>
    </LayoutStack>
  </LayoutCenter>
</template>
