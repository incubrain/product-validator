<script setup lang="ts">
interface GuidelineItem {
  icon?: string
  text: string
  codes?: string[]
}

interface Props {
  title?: string
  bestPractices?: GuidelineItem[]
  commonPatterns?: GuidelineItem[]
  futureEnhancements?: {
    title?: string
    description: string
    codes?: string[]
  }
}

withDefaults(defineProps<Props>(), {
  title: 'Usage Guidelines',
})

// Render helper with inline <code> highlights
const renderTextWithCodes = (text: string, codes: string[] = []) => {
  let result = text
  codes.forEach((code) => {
    const regex = new RegExp(`\\b${code}\\b`, 'g')
    result = result.replace(
      regex,
      `<code class="bg-info-100/50 dark:bg-info-800 px-1 py-0.5 rounded">${code}</code>`,
    )
  })
  return result
}
</script>

<template>
  <div class="border border-default bg-info-900/20 rounded-xl p-6 space-y-6">
    <h2 class="text-info-400 text-xl font-semibold">
      {{ title }}
    </h2>

    <!-- Best Practices & Common Patterns -->
    <div
      v-if="bestPractices || commonPatterns"
      class="grid md:grid-cols-2 gap-6"
    >
      <div
        v-if="bestPractices"
        class="space-y-3"
      >
        <h3 class="font-medium text-sm  uppercase">
          Best Practices
        </h3>
        <ul class="space-y-2 text-sm">
          <li
            v-for="(item, index) in bestPractices"
            :key="index"
            class="flex gap-2"
          >
            <span class="text-info-600 mt-0.5">{{ item.icon || '✓' }}</span>
            <span v-html="renderTextWithCodes(item.text, item.codes)" />
          </li>
        </ul>
      </div>

      <div
        v-if="commonPatterns"
        class="space-y-3"
      >
        <h3 class="font-medium text-sm  uppercase">
          Common Patterns
        </h3>
        <ul class="space-y-2 text-sm">
          <li
            v-for="(item, index) in commonPatterns"
            :key="index"
            class="flex gap-2"
          >
            <span class="text-info-600 mt-0.5">{{ item.icon || '→' }}</span>
            <span v-html="renderTextWithCodes(item.text, item.codes)" />
          </li>
        </ul>
      </div>
    </div>

    <!-- Future Enhancements -->
    <div
      v-if="futureEnhancements"
      class="rounded-lg border border-default p-4 bg-white/50 dark:bg-gray-800/50"
    >
      <h4 class="font-semibold mb-2 ">
        {{ futureEnhancements.title || 'Future Enhancements' }}
      </h4>
      <p
        class="text-sm "
        v-html="renderTextWithCodes(futureEnhancements.description, futureEnhancements.codes)"
      />
    </div>
  </div>
</template>
