<script setup lang="ts">
import type { ProsePreVariants } from '#theme/content/prose-pre'

type LanguageKey = 'typescript' | 'javascript' | 'ts' | 'js' | 'vue' | 'vue-html' | 'bash' | 'sql' | 'python' | 'yaml' | 'json' | 'dockerfile' | 'nginx' | 'mermaid'

interface Props {
  // WipResize props
  minWidth?: number
  previewHeight?: number

  // ContentProsePre props
  variant?: ProsePreVariants['variant']
  theme?: ProsePreVariants['theme']
  code?: string
  language?: LanguageKey
  filename?: string
  highlights?: number[]
  meta?: string
  ui?: any
}

withDefaults(defineProps<Props>(), {
  minWidth: 240,
  previewHeight: 400,
  variant: 'default',
  code: '',
  language: 'vue-html',
  filename: undefined,
  highlights: () => [],
  meta: undefined,
  theme: 'mac',
})
</script>

<template>
  <div class="space-y-4">
    <UCard
      class="overflow-visible"
      :ui="{
        header: 'p-0 sm:p-0',
        body: 'p-0 sm:p-0 overflow-hidden rounded-b-lg',
      }"
    >
      <template #header>
        <WipResize
          :min-width="minWidth"
          class="!max-h-none"
        >
          <template #default>
            <div
              class="w-full overflow-auto"
              :style="{ height: `${previewHeight}px` }"
            >
              <slot name="preview" />
            </div>
          </template>
        </WipResize>
      </template>

      <!-- Code Block using ContentProsePre -->
      <ContentProsePre
        :variant="variant"
        :theme="theme"
        :code="code"
        :language="language"
        :filename="filename"
        :highlights="highlights"
        :meta="meta"
        :ui="ui"
        class="my-0 rounded-none"
      >
        <template
          v-if="$slots.code"
          #default
        >
          <slot name="code" />
        </template>
      </ContentProsePre>
    </UCard>
  </div>
</template>

<style scoped>
/* Custom scrollbar for preview area */
.overflow-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.3) transparent;
}

.overflow-auto::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.3);
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(155, 155, 155, 0.5);
}
</style>
