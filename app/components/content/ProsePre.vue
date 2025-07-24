<!-- components/content/ProsePre.vue -->
<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String as PropType<LanguageKey>,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const isMermaid = computed(() => props.language === 'mermaid')

const { copy, copied, isSupported } = useClipboard({
  source: computed(() => props.code),
  copiedDuring: 2000,
})

const handleCopy = () => {
  if (isSupported.value) {
    copy(props.code)
  }
}

const languageLabels = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  js: 'JavaScript',
  vue: 'Vue',
  bash: 'Bash',
  sql: 'SQL',
  python: 'Python',
  yaml: 'YAML',
  json: 'JSON',
  dockerfile: 'Docker',
  nginx: 'Nginx',
  mermaid: 'Mermaid',
} as const

type LanguageKey = keyof typeof languageLabels

const getLanguageLabel = (lang?: LanguageKey) => {
  if (!lang) return 'Code'
  return languageLabels[lang] || lang.toUpperCase()
}
</script>

<template>
  <!-- Render Mermaid component if language is mermaid -->
  <MermaidDiagram
    v-if="isMermaid"
    :code="code"
  />

  <!-- Otherwise render normal code block -->
  <div
    v-else
    class="my-6 rounded-lg border border-muted overflow-hidden"
  >
    <!-- Header with filename and copy button -->
    <div class="flex items-center justify-between px-4 py-2 bg-elevated border-b border-muted">
      <div class="flex items-center space-x-3">
        <!-- Mac-style window controls -->
        <div class="flex space-x-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500" />
          <div class="w-3 h-3 rounded-full bg-yellow-500" />
          <div class="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <!-- Filename and language -->
        <div class="flex items-center space-x-2">
          <span
            v-if="filename"
            class="text-sm font-mono text-toned"
          >
            {{ filename }}
          </span>
          <UBadge
            v-if="language"
            :label="getLanguageLabel(language)"
            variant="soft"
            size="sm"
            color="secondary"
          />
        </div>
      </div>

      <!-- Copy button -->
      <ClientOnly>
        <button
          v-if="isSupported"
          class="inline-flex items-center justify-center w-8 h-8 rounded-md border border-muted bg-elevated hover:bg-accented transition-all duration-200"
          :class="copied ? 'text-primary border-primary' : 'text-toned hover:text-highlighted'"
          :aria-label="copied ? 'Copied!' : 'Copy code'"
          @click="handleCopy"
        >
          <UIcon
            :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            class="size-4"
          />
        </button>
      </ClientOnly>
    </div>

    <!-- Code content with fixed spacing -->
    <div class="relative overflow-x-auto px-4 py-3">
      <pre
        :class="[$props.class]"
        class="font-mono text-base leading-relaxed m-0 p-0"
      ><slot /></pre>
    </div>
  </div>
</template>

<style scoped>
/* Fix first line indentation and bottom spacing */
pre :deep(code) {
  display: block;
  padding: 0;
  margin: 0;
  white-space: pre;
}

/* Remove any unwanted spacing from syntax highlighting wrappers */
pre :deep(.line:first-child) {
  margin-top: 0;
  padding-top: 0;
}

pre :deep(.line:last-child) {
  margin-bottom: 0;
  padding-bottom: 0;
}

/* Ensure no extra spacing from shiki wrapper */
pre :deep(> code) {
  display: block;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
