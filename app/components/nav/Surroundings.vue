<!-- components/layout/Surroundings.vue -->
<script setup lang="ts">
interface Props {
  /** Content collection to query */
  collection: string
  /** Current item path */
  currentPath: string
  /** Field to order by */
  orderBy?: string
  /** Order direction */
  orderDirection?: 'ASC' | 'DESC'
  /** Previous item label */
  previousLabel?: string
  /** Next item label */
  nextLabel?: string
  /** Show border */
  showBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  orderBy: 'date',
  orderDirection: 'DESC',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  showBorder: true
})

// Query surroundings for any collection
const { data: surroundings } = await useAsyncData(
  `${props.collection}-surroundings-${props.currentPath}`,
  () => queryCollectionItemSurroundings(props.collection, props.currentPath)
    .order(props.orderBy, props.orderDirection)
)

const previousItem = computed(() => surroundings.value?.[0])
const nextItem = computed(() => surroundings.value?.[1])
</script>

<template>
  <div 
    class="flex justify-between items-center py-8"
    :class="{ 'border-t border-gray-200 dark:border-gray-700': showBorder }"
  >
    <!-- Previous Item -->
    <div
      v-if="previousItem"
      class="flex-1 text-left"
    >
      <ULink
        :to="previousItem.path"
        class="group inline-flex items-center text-sm hover:text-primary transition-colors"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
        />
        <div>
          <div class="text-xs text-gray-500 mb-1">{{ previousLabel }}</div>
          <div class="font-medium line-clamp-1">{{ previousItem.title }}</div>
        </div>
      </ULink>
    </div>

    <!-- Spacer when no previous item -->
    <div 
      v-else 
      class="flex-1"
    />

    <!-- Center spacer -->
    <div class="flex-1" />

    <!-- Next Item -->
    <div
      v-if="nextItem"
      class="flex-1 text-right"
    >
      <ULink
        :to="nextItem.path"
        class="group inline-flex items-center text-sm hover:text-primary transition-colors"
      >
        <div>
          <div class="text-xs text-gray-500 mb-1">{{ nextLabel }}</div>
          <div class="font-medium line-clamp-1">{{ nextItem.title }}</div>
        </div>
        <UIcon
          name="i-lucide-arrow-right"
          class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
        />
      </ULink>
    </div>

    <!-- Spacer when no next item -->
    <div 
      v-else 
      class="flex-1"
    />
  </div>
</template>