<!-- app/components/layout/RowGrid.vue - CORRECTED IMPLEMENTATION -->
<script setup lang="ts">
import rowGridStyles from '~~/theme/layout/row-grid'
import type { RowGridProps } from '#shared/types/components'

const props = withDefaults(defineProps<RowGridProps>(), {
  spacing: 'md',
  gap: 'md',
  alignRows: 'start',
  responsive: true,
  as: 'div',
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: object): any
}>()

// ✅ NUXT UI PATTERN - TV instance with variants
const ui = tvComputed(() => rowGridStyles({
  spacing: props.spacing,
  gap: props.gap,
  alignRows: props.alignRows,
  responsive: props.responsive,
}))

// Split slot children into rows based on props.rows
const slots = useSlots()

const rowsData = computed(() => {
  const children = slots.default?.() || []
  const rows = []
  let currentIndex = 0

  for (const size of props.rows) {
    const rowChildren = children.slice(currentIndex, currentIndex + size)
    if (rowChildren.length > 0) {
      rows.push({
        children: rowChildren,
        size,
        gridCols: getGridColsClass(size),
      })
    }
    currentIndex += size
  }

  return rows
})

// Generate responsive grid columns
const getGridColsClass = (size: number) => {
  if (!props.responsive) {
    return `grid-cols-${size}`
  }

  // Smart responsive behavior
  if (size === 1) return 'grid-cols-1'
  if (size === 2) return 'grid-cols-1 md:grid-cols-2'
  if (size === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  if (size === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  if (size === 5) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'

  // Fallback for larger sizes
  return `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(size, 6)}`
}
</script>

<template>
  <component
    :is="as"
    :class="ui.root({ class: [props.ui?.root, $attrs.class as string] })"
    v-bind="$attrs"
  >
    <div
      v-for="(row, rowIndex) in rowsData"
      :key="rowIndex"
      :class="[
        ui.row({ class: props.ui?.row }),
        row.gridCols,
      ]"
    >
      <component
        :is="child"
        v-for="(child, childIndex) in row.children"
        :key="childIndex"
      />
    </div>
  </component>
</template>
