<script setup lang="ts">
const proof = useFlowSection('socialProof');

// Group social proof by type for organized display
const groupedProof = computed(() => {
  const items = proof ?? [];
  return {
    highlight: items.filter((item) => item.type === 'highlight'),
    testimonials: items.filter((item) => item.type === 'testimonial'),
    caseStudies: items.filter((item) => item.type === 'case-study'),
  };
});

// Format testimonials for existing UI
const formattedTestimonials = computed(() =>
  groupedProof.value.testimonials.map((t) => ({
    quote: t.quote,
    user: {
      name: t.name,
      description: t.role ?? '',
      avatar: { src: t.avatarUrl ?? '', alt: t.name ?? '' },
    },
  })),
);

// Get highlight card data
const highlightCard = computed(() => {
  const highlight = groupedProof.value.highlight[0];
  return highlight
    ? {
        title: highlight.title,
        description: highlight.description,
        icon: highlight.icon,
        to: highlight.to ?? '#',
      }
    : null;
});
</script>

<template>
  <UPageSection
    headline="Community Wins"
    title="What early users say"
    description="Real results from founders using the template"
    icon="i-lucide-bolt"
    orientation="vertical"
  >
    <!-- Case Studies -->
    <USeparator label="SUCCESS STORIES" />
    <div v-if="groupedProof.caseStudies.length">
      <UPageGrid class="lg:grid-cols-2">
        <UPageCard
          v-for="caseStudy in groupedProof.caseStudies"
          :key="caseStudy.title"
          :title="caseStudy.title"
          icon="i-lucide-case-sensitive"
          variant="subtle"
        >
          <template #description>
            <div class="space-y-3 text-sm">
              <div><strong>Situation:</strong> {{ caseStudy.situation }}</div>
              <div><strong>Action:</strong> {{ caseStudy.action }}</div>
              <div><strong>Result:</strong> {{ caseStudy.result }}</div>
              <div v-if="caseStudy.metric" class="flex items-center gap-2 mt-2">
                <UBadge variant="solid" color="success">
                  {{ caseStudy.metric.label }}: {{ caseStudy.metric.value }}
                </UBadge>
                <span v-if="caseStudy.metric.sub" class="text-xs text-muted">
                  {{ caseStudy.metric.sub }}
                </span>
              </div>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>

    <!-- Testimonials -->
    <USeparator label="TESTIMONIALS" />
    <div v-if="formattedTestimonials.length || highlightCard">
      <UPageColumns>
        <!-- Highlight card -->
        <UPageCard
          v-if="highlightCard"
          :title="highlightCard.title"
          :description="highlightCard.description"
          :icon="highlightCard.icon"
          :to="highlightCard.to"
          variant="solid"
          :ui="{ leadingIcon: 'size-10' }"
        />

        <!-- Testimonial cards -->
        <UPageCard
          v-for="(testimonial, index) in formattedTestimonials"
          :key="index"
          :description="testimonial.quote"
          variant="subtle"
          :ui="{
            description:
              'before:content-[open-quote] after:content-[close-quote]',
          }"
        >
          <template #footer>
            <UUser v-bind="testimonial.user" size="xl" />
          </template>
        </UPageCard>
      </UPageColumns>
    </div>
  </UPageSection>
</template>
