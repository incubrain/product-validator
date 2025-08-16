<script setup lang="ts">
interface Props {
  variantName: string
  description: string
  badgeNumber?: number
  code?: string
  language?: string
  fileName?: string
  fileLink?: string
  filePath?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue-html',
})

const isCodeExpanded = ref(false)

// Manual toggle function
const toggleExpanded = () => {
  isCodeExpanded.value = !isCodeExpanded.value
}

const fileContent = ref<string>('')
const isLoadingFile = ref(false)

const loadFileContent = async () => {
  if (!props.filePath) return

  try {
    isLoadingFile.value = true
    const content = await $fetch(`/api/read-file?path=${encodeURIComponent(props.filePath)}`)
    fileContent.value = String(content)
  } catch (error) {
    console.error('Failed to load file:', error)
    fileContent.value = `// Error loading file: ${props.filePath}`
  } finally {
    isLoadingFile.value = false
  }
}

watch(() => props.filePath, loadFileContent, { immediate: true })

// ENHANCE EXISTING COMPUTED (Replace these 2 computeds)
const displayCode = computed(() => {
  if (fileContent.value) return fileContent.value
  return props.code ?? 'No code provided'
})

// Truncate code for preview (first 3 lines)
const codePreview = computed(() => {
  const lines = displayCode.value.split('\n')
  return lines.slice(0, 3).join('\n')
})

const shouldShowExpand = computed(() => {
  return displayCode.value.split('\n').length > 3
})
</script>

<template>
  <div class="space-y-6">
    <ShowcaseVariantHeader
      :badge-number="badgeNumber"
      :name="variantName"
      :description="description"
    />

    <UCard
      variant="outline"
      :ui="{
        root: 'bg-elevated border border-muted overflow-hidden',
        header: 'p-4 bg-muted',
        body: !!$slots.default ? 'p-6 bg-muted' : 'sm:p-0 p-0',
        footer: 'border-t border-muted p-0 sm:px-0 m-0 relative',
      }"
    >
      <!-- Header: Badge + Variant Name + Optional File Link -->
      <template
        v-if="fileLink"
        #header
      >
        <div class="flex items-center gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <UButton
                v-if="fileLink"
                :to="fileLink"
                :label="fileName"
                color="neutral"
                variant="ghost"
                size="xs"
                icon="i-lucide-external-link"
                target="_blank"
              />
              <UIcon
                v-if="isLoadingFile"
                name="i-lucide-loader"
                class="size-4 animate-spin text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </template>

      <slot />

      <!-- Footer: Code Section -->
      <template #footer>
        <div class="relative">
          <ContentProsePre
            theme="minimal"
            :code="shouldShowExpand && !isCodeExpanded ? codePreview + '\n...' : displayCode"
            :language="language"
            class="my-0 rounded-none"
          >
            {{ shouldShowExpand && !isCodeExpanded ? codePreview + '\n...' : displayCode }}
          </ContentProsePre>

          <!-- Centered Expand/Collapse Button -->
          <div
            v-if="shouldShowExpand"
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <UButton
              :icon="isCodeExpanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
              :label="isCodeExpanded ? 'Collapse code' : 'Expand code'"
              color="neutral"
              variant="subtle"
              size="xs"
              class="shadow-lg"
              @click="toggleExpanded"
            />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>
