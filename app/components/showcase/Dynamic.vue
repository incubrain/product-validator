<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface VariantOption {
  name: string
  type: 'select' | 'boolean' | 'string' | 'number'
  options?: string[]
  default: string | boolean | number
  description?: string
}

interface PresetOption {
  name: string
  description: string
  behavior?: string // ✅ Added optional behavior description
  preset: Record<string, any>
  firstContent?: any
  secondContent?: any
}

interface Props {
  componentName: string
  componentData?: any
  title: string
  description: string
  variants: VariantOption[]
  presets?: PresetOption[]
  language?: string
  center?: boolean
  trackingId?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue-html',
  center: false,
})

defineSlots<{
  default(props: {
    selectedProps: Record<string, any>
    relevantSelectedProps: Record<string, any>
    currentPreset: PresetOption | null
  }): any
}>()

// ✅ Preset management
const selectedPreset = ref<string>('custom')
const availablePresets = computed(() => {
  if (!props.presets) return []
  return [
    { name: 'custom', label: 'Custom Configuration' },
    ...props.presets.map((preset) => ({ name: preset.name, label: preset.name })),
  ]
})

const currentPreset = computed(() => {
  if (selectedPreset.value === 'custom') return null
  return props.presets?.find((p) => p.name === selectedPreset.value) ?? null
})

// Build reactive state from variant options or selected preset
const { generateTrackingId } = useComponentDebug()
const selectedProps = reactive(
  Object.fromEntries(
    props.variants.map((variant) => [variant.name, variant.default]),
  ),
)

// ✅ Update props when preset changes
watch(currentPreset, (preset) => {
  if (preset) {
    Object.entries(preset.preset).forEach(([key, value]) => {
      if (key in selectedProps) {
        selectedProps[key] = value
      }
    })
  }
}, { immediate: true })

const relevantSelectedProps = computed(() => {
  const mappings = props.componentData?.coreData.propMappings?.[selectedProps.variant]
  if (!mappings) return selectedProps

  return {
    variant: selectedProps.variant, // ✅ Always include variant
    ...Object.fromEntries(
      Object.entries(selectedProps).filter(([key]) =>
        mappings.includes(key) || ['ui', 'trackingId'].includes(key),
      ),
    ),
  }
})

const relevantVariants = computed(() => {
  const mappings = props.componentData?.coreData.propMappings?.[selectedProps.variant]
  if (!mappings) return props.variants

  return props.variants.filter((variant) =>
    variant.name === 'variant' // ✅ Always show variant selector
    || mappings.includes(variant.name),
  )
})

// Generated code string
const generatedCode = computed(() => {
  const propsToShow = relevantSelectedProps.value // ✅ USE FILTERED PROPS
  const propsString = Object.entries(propsToShow)
    .filter(([key, value]) => {
      if (['ui', 'trackingId'].includes(key)) return false
      const variant = props.variants.find((opt) => opt.name === key)
      return variant && value !== variant.default
    })
    .map(([key, value]) => {
      if (typeof value === 'string') return `${key}="${value}"`
      if (typeof value === 'boolean') return value ? key : `:${key}="false"`
      return `:${key}="${value}"`
    })
    .join(' ')

  return `<${props.componentName}${propsString ? ' ' + propsString : ''}>
  <!-- Content -->
</${props.componentName}>`
})

// Copy functionality
const { copy, copied } = useClipboard()
const copyCode = () => copy(generatedCode.value)

// Generate current props description
const currentPropsDesc = computed(() => {
  const propsToShow = relevantSelectedProps.value // ✅ USE FILTERED PROPS

  const activeProps = Object.entries(propsToShow)
    .filter(([key, value]) => {
      if (['ui', 'trackingId'].includes(key)) return false
      const variant = props.variants.find((opt) => opt.name === key)
      return variant && value !== variant.default
    })
    .map(([key, value]) => `${key}="${value}"`)
    .join(', ')

  return activeProps || 'default configuration'
})

const isCodeExpanded = ref(false)
const toggleExpanded = () => {
  isCodeExpanded.value = !isCodeExpanded.value
}

const codePreview = computed(() => {
  const lines = generatedCode.value.split('\n')
  return lines.slice(0, 3).join('\n')
})

const shouldShowExpand = computed(() => {
  return generatedCode.value.split('\n').length > 3
})

const variantValue = computed(() => String(selectedProps.variant || 'default'))
</script>

