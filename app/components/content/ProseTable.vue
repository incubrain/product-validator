<!-- components/content/ProseTable.vue -->
<script setup lang="ts">
interface Props {
  class?: string
  style?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
})
</script>

<template>
  <div class="blog-table-wrapper my-8">
    <div class="table-scroll-container overflow-x-auto rounded-lg border border-muted bg-elevated/50">
      <table
        :class="['blog-table', 'w-full text-sm', 'border-collapse', props.class]"
        :style="props.style"
      >
        <slot />
      </table>
    </div>

    <div class="mt-2 text-xs text-dimmed text-center sm:hidden">
      <UIcon
        name="i-lucide-arrow-right"
        class="w-3 h-3 inline mr-1"
      />
      Scroll horizontally to view more
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.blog-table-wrapper {
  @apply mx-auto max-w-full rounded-2xl;
}

.table-scroll-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(113, 113, 122, 0.5) transparent;
}

.table-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.table-scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(113, 113, 122, 0.5);
  border-radius: 4px;
}

/* Header styling - Using secondary color */
.blog-table :deep(th) {
  @apply bg-elevated font-semibold text-highlighted px-6 py-4 text-left border-b-2 border-secondary;
}

/* Body cell styling - Using semantic colors */
.blog-table :deep(td) {
  @apply px-6 py-4 text-toned border-b border-muted;
}

/* Row hover effect - Using semantic colors */
.blog-table :deep(tbody tr) {
  @apply hover:bg-accented transition-colors duration-200;
}

/* Links in tables - Remove hardcoded styling, let ULink handle it */
.blog-table :deep(a) {
  /* No hardcoded styling - ULink defaults will apply */
}

/* Code in tables - Using secondary color */
.blog-table :deep(code) {
  @apply bg-accented text-secondary px-2 py-1 rounded text-xs font-mono;
}
</style>