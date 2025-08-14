<script setup lang="ts">
import type { AccordionItem, AccordionProps } from '@nuxt/ui'
import accordionStyles from '~~/theme/i/accordion'

interface Props {
  items?: AccordionItem[]
  variant?: 'single' | 'double'
  intent?: 'trust' | 'authority' | 'urgency' | 'neutral'
  type?: 'single' | 'multiple'
  collapsible?: boolean
  categories?: string[]
  showCategoryFilter?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'double',
  intent: 'neutral',
  type: 'single',
  collapsible: true,
  showCategoryFilter: false,
})

const styles = computed(() => accordionStyles(props))

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
      keywords: faq.keywords || [],
      priority: faq.priority || 999,
    })) || []
  })

  return grouped
})

// Filter categories if specified, or use all available
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

// Use provided items or fetch from categories
const finalItems = computed(() => {
  if (props.items?.length) {
    return props.items
  }

  // If no items provided, use first category or flatten all
  const categories = Object.values(displayCategories.value)
  return categories.length > 0 ? categories[0] : []
})

const selectedCategory = ref(Object.keys(displayCategories.value)[0] || 'general')
const activeItems = computed(() => {
  if (props.items?.length) {
    return props.items // Use provided items
  }
  return displayCategories.value[selectedCategory.value] || []
})

const categoryButtons = computed(() =>
  Object.keys(displayCategories.value).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key,
  })),
)

// Split items for two-column layout
const splitItems = computed(() => {
  const items = props.showCategoryFilter ? activeItems.value : finalItems.value

  if (!items) {
    console.warn(`No items for IAccordion`)
    return []
  }

  if (props.variant === 'single') {
    return [items]
  }

  const midpoint = Math.ceil(items.length / 2)
  return [
    items.slice(0, midpoint),
    items.slice(midpoint),
  ]
})

// Enhanced UI configuration that prevents layout shift
const accordionUI = computed(() => ({
  root: 'w-full',
  item: [
    'border-b border-muted/20 last:border-b-0',
    'transition-colors duration-200',
  ].join(' '),
  header: 'flex',
  trigger: [
    'group flex-1 flex items-center gap-3 font-medium text-sm py-4',
    'focus-visible:outline-primary min-w-0',
    'transition-all duration-200',
    'hover:bg-muted/5',
    'pr-10 relative', // Prevent layout shift by reserving space for chevron
  ].join(' '),
  content: [
    'data-[state=open]:animate-[accordion-down_200ms_ease-out]',
    'data-[state=closed]:animate-[accordion-up_200ms_ease-out]',
    'overflow-hidden focus:outline-none',
  ].join(' '),
  body: 'text-sm pb-4 pr-10 text-muted leading-relaxed',
  leadingIcon: 'shrink-0 size-5',
  trailingIcon: [
    'absolute right-3 top-1/2 -translate-y-1/2',
    'shrink-0 size-5',
    'group-data-[state=open]:rotate-180',
    'transition-transform duration-200',
    styles.value.icon(),
  ].join(' '),
  label: [
    'text-start break-words flex-1',
    styles.value.label(),
  ].join(' '),
  ...props.ui,
}))

// Intent-based button colors
const intentButtonColors = computed(() => {
  switch (props.intent) {
    case 'trust': return { active: 'success', inactive: 'gray' }
    case 'authority': return { active: 'primary', inactive: 'gray' }
    case 'urgency': return { active: 'warning', inactive: 'gray' }
    default: return { active: 'primary', inactive: 'gray' }
  }
})
</script>

<template>
  <div :class="[styles.root(), $attrs.class]">
    <!-- Category Filter (optional) -->
    <div
      v-if="showCategoryFilter && categoryButtons.length > 1"
      class="flex justify-center mb-8"
    >
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="category in categoryButtons"
          :key="category.value"
          :label="category.label"
          :variant="selectedCategory === category.value ? 'solid' : 'outline'"
          :color="selectedCategory === category.value ? intentButtonColors.active : intentButtonColors.inactive"
          size="sm"
          @click="selectedCategory = category.value"
        />
      </div>
    </div>

    <!-- Single column layout -->
    <div
      v-if="variant === 'single'"
      class="w-full"
    >
      <UAccordion
        :items="showCategoryFilter ? activeItems : finalItems"
        :type="type"
        :collapsible="collapsible"
        :ui="accordionUI"
        trailing-icon="i-lucide-chevron-down"
      />
    </div>

    <!-- Two column responsive layout -->
    <div
      v-else
      :class="styles.grid()"
    >
      <div
        v-for="(columnItems, columnIndex) in splitItems"
        :key="`column-${columnIndex}`"
        class="w-full"
      >
        <UAccordion
          :items="columnItems"
          :type="type"
          :collapsible="collapsible"
          :ui="accordionUI"
          trailing-icon="i-lucide-chevron-down"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="(!showCategoryFilter && !finalItems.length) || (showCategoryFilter && !activeItems.length)"
      class="text-center py-12"
    >
      <UIcon
        name="i-lucide-help-circle"
        class="mx-auto size-12 text-muted mb-4"
      />
      <IHeading
        text="No FAQs available"
        variant="card"
        class="mb-2"
      />
      <IText
        text="Check back later for more information."
        variant="description"
      />
    </div>
  </div>
</template>
