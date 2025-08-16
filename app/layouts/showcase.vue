<!-- layouts/showcase.vue -->
<script setup lang="ts">
interface ShowcaseConfig {
  componentName: string
  title: string
  description: string
  variants: any[]
  presets?: any[]
  useCases?: any[]
  guidelines?: any
  componentData?: any // Raw component data for API docs
}

interface Props {
  title?: string
  subtitle?: string
  description?: string
  debugEnabled?: boolean
  config?: ShowcaseConfig // ✅ Pass entire config to layout
}

const props = withDefaults(defineProps<Props>(), {
  debugEnabled: true,
})

// ✅ Global debug toggle for all showcase pages
const debugExpanded = ref(false)

// ✅ Provide debug state to child components
provide('debugExpanded', debugExpanded)
provide('debugEnabled', props.debugEnabled)

// ✅ Generate tracking ID
const route = useRoute()
const componentSlug = computed(() => route.name?.toString().replace('showcase-', '') || 'component')
const getTrackingId = (variantName: string) => `showcase-${componentSlug.value}-${variantName}`

// ✅ Head management with dynamic titles
const defaultTitle = computed(() => {
  if (props.title) return `${props.title} Showcase - Layout Primitives`
  const pageName = route.name?.toString().replace('showcase-', '').replace('-', ' ')
  return `${pageName} Showcase - Layout Primitives`
})

useHead({
  title: defaultTitle,
  meta: [
    {
      name: 'description',
      content: props.description || `Comprehensive showcase of ${props.title} variants and usage patterns`,
    },
  ],
})

// ✅ Generate API data if config provided
const apiData = computed(() => {
  if (!props.config?.componentData) return null

  const componentData = props.config.componentData

  const propsData = []
  if (componentData?.variants) {
    Object.entries(componentData.variants).forEach(([variantName, options]) => {
      if (Array.isArray(options)) {
        propsData.push({
          name: variantName,
          type: `'${options.join('\' | \'')}'`,
          default: componentData?.defaults?.[variantName] || '—',
          required: false,
        })
      }
    })
  }

  propsData.push(
    { name: 'as', type: 'string', default: 'div', required: false },
    { name: 'trackingId', type: 'string | undefined', default: '—', required: false },
    { name: 'ui', type: 'object | undefined', default: '—', required: false },
  )

  const slotsData = componentData?.slots
    ? componentData.slots.map((slot) => ({
        name: `#${slot.name}`,
        defaultClasses: slot.classes || '—',
      }))
    : [{ name: '#default', defaultClasses: '—' }]

  const variantCount = Object.keys(componentData?.variants || {}).reduce((count, key) => {
    const variants = componentData.variants[key]
    return count + (Array.isArray(variants) ? variants.length : 0)
  }, 0)

  const slotCount = componentData?.slots?.length || 1

  return {
    propsData,
    slotsData,
    variantCount,
    slotCount,
  }
})
</script>

<template>
  <div class="min-h-screen bg-muted text-default antialiased relative">
    <INavHeader />
    <!-- ✅ Global Debug Toggle (conditional) -->
    <div
      v-if="debugEnabled"
      class="fixed bottom-4 right-4 z-50"
    >
      <UButton
        :color="debugExpanded ? 'primary' : 'neutral'"
        :variant="debugExpanded ? 'solid' : 'outline'"
        :icon="debugExpanded ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        class="shadow-lg"
        @click="debugExpanded = !debugExpanded"
      >
        {{ debugExpanded ? 'Hide' : 'Show' }} Debug Info
      </UButton>
    </div>

    <ISection>
      <div class="space-y-12">
        <!-- ✅ Conditional Page Header -->
        <ShowcasePageHeader
          v-if="title && subtitle"
          :title="title"
          :subtitle="subtitle"
        />

        <!-- ✅ Auto-render Use Cases if provided -->
        <ShowcaseUseCases
          v-if="config?.useCases"
          title="Common Use Cases"
          :items="config.useCases"
        />

        <!-- ✅ Auto-render Guidelines if provided -->
        <ShowcaseGuidelines
          v-if="config?.guidelines"
          title="Usage Guidelines"
          :best-practices="config.guidelines.bestPractices"
          :common-patterns="config.guidelines.commonPatterns"
          :future-enhancements="config.guidelines.futureEnhancements"
        />

        <!-- ✅ Main content slot (playground) -->
        <slot
          :get-tracking-id="getTrackingId"
          :config="config"
        />

        <!-- ✅ Auto-render API Documentation if config provided -->
        <template v-if="apiData">
          <ShowcaseAPIDocs
            title="Props"
            description="Component properties and their types"
            :data="apiData.propsData"
            type="props"
            :component-name="config.componentName"
            :variant-count="apiData.variantCount"
            :slot-count="apiData.slotCount"
            show-header
          />

          <ShowcaseAPIDocs
            title="Slots"
            description="Available slots for content injection"
            :data="apiData.slotsData"
            type="slots"
          />

          <!-- ✅ Auto-render Source Code if available -->
          <ShowcaseVariantCard
            v-if="config.componentData?.sourceCode"
            :variant-name="componentSlug"
            language="typescript"
            :description="`A ${title?.toLowerCase()} component`"
            :code="config.componentData.sourceCode"
          />
        </template>
      </div>
    </ISection>
    <INavFooter />
  </div>
</template>
