<script setup lang="ts">
const props = defineProps<{
  data?: any;
}>();

// Fetch testimonials from results collection
const { data: testimonialsFile } = await useAsyncData('testimonials', () => 
  queryCollection('results').where('stem', '=', 'results/testimonials').first()
);

const testimonials = computed(() => testimonialsFile.value?.items || []);

// Format testimonials for UPageCard
const formattedTestimonials = computed(() =>
  testimonials.value.map((t) => ({
    quote: t.quote,
    user: {
      name: t.name,
      description: t.role,
      avatar: { src: t.avatarUrl ?? '', alt: t.name },
    },
    link: t.link,
    highlight: t.highlight,
  })),
);

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper v-if="showSection('results')" id="#results" :intro="data.intro" :bridge="data.bridge">
    <div v-if="formattedTestimonials.length">
      <UPageColumns class="gap-0 space-y-0">
        <UPageCard
          v-for="(testimonial, index) in formattedTestimonials"
          :key="index"
          :description="testimonial.quote"
          :to="testimonial.link"
          :variant="testimonial.highlight ? 'solid' : 'outline'"
          :class="testimonial.highlight ? 'text-inverted' : ''"
          :ui="{
            root: 'rounded-none',
            description: testimonial.highlight
              ? 'text-inverted'
              : 'before:content-[open-quote] after:content-[close-quote]',
          }"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="xl"
              :ui="{
                description: testimonial.highlight ? 'text-inverted!' : '',
                name: testimonial.highlight ? 'text-inverted!' : '',
              }"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </div>
  </ISectionWrapper>
</template>
