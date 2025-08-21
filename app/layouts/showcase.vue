<!-- layouts/showcase.vue -->
<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  config?: any
}

const props = defineProps<Props>()

// ✅ Use composable data OR props (flexibility)
const {
  title: composableTitle,
  subtitle: composableSubtitle,
  config: composableConfig,
  showDebugVariants,
  debugEnabled,
  toggleDebugVariants,
} = useShowcase()

// ✅ Prefer props over composable (when using NuxtLayout)
const title = computed(() => props.title || composableTitle.value)
const subtitle = computed(() => props.subtitle || composableSubtitle.value)
const config = computed(() => props.config || composableConfig.value)

const route = useRoute()
const componentSlug = computed(() => route.name?.toString().replace('showcase-', '') || 'component')
const { showcaseDebugExpanded, toggleShowcaseDebug } = useComponentDebug()

const defaultTitle = computed(() => {
  if (title.value) return `${title.value} Showcase - Layout Primitives`
  const pageName = route.name?.toString().replace('showcase-', '').replace('-', ' ')
  return `${pageName} Showcase - Layout Primitives`
})

useHead({
  title: defaultTitle,
  meta: [
    {
      name: 'description',
      content: props.subtitle || `Comprehensive showcase of ${title.value} variants and usage patterns`,
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-muted text-default antialiased relative space-y-section">
    <INavHeader />

    <!-- ✅ SIMPLE DEBUG TOGGLE -->
    <div
      v-if="debugEnabled"
      class="fixed bottom-4 right-4 z-50 space-y-2"
    >
      <UButton
        :variant="showDebugVariants ? 'solid' : 'outline'"
        :color="showDebugVariants ? 'primary' : 'neutral'"
        :icon="showDebugVariants ? 'i-lucide-grid-3x3' : 'i-lucide-play'"
        class="shadow-lg"
        @click="toggleDebugVariants()"
      >
        {{ showDebugVariants ? 'Debug' : 'Interactive' }}
      </UButton>

      <UButton
        :color="showcaseDebugExpanded ? 'primary' : 'neutral'"
        :variant="showcaseDebugExpanded ? 'solid' : 'outline'"
        :icon="showcaseDebugExpanded ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        class="shadow-lg"
        @click="toggleShowcaseDebug()"
      >
        {{ showcaseDebugExpanded ? 'Hide' : 'Show' }} Debug
      </UButton>
    </div>

    <ILayoutContainer>
      <div class="space-y-12">
        <ShowcasePageHeader
          v-if="title && subtitle"
          :title="title"
          :subtitle="subtitle"
        />
      </div>
    </ILayoutContainer>

    <!-- ✅ PAGE CONTENT OR DEBUG VARIANTS -->
    <template v-if="showDebugVariants && config">
      <ILayoutContainer>
        <ShowcaseVariantSingle
          :component-name="config.componentName"
          :variants="config.variants"
          :component-data="config.componentData"
        >
          <template #default="{ variantProps, variant }">
            <slot
              name="debug"
              :variant-props="variantProps"
              :variant="variant"
            />
          </template>
        </ShowcaseVariantSingle>
      </ILayoutContainer>
    </template>

    <!-- ✅ Regular page content -->
    <template v-else>
      <slot />
    </template>

    <!-- API Documentation -->
    <ILayoutContainer
      v-if="config?.componentData"
      class="space-y-section"
    >
      <ShowcaseAPIDocs
        title="Props"
        description="Component properties and their types"
        :tv-data="config.componentData"
        :component-name="config.componentName"
        type="props"
        show-header
      />

      <ShowcaseAPIDocs
        title="Slots"
        description="Available slots for content injection"
        :tv-data="config.componentData"
        type="slots"
      />

      <ShowcaseVariantCard
        variant-name="Tailwind Variant Config"
        language="typescript"
        :description="`${title} component configuration`"
        :code="config.componentData"
      />
    </ILayoutContainer>

    <INavFooter />
  </div>
</template>
