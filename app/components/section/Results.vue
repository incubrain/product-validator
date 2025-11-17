<script setup lang="ts">
const data = useSectionConfig('results');

const caseStudies = computed(() => data.value?.caseStudies ?? []);
const testimonials = computed(() => data.value?.testimonials ?? []);

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
</script>

<template>
  <ISectionWrapper id="#results" :intro="data.intro" :bridge="data.bridge">
    <!-- Case Studies -->
    <ISeparator v-if="data.separators?.[0]" v-bind="data.separators[0]" />

    <div v-if="caseStudies.length">
      <UPageGrid class="lg:grid-cols-2">
        <UCard
          v-for="study in caseStudies"
          :key="study.title"
          :ui="{
            root: [
              'flex flex-col',
              study.highlight && 'ring-2 ring-primary/30 bg-primary/5',
            ],
            body: 'grow space-y-4',
          }"
        >
          <!-- Header: Title + Founder Info -->
          <template #header>
            <div class="space-y-2">
              <h3 class="text-lg font-semibold">{{ study.title }}</h3>
              <div class="flex items-center gap-2 text-sm text-muted">
                <span>{{ study.founder.name }}</span>
                <span v-if="study.founder.productType">•</span>
                <span v-if="study.founder.productType">{{
                  study.founder.productType
                }}</span>
              </div>
            </div>
          </template>

          <!-- Evidence (Image/Video) - Below Header -->
          <div v-if="study.evidence" class="space-y-3">
            <!-- Screenshot -->
            <div
              v-if="study.evidence.screenshot"
              class="rounded-lg overflow-hidden border border-default"
            >
              <NuxtImg
                :src="study.evidence.screenshot"
                :alt="`${study.title} analytics screenshot`"
                class="w-full"
              />
            </div>

            <!-- Video Link (if no screenshot, or as additional button) -->
            <UButton
              v-if="study.evidence.videoUrl"
              :to="study.evidence.videoUrl"
              target="_blank"
              icon="i-lucide-play-circle"
              variant="outline"
              size="sm"
              block
              color="info"
            >
              <!-- {EXTRACT} -->
              Watch case study walkthrough
            </UButton>
          </div>

          <!-- Description -->
          <p class="text-sm leading-relaxed">
            {{ study.description }}
          </p>

          <!-- Metrics Grid -->
          <div v-if="study.metrics.length" class="grid grid-cols-2 gap-3">
            <div
              v-for="metric in study.metrics"
              :key="metric.label"
              class="bg-muted/30 rounded-lg p-3"
            >
              <p class="text-xs text-dimmed mb-1">{{ metric.label }}</p>
              <p class="font-semibold text-highlighted">{{ metric.value }}</p>
            </div>
          </div>

          <!-- Timeline -->
          <div v-if="study.timeline.milestones?.length" class="space-y-2">
            <p class="text-xs font-medium text-dimmed uppercase tracking-wide">
              <!-- {EXTRACT} -->
              Timeline
            </p>
            <div class="space-y-2">
              <div
                v-for="milestone in study.timeline.milestones"
                :key="milestone.date"
                class="flex items-start gap-2 text-xs"
              >
                <div class="size-2 rounded-full bg-primary mt-1 shrink-0" />
                <div class="flex-1">
                  <NuxtTime
                    :datetime="milestone.date"
                    class="text-muted"
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                  <p class="text-highlighted">{{ milestone.event }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer: Start Date + Link -->
          <template #footer>
            <div class="flex justify-between items-center">
              <NuxtTime
                v-if="study.timeline.start"
                class="text-xs text-muted"
                :datetime="study.timeline.start"
                year="numeric"
                month="short"
                day="numeric"
              />

              <UButton
                v-if="study.link || study.founder.websiteUrl"
                :to="study.link || study.founder.websiteUrl"
                target="_blank"
                trailing-icon="i-lucide-external-link"
                variant="ghost"
                size="xs"
                color="secondary"
              >
                <!-- {EXTRACT} -->
                Visit site
              </UButton>
            </div>
          </template>
        </UCard>
      </UPageGrid>
    </div>

    <!-- Testimonials -->
    <ISeparator v-if="data.separators?.[1]" v-bind="data.separators[1]" />

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
