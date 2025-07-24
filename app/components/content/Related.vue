<!-- components/layout/RelatedContent.vue -->
<script setup lang="ts">
interface Props {
  /** Content collection to query */
  collection: string
  /** Current item to exclude from results */
  currentPath: string
  /** Field to match for related items */
  relatedBy?: string
  /** Value to match against (e.g., current category) */
  relatedValue?: string
  /** Maximum number of related items */
  limit?: number
  /** Field to order by */
  orderBy?: 'id' | 'stem' | 'extension' | 'meta'
  /** Order direction */
  orderDirection?: 'ASC' | 'DESC'
  /** Section title */
  title?: string
  /** Section badge text */
  badge?: string
  /** Badge color */
  badgeColor?: string
  /** Grid columns for different breakpoints */
  gridCols?: string
}

const props = withDefaults(defineProps<Props>(), {
  relatedBy: 'category',
  limit: 4,
  orderBy: 'id',
  orderDirection: 'DESC',
  title: 'Related Content',
  badge: 'Continue Reading',
  badgeColor: 'primary',
  gridCols: 'md:grid-cols-2'
})

// Query related content
const { data: relatedItems, pending } = await useAsyncData(
  `related-${props.collection}-${props.currentPath}-${props.relatedValue}`,
  async () => {
    let query = queryCollection(props.collection)
      .where('path', '<>', props.currentPath)
      .order(props.orderBy, props.orderDirection)
      .limit(props.limit)

    // Add related field filter if provided
    if (props.relatedBy && props.relatedValue) {
      query = query.where(props.relatedBy, '=', props.relatedValue)
    }

    return await query.all()
  }
)

const hasRelatedItems = computed(() => relatedItems.value && relatedItems.value.length > 0)
</script>

<template>
  <div
    v-if="hasRelatedItems"
    class="my-12"
  >
    <!-- Fixed Header -->
    <Header
      :title="title"
      :badge="badge"
      :badge-color="badgeColor"
    />

    <!-- Loading State -->
    <div 
      v-if="pending"
      class="grid gap-6"
      :class="gridCols"
    >
      <USkeleton 
        v-for="i in limit" 
        :key="i"
        class="h-48 w-full" 
      />
    </div>

    <!-- Related Items Grid -->
    <div 
      v-else
      class="grid gap-6"
      :class="gridCols"
    >
      <!-- Default slot receives all items -->
      <slot :items="relatedItems">
        <!-- Fallback: render basic cards -->
        <UCard 
          v-for="(item, index) in relatedItems"
          :key="`${item.stem}-${index}`"
          class="hover:shadow-lg transition-shadow"
        >
          <template #header>
            <h3 class="font-semibold line-clamp-2">{{ item.title }}</h3>
          </template>
          
          <p v-if="item.description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {{ item.description }}
          </p>
          
          <template #footer>
            <ULink 
              :to="item.stem"
              class="text-sm text-primary hover:underline"
            >
              Read more →
            </ULink>
          </template>
        </UCard>
      </slot>
    </div>
  </div>
</template>