<!-- app/components/section/faq/Urgency.vue -->
<script setup lang="ts">
import type { FaqSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

const props = withDefaults(defineProps<Omit<FaqSection, 'type'>>(), {
  title: 'Quick Decision Help',
  twoColumn: false, // Single column for urgency focus
})

const urgencyConfig: IntentConfig = {
  background: 'cyber',
  sectionVariant: 'compact',
  emphasis: 'action',
  colorScheme: 'amber',
}

// Query FAQ collections - focus on decision-making
const { data: faqCollections } = await useAsyncData('faq-collections', () =>
  queryCollection('faq').all(),
)

// Transform with urgency emphasis - prioritize decision-focused FAQs
const faqsByCategory = computed(() => {
  const grouped: Record<string, any[]> = {}

  faqCollections.value?.forEach((collection) => {
    const categoryName = collection._id?.replace('.yaml', '') || 'general'
    grouped[categoryName] = collection.faqs?.map((faq: any) => ({
      label: faq.question,
      content: faq.answer,
      value: `${categoryName}-${faq.question.toLowerCase().replace(/\s+/g, '-')}`,
      priority: faq.priority || 999,
      isUrgent: faq.question.toLowerCase().includes('how quickly')
        || faq.question.toLowerCase().includes('timeline')
        || faq.question.toLowerCase().includes('pricing')
        || faq.question.toLowerCase().includes('cost'),
    })) || []
  })

  return grouped
})

// Filter and prioritize urgent FAQs
const displayCategories = computed(() => {
  const filtered = props.categories?.length
    ? Object.fromEntries(
        Object.entries(faqsByCategory.value).filter(([key]) =>
          props.categories!.includes(key),
        ),
      )
    : faqsByCategory.value

  // Sort each category - urgent FAQs first
  Object.keys(filtered).forEach((key) => {
    filtered[key].sort((a, b) => {
      if (a.isUrgent && !b.isUrgent) return -1
      if (!a.isUrgent && b.isUrgent) return 1
      return a.priority - b.priority
    })
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
    :variant="urgencyConfig.sectionVariant"
    :background="urgencyConfig.background"
    class="urgency-faq"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="compact">
        <!-- Urgency-focused header -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="compact">
            <LayoutCenter>
              <UBadge
                color="warning"
                variant="solid"
                size="lg"
                class="animate-pulse"
              >
                <UIcon
                  name="i-lucide-zap"
                  class="size-4 mr-2"
                />
                Fast Answers
              </UBadge>
            </LayoutCenter>

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
          </LayoutStack>
        </LayoutCenter>

        <!-- Category Filters with urgency styling -->
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
              :color="selectedCategory === category.value ? 'warning' : 'gray'"
              size="sm"
              @click="selectedCategory = category.value"
            />
          </div>
        </div>

        <!-- Urgent FAQ List - Single column for focus -->
        <div class="max-w-4xl mx-auto">
          <UAccordion
            :items="activeItems"
            :ui="{
              item: 'border border-warning/30 bg-warning/5 rounded-lg mb-4 last:mb-0 hover:border-warning/50 transition-all duration-200 relative overflow-hidden',
              trigger: 'px-6 py-4 text-left font-medium relative z-10',
              body: 'px-6 pb-4 text-muted relative z-10',
            }"
          >
            <template #item="{ item, index, open }">
              <!-- Pulse animation for urgent items -->
              <div
                v-if="activeItems[index]?.isUrgent"
                class="absolute inset-0 bg-warning/5 animate-pulse"
              />

              <UAccordionItem
                :value="item.value"
                :open="open"
              >
                <template #trigger>
                  <div class="flex items-center gap-3 w-full relative z-10">
                    <!-- Urgency indicator for priority questions -->
                    <div
                      v-if="activeItems[index]?.isUrgent"
                      class="w-2 h-2 bg-warning-500 rounded-full animate-pulse"
                    />

                    <span class="flex-1">{{ item.label }}</span>

                    <!-- Priority badge -->
                    <UBadge
                      v-if="activeItems[index]?.isUrgent"
                      color="warning"
                      variant="solid"
                      size="xs"
                    >
                      Priority
                    </UBadge>
                  </div>
                </template>

                <template #default>
                  <div class="relative z-10">
                    {{ item.content }}
                  </div>
                </template>
              </UAccordionItem>
            </template>
          </UAccordion>
        </div>

        <!-- Urgency CTA -->
        <LayoutCenter class="mt-8">
          <div class="bg-warning/10 border border-warning/30 rounded-lg p-6 text-center">
            <div class="flex justify-center items-center gap-3 mb-4">
              <UIcon
                name="i-lucide-phone"
                class="size-5 text-warning-600"
              />
              <LayoutText
                text="Need immediate answers? Get instant response within 24 hours"
                variant="card"
                class="text-warning-700 font-medium"
              />
            </div>

            <UButton
              label="Contact Now"
              color="warning"
              size="lg"
              trailing-icon="i-lucide-message-circle"
              to="/contact"
              class="animate-pulse"
            />
          </div>
        </LayoutCenter>

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
            text="No urgent FAQs available"
            variant="card"
            class="mb-2"
          />
          <LayoutText
            text="Contact us directly for immediate assistance."
            variant="description"
          />
        </div>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
.urgency-faq {
  --section-emphasis: action;
}
</style>
