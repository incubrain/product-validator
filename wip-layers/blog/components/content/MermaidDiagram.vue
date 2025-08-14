<script setup lang="ts">
interface Props {
  code: string
  scale?: 'sm' | 'md' | 'lg' | 'xl' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  scale: 'auto',
})

const show = ref(false)
// Generate truly unique ID
const diagramId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
const { $mermaid } = useNuxtApp()
const diagramRef = ref<HTMLElement>()

const scaleClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  auto: 'max-w-none',
}

// Extract title from mermaid code
const extractedTitle = computed(() => {
  const titleMatch = props.code.match(/title\s+(.+)/)
  return titleMatch ? titleMatch[1].trim() : null
})

// Remove title from mermaid code
const cleanedCode = computed(() => {
  return props.code.replace(/title\s+.+\n?/, '').trim()
})

onMounted(async () => {
  if (!$mermaid) {
    console.error('❌ Mermaid not available')
    show.value = true
    return
  }

  try {
    console.log('🎨 Initializing mermaid with ID:', diagramId)

    // Initialize once
    $mermaid.initialize({
      startOnLoad: false, // CRITICAL: Set to false
      theme: 'base',
      securityLevel: 'loose',
      darkMode: true,

      themeVariables: {
        darkMode: true,
        fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
        fontSize: '14px',

        // GitHub Dark backgrounds
        background: '#0d1117',
        mainBkg: '#161b22',
        secondaryColor: '#21262d',
        tertiaryColor: '#30363d',

        // Blue primary colors
        primaryColor: '#3b82f6',
        primaryTextColor: '#f0f6fc',
        primaryBorderColor: '#60a5fa',

        // Secondary blues
        secondaryBorderColor: '#1e40af',
        secondaryTextColor: '#c9d1d9',

        // Purple tertiary
        tertiaryBorderColor: '#7c3aed',
        tertiaryTextColor: '#e5e7eb',

        // Lines and borders
        lineColor: '#60a5fa',
        textColor: '#c9d1d9',
        nodeBorder: '#60a5fa',
        clusterBkg: '#21262d',
        clusterBorder: '#60a5fa',

        // Hide title since we render it separately
        titleColor: 'transparent',

        // Error handling
        errorBkgColor: '#7c3aed',
        errorTextColor: '#f0f6fc',
      },
    })

    show.value = true
    await nextTick()

    // Use mermaid.render() API directly - CRITICAL FIX
    const { svg } = await $mermaid.render(diagramId, cleanedCode.value)

    if (diagramRef.value) {
      // Clear any existing content
      diagramRef.value.innerHTML = ''
      // Insert new SVG
      diagramRef.value.innerHTML = svg

      // Apply scaling and centering
      const svgElement = diagramRef.value.querySelector('svg')
      if (svgElement) {
        svgElement.style.display = 'block'
        svgElement.style.margin = '0 auto'

        // Auto-scale logic
        if (props.scale === 'auto') {
          const width = svgElement.getBoundingClientRect().width
          if (width < 400) {
            diagramRef.value.classList.add('max-w-md')
          } else if (width < 600) {
            diagramRef.value.classList.add('max-w-2xl')
          } else if (width < 800) {
            diagramRef.value.classList.add('max-w-4xl')
          } else {
            diagramRef.value.classList.add('max-w-6xl')
          }
        }
      }
    }

    console.log('✅ Mermaid rendered successfully:', diagramId)
  } catch (error) {
    console.error('❌ Mermaid render failed:', error)
    show.value = true

    if (diagramRef.value) {
      diagramRef.value.innerHTML = `
        <div class="p-4 text-center text-red-400 bg-red-950/20 rounded border border-red-500/30">
          <p class="font-semibold">Diagram Render Error</p>
          <p class="text-sm mt-1">${error.message}</p>
          <details class="mt-2 text-xs">
            <summary class="cursor-pointer">Show Code</summary>
            <pre class="mt-2 p-2 bg-black/50 rounded text-left whitespace-pre-wrap">${cleanedCode.value}</pre>
          </details>
        </div>
      `
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (diagramRef.value) {
    diagramRef.value.innerHTML = ''
  }
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="show"
      class="my-8 p-6 rounded-lg border border-default bg-elevated"
    >
      <!-- Render extracted title as proper H3 -->
      <h3
        v-if="extractedTitle"
        class="font-heading text-2xl font-semibold bg-muted px-2 py-2 text-center mb-6 mx-auto w-auto rounded-md"
      >
        {{ extractedTitle }}
      </h3>

      <!-- Mermaid diagram container -->
      <div class="text-center">
        <div
          ref="diagramRef"
          :class="['w-full flex justify-center', scaleClasses[scale]]"
        >
          <!-- SVG will be inserted here -->
        </div>
      </div>
    </div>

    <template #fallback>
      <div class="my-8 p-4 text-center">
        <UIcon
          name="i-lucide-loader"
          class="w-5 h-5 animate-spin mx-auto mb-2"
        />
        <p class="text-sm text-muted">
          Loading diagram...
        </p>
      </div>
    </template>
  </ClientOnly>
</template>
