<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import prosePreStyles from '~~/theme/content/prose-pre'
import type { ProsePreVariants } from '~~/theme/content/prose-pre'

interface Props {
  variant?: ProsePreVariants['variant']
  theme?: ProsePreVariants['theme']
  code?: string
  language?: LanguageKey
  filename?: string
  highlights?: number[]
  meta?: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  code: '',
  language: 'vue-html',
  filename: undefined,
  highlights: () => [],
  meta: undefined,
  theme: 'mac',
})

const { copy, copied, isSupported } = useClipboard({
  source: computed(() => props.code || ''),
  copiedDuring: 2000,
})

const handleCopy = () => {
  if (isSupported.value) {
    copy(props.code || '')
  }
}

const languageLabels = {
  'typescript': 'TypeScript',
  'javascript': 'JavaScript',
  'ts': 'TypeScript',
  'js': 'JavaScript',
  'vue': 'Vue',
  'vue-html': 'Vue HTML',
  'bash': 'Bash',
  'sql': 'SQL',
  'python': 'Python',
  'yaml': 'YAML',
  'json': 'JSON',
  'dockerfile': 'Docker',
  'nginx': 'Nginx',
  'mermaid': 'Mermaid',
} as const

type LanguageKey = keyof typeof languageLabels

const getLanguageLabel = (lang?: LanguageKey) => {
  if (!lang) return 'Code'
  return languageLabels[lang] || lang.toUpperCase()
}

// Theme computation
const ui = computed(() => prosePreStyles({
  variant: props.variant,
  theme: props.theme,
  copied: copied.value,
}))
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, $attrs.class] })">
    <!-- Header with filename and copy button -->
    <div :class="ui.header()">
      <div :class="ui.metadata()">
        <!-- Mac-style window controls -->
        <div :class="ui.controls()">
          <div :class="[ui.controlDot(), 'bg-red-500']" />
          <div :class="[ui.controlDot(), 'bg-yellow-500']" />
          <div :class="[ui.controlDot(), 'bg-green-500']" />
        </div>

        <!-- Filename and language -->
        <template v-if="filename || language">
          <span
            v-if="filename"
            :class="ui.filename()"
          >
            {{ filename }}
          </span>
          <UBadge
            v-if="language"
            :label="getLanguageLabel(language)"
            :class="ui.languageBadge()"
            variant="soft"
            size="sm"
            color="secondary"
          />
        </template>
      </div>

      <!-- Copy button -->
      <ClientOnly>
        <button
          v-if="isSupported"
          :class="ui.copyButton()"
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

    <!-- Code content with Shiki highlighting -->
    <div :class="ui.content()">
      <ClientOnly>
        <Shiki
          v-if="code && language"
          :code="code"
          :lang="language"
          :class="ui.code()"
          :highlight-options="{
            lineNumbers: false,
            transformers: highlights?.length ? [{
              line(node, line) {
                if (highlights.includes(line)) {
                  node.properties.class = [...(node.properties.class || []), 'highlighted-line']
                }
              },
            }] : undefined,
          }"
        />

        <!-- Fallback for no language or no code -->
        <pre
          v-else
          :class="ui.code()"
        >
          <slot>{{ code }}</slot>
        </pre>

        <!-- Loading fallback -->
        <template #fallback>
          <pre :class="ui.code()">
            <slot>{{ code }}</slot>
          </pre>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
/* Shiki integration styles */
:deep(.shiki) {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  font-family: inherit !important;
  font-size: inherit !important;
  line-height: inherit !important;
}

:deep(.shiki code) {
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  display: block;
  white-space: pre;
  overflow-x: auto;
}

/* Line highlighting support */
:deep(.highlighted-line) {
  background-color: rgba(255, 255, 0, 0.1);
  border-left: 3px solid #fbbf24;
  padding-left: 0.75rem;
  margin-left: -0.75rem;
}

/* Remove any unwanted spacing from syntax highlighting wrappers */
:deep(.line:first-child) {
  margin-top: 0;
  padding-top: 0;
}

:deep(.line:last-child) {
  margin-bottom: 0;
  padding-bottom: 0;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  :deep(.highlighted-line) {
    background-color: rgba(255, 255, 0, 0.05);
  }
}
</style>
