<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useClipboard } from '@vueuse/core'

interface ShowcaseOption {
  name: string
  type: 'select' | 'boolean' | 'string' | 'number'
  options?: NonNullable<string>[]
  default: NonNullable<string>
}

interface ComponentConfig {
  componentName: string
  variants: ShowcaseOption[]
}

interface Props {
  config: ComponentConfig
  center: boolean
}

const props = defineProps<Props>()

defineSlots<{
  default(props: { props: Record<string, any> }): any
}>()

// Build reactive defaults from variants
const selectedProps = reactive(
  Object.fromEntries(
    props.config.variants.map((opt) => [opt.name, opt.default]),
  ),
)

// Generated code string
const generatedCode = computed(() => {
  const propsString = Object.entries(selectedProps)
    .filter(([key, value]) => {
      const variant = props.config.variants.find((opt) => opt.name === key)
      return variant && value !== variant.default
    })
    .map(([key, value]) => {
      if (typeof value === 'string') return `${key}="${value}"`
      if (typeof value === 'boolean') return value ? key : `:${key}="false"`
      return `:${key}="${value}"`
    })
    .join(' ')

  return `<${props.config.componentName}${propsString ? ' ' + propsString : ''}>
  <!-- content -->
</${props.config.componentName}>`
})

// Copy code
const { copy } = useClipboard()
const copyCode = () => copy(generatedCode.value)
</script>

<template>
  <div class="space-y-6 w-full md:col-span-2 lg:col-span-3">
    <UCard
      :ui="{
        body: ['bg-muted min-h-[200px]', center ? 'flex justify-center items-center relative' : ''],
      }"
    >
      <template #header>
        <div class="space-y-4">
          <h3 class="font-medium">
            {{ config.componentName }} Interactive Demo
          </h3>

          <div class="flex flex-wrap gap-3">
            <div
              v-for="variant in config.variants"
              :key="variant.name"
            >
              <!-- Select Dropdown -->
              <UDropdownMenu
                v-if="variant.type === 'select'"
                :items="variant.options?.map(opt => ({
                  label: opt,
                  onSelect: () => selectedProps[variant.name] = opt,
                }))"
              >
                <UButton
                  variant="outline"
                  color="neutral"
                  size="sm"
                >
                  <span class="text-xs text-muted mr-1">{{ variant.name }}:</span>
                  <span class="font-medium">{{ selectedProps[variant.name] }}</span>
                  <UIcon
                    name="i-lucide-chevron-down"
                    class="w-3 h-3 ml-1"
                  />
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
                <span class="text-xs mr-1">{{ variant.name }}:</span>
                <span class="font-medium">{{ selectedProps[variant.name] }}</span>
              </UButton>
            </div>
          </div>
        </div>
      </template>

      <!-- Live Preview -->
      <slot :props="selectedProps" />

      <template #footer>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">
              Generated Code
            </h4>
            <UButton
              icon="i-lucide-copy"
              size="sm"
              variant="outline"
              @click="copyCode"
            >
              Copy
            </UButton>
          </div>
          <pre class="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
            <code>{{ generatedCode }}</code>
          </pre>
        </div>
      </template>
    </UCard>
  </div>
</template>
