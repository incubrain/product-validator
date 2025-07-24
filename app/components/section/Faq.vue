<!-- components/section/FAQ.vue -->
<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  categories?: string[]
  twoColumn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Frequently Asked Questions',
  twoColumn: true
})

// Query FAQ collections using queryCollection
const { data: faqCollections } = await useAsyncData('faq-collections', () => 
  queryCollection('faq').all()
)

// Transform to accordion items with category grouping
const faqsByCategory = computed(() => {
  const grouped: Record<string, any[]> = {}
  
  faqCollections.value?.forEach(collection => {
    // Extract category from filename (e.g., "general" from "general.yaml")
    const categoryName = collection._id?.replace('.yaml', '') || 'general'
    grouped[categoryName] = collection.faqs?.map((faq: any) => ({
      label: faq.question,
      content: faq.answer,
      value: `${categoryName}-${faq.question.toLowerCase().replace(/\s+/g, '-')}`
    })) || []
  })
  
  return grouped
})

// Filter categories if specified
const displayCategories = computed(() => {
  if (props.categories?.length) {
    return Object.fromEntries(
      Object.entries(faqsByCategory.value).filter(([key]) => 
        props.categories!.includes(key)
      )
    )
  }
  return faqsByCategory.value
})

const selectedCategory = ref(Object.keys(displayCategories.value)[0] || 'general')
const activeItems = computed(() => displayCategories.value[selectedCategory.value] || [])

const categoryButtons = computed(() => 
  Object.keys(displayCategories.value).map(key => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key
  }))
)
</script>

<template>
  <section>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header -->
      <div class="mx-auto max-w-2xl text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {{ title }}
        </h2>
        <p 
          v-if="description" 
          class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400"
        >
          {{ description }}
        </p>
      </div>

      <!-- Category Filters -->
      <div 
        v-if="categoryButtons.length > 1" 
        class="flex justify-center mb-8"
      >
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="category in categoryButtons"
            :key="category.value"
            :label="category.label"
            :variant="selectedCategory === category.value ? 'solid' : 'outline'"
            size="sm"
            @click="selectedCategory = category.value"
          />
        </div>
      </div>

      <!-- FAQ Grid -->
      <div 
        :class="[
          'mx-auto',
          props.twoColumn ? 'max-w-5xl' : 'max-w-3xl'
        ]"
      >
        <div 
          :class="[
            'grid gap-6',
            props.twoColumn ? 'lg:grid-cols-2 lg:gap-8' : 'grid-cols-1'
          ]"
        >
          <!-- Left Column / Full Width -->
          <div>
            <UAccordion 
              :items="activeItems.slice(0, Math.ceil(activeItems.length / (props.twoColumn ? 2 : 1)))"
              :ui="{
                item: 'border border-gray-200 dark:border-gray-800 rounded-lg mb-4 last:mb-0',
                trigger: 'px-6 py-4 text-left font-medium',
                body: 'px-6 pb-4 text-gray-600 dark:text-gray-400'
              }"
            />
          </div>

          <!-- Right Column (only if twoColumn) -->
          <div v-if="props.twoColumn && activeItems.length > 1">
            <UAccordion 
              :items="activeItems.slice(Math.ceil(activeItems.length / 2))"
              :ui="{
                item: 'border border-gray-200 dark:border-gray-800 rounded-lg mb-4 last:mb-0',
                trigger: 'px-6 py-4 text-left font-medium',
                body: 'px-6 pb-4 text-gray-600 dark:text-gray-400'
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
          class="mx-auto size-12 text-gray-400 mb-4" 
        />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No FAQs available
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Check back later for more information.
        </p>
      </div>
    </div>
  </section>
</template>