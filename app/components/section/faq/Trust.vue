<!-- app/components/section/faq/Trust.vue -->
<!-- MOVED FROM: app/components/section/FAQ.vue -->
<script setup lang="ts">
import type { FaqSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

const props = withDefaults(defineProps<Omit<FaqSection, 'type'>>(), {
  title: 'Frequently Asked Questions',
  twoColumn: true,
})

const trustConfig: IntentConfig = {
  background: 'minimal',
  sectionVariant: 'generous',
  emphasis: 'social-proof',
  colorScheme: 'success',
}

// Query FAQ collections using queryCollection
const { data: faqCollections } = await useAsyncData('faq-collections', () =>
  queryCollection('faq').all(),
)

// Transform to accordion items with category grouping
const faqsByCategory = computed(() => {
  const grouped: Record<string, any[]> = {}

  faqCollections.value?.forEach((collection) => {
    const categoryName = collection._id?.replace('.yaml', '') || 'general'
    grouped[categoryName] = collection.faqs?.map((faq: any) => ({
      label: faq.question,
      content: faq.answer,
      value: `${categoryName}-${faq.question.toLowerCase().replace(/\s+/g, '-')}`,
    })) || []
  })

  return grouped
})

// Filter categories if specified
const displayCategories = computed(() => {
  if (props.categories?.length) {
    return Object.fromEntries(
      Object.entries(faqsByCategory.value).filter(([key]) =>
        props.categories!.includes(key),
      ),
    )
  }
  return faqsByCategory.value
})

const selectedCategory = ref(Object.keys(displayCategories.value)[0] || 'general')
const activeItems = computed(() => displayCategories.value[selectedCategory.value] || [])

const categoryButtons = computed(() =>
  Object.keys(displayCategories.value).map(key => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key,
  })),
)
</script>

<template>
  <LayoutSection
    :variant="trustConfig.sectionVariant"
    :background="trustConfig.background"
    class="trust-faq"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Trust-focused header -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="default">
            <LayoutHeading
              :text="title"
              variant="section"
              anchor
            />

            <LayoutText
              v-if="description"
              :text="description"
              variant="subtitle"
            />

            <!-- Trust indicator -->
            <div class="flex justify-center">
              <UBadge
                color="success"
                variant="soft"
                size="lg"
              >
                <UIcon
                  name="i-lucide-shield-check"
                  class="size-4 mr-2"
                />
                Transparent & Honest
              </UBadge>
            </div>
          </LayoutStack>
        </LayoutCenter>

        <!-- Category Filters with trust styling -->
        <div
          v-if="categoryButtons.length > 1"
          class="flex justify-center"
        >
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="category in categoryButtons"
              :key="category.value"
              :label="category.label"
              :variant="selectedCategory === category.value ? 'solid' : 'outline'"
              :color="selectedCategory === category.value ? 'success' : 'gray'"
              size="sm"
              @click="selectedCategory = category.value"
            />
          </div>
        </div>

        <!-- FAQ Grid with trust styling -->
        <div
          :class="[
            'mx-auto',
            props.twoColumn ? 'max-w-5xl' : 'max-w-3xl',
          ]"
        >
          <div
            :class="[
              'grid gap-6',
              props.twoColumn ? 'lg:grid-cols-2 lg:gap-8' : 'grid-cols-1',
            ]"
          >
            <!-- Left Column / Full Width -->
            <div>
              <UAccordion
                :items="activeItems.slice(0, Math.ceil(activeItems.length / (props.twoColumn ? 2 : 1)))"
                :ui="{
                  item: 'border border-success/20 bg-success/5 rounded-lg mb-4 last:mb-0 hover:border-success/40 transition-colors',
                  trigger: 'px-6 py-4 text-left font-medium',
                  body: 'px-6 pb-4 text-muted',
                }"
              />
            </div>

            <!-- Right Column (only if twoColumn) -->
            <div v-if="props.twoColumn && activeItems.length > 1">
              <UAccordion
                :items="activeItems.slice(Math.ceil(activeItems.length / 2))"
                :ui="{
                  item: 'border border-success/20 bg-success/5 rounded-lg mb-4 last:mb-0 hover:border-success/40 transition-colors',
                  trigger: 'px-6 py-4 text-left font-medium',
                  body: 'px-6 pb-4 text-muted',
                }"
              />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!activeItems.length"
          class="text-center py-12"
        >
          <UIcon
            name="i-lucide-help-circle"
            class="mx-auto size-12 text-muted mb-4"
          />
          <LayoutHeading
            text="No FAQs available"
            variant="card"
            class="mb-2"
          />
          <LayoutText
            text="Check back later for more information."
            variant="description"
          />
        </div>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.trust-faq {
  --section-emphasis: social-proof;
}
</style>
