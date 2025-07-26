<!-- app/components/section/faq/Authority.vue -->
<script setup lang="ts">
import type { FaqSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

const props = withDefaults(defineProps<Omit<FaqSection, 'type'>>(), {
  title: 'Technical Documentation & FAQ',
  twoColumn: true,
})

const authorityConfig: IntentConfig = {
  background: 'circuit',
  sectionVariant: 'default',
  emphasis: 'expertise',
  colorScheme: 'primary',
}

// Query FAQ collections - focus on technical depth
const { data: faqCollections } = await useAsyncData('faq-collections', () =>
  queryCollection('faq').all(),
)

// Transform with technical emphasis
const faqsByCategory = computed(() => {
  const grouped: Record<string, any[]> = {}

  faqCollections.value?.forEach((collection) => {
    const categoryName = collection._id?.replace('.yaml', '') || 'general'
    grouped[categoryName] = collection.faqs?.map((faq: any) => ({
      label: faq.question,
      content: faq.answer,
      value: `${categoryName}-${faq.question.toLowerCase().replace(/\s+/g, '-')}`,
      priority: faq.priority || 999,
    })) || []
  })

  return grouped
})

// Filter and sort by priority for technical depth
const displayCategories = computed(() => {
  const filtered = props.categories?.length
    ? Object.fromEntries(
        Object.entries(faqsByCategory.value).filter(([key]) =>
          props.categories!.includes(key),
        ),
      )
    : faqsByCategory.value

  // Sort each category by priority for technical relevance
  Object.keys(filtered).forEach((key) => {
    filtered[key].sort((a, b) => a.priority - b.priority)
  })

  return filtered
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
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-faq"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Authority-focused header -->
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

            <!-- Authority indicator -->
            <div class="flex justify-center">
              <UBadge
                color="primary"
                variant="solid"
                size="lg"
              >
                <UIcon
                  name="i-lucide-brain"
                  class="size-4 mr-2"
                />
                Expert Knowledge Base
              </UBadge>
            </div>
          </LayoutStack>
        </LayoutCenter>

        <!-- Category Filters with authority styling -->
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
              :color="selectedCategory === category.value ? 'primary' : 'gray'"
              size="sm"
              @click="selectedCategory = category.value"
            />
          </div>
        </div>

        <!-- Technical FAQ Grid -->
        <div
          :class="[
            'mx-auto',
            props.twoColumn ? 'max-w-6xl' : 'max-w-4xl',
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
                  item: 'border border-primary/20 bg-primary/5 rounded-lg mb-4 last:mb-0 hover:border-primary/40 transition-colors',
                  trigger: 'px-6 py-4 text-left font-semibold text-primary-700',
                  body: 'px-6 pb-4 text-muted prose prose-sm max-w-none',
                }"
              />
            </div>

            <!-- Right Column (only if twoColumn) -->
            <div v-if="props.twoColumn && activeItems.length > 1">
              <UAccordion
                :items="activeItems.slice(Math.ceil(activeItems.length / 2))"
                :ui="{
                  item: 'border border-primary/20 bg-primary/5 rounded-lg mb-4 last:mb-0 hover:border-primary/40 transition-colors',
                  trigger: 'px-6 py-4 text-left font-semibold text-primary-700',
                  body: 'px-6 pb-4 text-muted prose prose-sm max-w-none',
                }"
              />
            </div>
          </div>
        </div>

        <!-- Expert credentials footer -->
        <div class="text-center mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div class="flex justify-center items-center gap-4 mb-4">
            <UIcon
              name="i-lucide-award"
              class="size-6 text-primary-600"
            />
            <LayoutText
              text="Technical expertise backed by 10+ years of industry experience"
              variant="caption"
              class="text-primary-700 font-medium"
            />
          </div>

          <div class="flex justify-center gap-4">
            <UBadge
              v-for="cert in ['AWS Certified', 'TypeScript Expert', 'Automation Specialist']"
              :key="cert"
              color="primary"
              variant="outline"
              size="sm"
            >
              {{ cert }}
            </UBadge>
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
            text="No technical documentation available"
            variant="card"
            class="mb-2"
          />
          <LayoutText
            text="Check back later for detailed technical insights."
            variant="description"
          />
        </div>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.authority-faq {
 --section-emphasis: expertise;
}
</style>
