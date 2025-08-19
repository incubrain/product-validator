<script setup lang="ts">
const { showcaseDebugExpanded } = useComponentDebug()

interface Props {
  trackingId?: string
}

const props = defineProps<Props>()
const { getComponentCSS } = useComponentDebug()

const cssData = computed(() => {
  return props.trackingId ? getComponentCSS(props.trackingId) : null
})

// Define color coding for different class origins
const originColors = {
  inherited: { bg: 'bg-amber-800', text: 'text-amber-400', border: 'border-amber-600' },
  variant: { bg: 'bg-blue-800', text: 'text-blue-400', border: 'border-blue-600' },
  gap: { bg: 'bg-emerald-800', text: 'text-emerald-400', border: 'border-emerald-600' },
  size: { bg: 'bg-purple-800', text: 'text-purple-400', border: 'border-purple-600' },
  spacing: { bg: 'bg-teal-800', text: 'text-teal-400', border: 'border-teal-600' },
  color: { bg: 'bg-rose-800', text: 'text-rose-400', border: 'border-rose-600' },
  responsive: { bg: 'bg-cyan-800', text: 'text-cyan-400', border: 'border-cyan-600' },
  padding: { bg: 'bg-indigo-800', text: 'text-indigo-400', border: 'border-indigo-600' },
  base: { bg: 'bg-slate-800', text: 'text-slate-400', border: 'border-slate-600' },
}

// Get current breakpoint
const currentBreakpoint = computed(() => {
  return cssData.value?.responsiveData?.currentBreakpoint || 'xs'
})

// Build comprehensive class origins including inherited
const classOrigins = computed(() => {
  if (!cssData.value) return []

  const origins = []

  // Add inherited if present
  const inheritedClass = cssData.value.inheritedAttrs?.class || cssData.value.allProps?.class
  if (inheritedClass) {
    origins.push({
      key: 'inherited',
      value: 'inherited',
      display: 'inherited',
      color: originColors.inherited,
    })
  }

  // Add active variants
  const variants = cssData.value.variants || {}
  Object.entries(variants)
    .filter(([_, value]) => value !== undefined && value !== null)
    .forEach(([key, value]) => {
      origins.push({
        key,
        value,
        display: `${key}:${value}`,
        color: originColors[key as keyof typeof originColors] || originColors.base,
      })
    })

  // Add responsive if has responsive classes
  if (cssData.value.responsiveData?.responsiveClasses?.length > 0) {
    origins.push({
      key: 'responsive',
      value: currentBreakpoint.value,
      display: `responsive:${currentBreakpoint.value}`,
      color: originColors.responsive,
    })
  }

  return origins
})

// Parse classes and assign colors based on their likely origin
const parseClassesWithColors = (classes: string) => {
  if (!classes) return []

  const classArray = classes.split(' ').filter(Boolean)

  return classArray.map((cls) => {
    let origin = 'base'
    let color = originColors.base

    // Determine origin by class patterns
    if (cls.match(/^(sm|md|lg|xl|2xl):/)) {
      origin = 'responsive'
      color = originColors.responsive
    } else if (cls.includes('gap-')) {
      origin = 'gap'
      color = originColors.gap
    } else if (cls.includes('gap-')) {
      origin = 'gap'
      color = originColors.gap
    } else if (cls.match(/^(text-|bg-|border-)/)) {
      origin = 'color'
      color = originColors.color
    } else if (cls.match(/^(w-|h-|p-|m-|text-)/)) {
      origin = 'size'
      color = originColors.size
    } else if (cssData.value?.variants?.variant) {
      origin = 'variant'
      color = originColors.variant
    }

    // Check if inherited
    const inheritedClass = cssData.value?.inheritedAttrs?.class || cssData.value?.allProps?.class
    if (inheritedClass && inheritedClass.includes(cls)) {
      origin = 'inherited'
      color = originColors.inherited
    }

    return {
      class: cls,
      origin,
      color,
    }
  })
}

const rerenderCount = computed(() => cssData.value?.rerenderCount || 1)
const componentName = computed(() => cssData.value?.componentName || 'Unknown')
</script>

<template>
  <div class="mt-3">
    <UCollapsible
      :open="showcaseDebugExpanded"
      :unmount-on-hide="false"
      :ui="{
        root: 'border border-default rounded-md overflow-hidden bg-muted/10',
        content: '',
      }"
    >
      <!-- Always Visible Header -->
      <div class="p-3 bg-muted/20 border-b border-default">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-palette"
              class="size-4 text-primary"
            />
            <span class="font-medium text-primary">CSS Debug:</span>
            <span class="font-mono text-sm">{{ componentName }}</span>
            <code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground">
              {{ trackingId }}
            </code>
          </div>

          <div class="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{{ currentBreakpoint }} breakpoint</span>
            <span
              :class="[
                rerenderCount > 3 ? 'text-warning' : 'text-success',
              ]"
            >
              {{ rerenderCount }} render{{ rerenderCount > 1 ? 's' : '' }}
            </span>
          </div>
        </div>
      </div>

      <template #content>
        <div
          v-if="cssData"
          class="p-4 space-y-4"
        >
          <!-- Class Origins Legend -->
          <div
            v-if="classOrigins.length > 0"
            class="flex flex-wrap gap-1"
          >
            <span
              v-for="origin in classOrigins"
              :key="origin.key"
              :class="`border ${origin.color.border} rounded-xl px-3 py-0.5 flex text-xs`"
            >
              {{ origin.display }}
            </span>
          </div>

          <!-- Applied Classes by Slot -->
          <div class="space-y-3">
            <div
              v-for="(classes, slotName) in cssData.appliedClasses"
              v-show="classes && classes !== 'undefined'"
              :key="slotName"
              class="gap-2 flex items-center"
            >
              <!-- Slot Name -->
              <span
                class="font-medium text-sm text-white font-mono"
              >
                {{ slotName }}:
              </span>

              <!-- Color-coded Classes -->
              <div class="flex flex-wrap gap-1 font-mono text-sm overflow-x-auto">
                <span
                  v-for="classInfo in parseClassesWithColors(classes)"
                  :key="classInfo.class"
                  :class="[
                    classInfo.color.text,
                    'hover:bg-white/10 px-1 rounded transition-colors',
                  ]"
                  :title="`Origin: ${classInfo.origin}`"
                >
                  {{ classInfo.class }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Fallback when no data -->
        <div
          v-else
          class="p-4 text-center text-muted-foreground"
        >
          <div class="flex items-center justify-center gap-2">
            <UIcon
              name="i-lucide-search-x"
              class="size-4"
            />
            <span class="text-sm">No CSS data captured for</span>
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">{{ trackingId }}</code>
          </div>
        </div>
      </template>
    </UCollapsible>
  </div>
</template>