<template>
  <ILayoutContainer class="space-y-6">
    <!-- Variant Header -->
    <ShowcaseVariantHeader
      :name="title"
      :description="description"
    />

    <ShowcaseTVOutput :tracking-id="generateTrackingId(trackingId!, variantValue, selectedProps)" />

    <UCard
      variant="outline"
      :ui="{
        root: 'bg-elevated border border-muted overflow-hidden',
        header: 'p-4 bg-muted',
        body: !!$slots.default ? (center ? 'p-6 bg-muted flex justify-center items-center min-h-[200px]' : 'p-6 bg-muted') : undefined,
        footer: 'border-t border-muted p-0 sm:px-0 m-0 relative',
      }"
    >
      <!-- Interactive Controls Header -->
      <template #header>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-primary">
              {{ presets ? 'Preset Examples' : 'Interactive Demo' }}
            </h3>
            <UBadge
              :label="currentPropsDesc"
              variant="soft"
              color="secondary"
              size="sm"
            />
          </div>

          <!-- ✅ Preset Selector -->
          <div
            v-if="presets"
            class="flex items-center gap-3"
          >
            <span class="text-sm text-muted-foreground">Preset:</span>
            <UDropdownMenu
              :items="availablePresets.map(preset => ({
                label: preset.label,
                onSelect: () => selectedPreset = preset.name,
                checked: selectedPreset === preset.name,
              }))"
            >
              <UButton
                variant="outline"
                color="neutral"
                size="sm"
                :trailing-icon="'i-lucide-chevron-down'"
                class="whitespace-nowrap"
              >
                {{ availablePresets.find(p => p.name === selectedPreset)?.label }}
              </UButton>
            </UDropdownMenu>

            <!-- ✅ SMART CONTROLS - Only show relevant variants -->
            <div
              v-if="!presets || selectedPreset === 'custom'"
              class="flex flex-wrap gap-3"
            >
              <div
                v-for="variant in relevantVariants"
                :key="variant.name"
                class="flex items-center gap-2"
              >
                <span class="text-xs text-muted-foreground">
                  {{ variant.name }}:
                </span>

                <!-- Select Dropdown -->
                <UDropdownMenu
                  v-if="variant.type === 'select' && variant.options"
                  :items="variant.options.map(option => ({
                    label: option,
                    onSelect: () => selectedProps[variant.name] = option,
                    checked: selectedProps[variant.name] === option,
                  }))"
                >
                  <UButton
                    variant="outline"
                    color="neutral"
                    size="sm"
                    :trailing-icon="'i-lucide-chevron-down'"
                  >
                    {{ selectedProps[variant.name] }}
                  </UButton>
                </UDropdownMenu>

                <!-- Boolean Toggle -->
                <UButton
                  v-else-if="variant.type === 'boolean'"
                  :variant="selectedProps[variant.name] ? 'solid' : 'outline'"
                  :color="selectedProps[variant.name] ? 'primary' : 'neutral'"
                  size="sm"
                  @click="selectedProps[variant.name] = !selectedProps[variant.name]"
                >
                  {{ selectedProps[variant.name] }}
                </UButton>

                <!-- String/Number Input -->
                <UInput
                  v-else
                  v-model="selectedProps[variant.name]"
                  size="sm"
                  class="w-20"
                  :type="variant.type === 'number' ? 'number' : 'text'"
                />
              </div>
            </div>

            <UAlert
              v-if="currentPreset?.behavior"
              variant="soft"
              :description="currentPreset.behavior"
              :ui="{ root: 'px-2 py-1 w-auto' }"
            />
          </div>

          <!-- ✅ ENHANCED VARIANT HELP -->
          <div
            v-if="componentData?.coreData.propMappings"
            class="p-3 bg-info/5 rounded-lg border border-info/20"
          >
            <div class="text-xs text-info font-medium mb-1">
              💡 {{ selectedProps.variant.charAt(0).toUpperCase() + selectedProps.variant.slice(1) }} Controls
            </div>
            <div class="text-xs text-muted-foreground">
              Uses: {{ ['variant', ...(componentData.coreData.propMappings[selectedProps.variant] || [])].join(', ') }}
            </div>
          </div>

          <!-- Description shows preset info or current state -->
          <p class="text-sm text-muted-foreground">
            {{ currentPreset?.description || description }}
          </p>
        </div>
      </template>

      <!-- ✅ ENHANCED LIVE PREVIEW SLOT - Pass both selectedProps and relevantSelectedProps -->
      <template v-if="!!$slots.default">
        <slot
          :selected-props="selectedProps"
          :relevant-selected-props="relevantSelectedProps"
          :current-preset="currentPreset"
        />
      </template>

      <!-- Code Footer -->
      <template #footer>
        <div class="relative">
          <ContentProsePre
            theme="minimal"
            :code="shouldShowExpand && !isCodeExpanded ? codePreview + '\n...' : generatedCode"
            :language="language"
            class="my-0 rounded-none"
          >
            {{ shouldShowExpand && !isCodeExpanded ? codePreview + '\n...' : generatedCode }}
          </ContentProsePre>

          <!-- Copy Button -->
          <div class="absolute top-4 right-4">
            <UButton
              :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              :color="copied ? 'success' : 'neutral'"
              variant="ghost"
              size="xs"
              class="shadow-lg bg-elevated/80 backdrop-blur"
              @click="copyCode"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </UButton>
          </div>

          <!-- Expand/Collapse Button -->
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
  </ILayoutContainer>
</template>
