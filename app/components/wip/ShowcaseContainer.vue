<!-- components/ShowcaseContainer.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'

type Tab = 'preview' | 'code'
type Device = 'desktop' | 'tablet' | 'mobile'

const props = withDefaults(defineProps<{
  id?: string
  title?: string
  height?: number
  iframeSrc?: string
  code?: string
  openUrl?: string
  installCommand?: string
  v0Url?: string
  initialTab?: Tab
  initialDevice?: Device
  rightMin?: number
  rightMax?: number
  rightInitial?: number
  /** Auto panel behavior */
  autoPanel?: boolean
  autoPanelMin?: number // px at which we auto-open (if user hasn't closed)
  autoHysteresis?: number // px gap to avoid flapping on resize
}>(), {
  id: 'showcase',
  title: 'Component Showcase',
  height: 930,
  initialTab: 'preview',
  initialDevice: 'desktop',
  rightMin: 280,
  rightMax: 720,
  rightInitial: 0,
  autoPanel: true,
  autoPanelMin: 980,
  autoHysteresis: 120,
})

const tab = ref<Tab>(props.initialTab)
const device = ref<Device>(props.initialDevice)
const keyBump = ref(0)
const dragging = ref(false)

const container = ref<HTMLElement | null>(null)

/** Panel state: decoupled */
const isPanelOpen = ref((props.rightInitial ?? 0) > 0)
const panelWidth = ref(Math.max(props.rightMin, props.rightInitial || 0))
const userClosed = ref(false) // remember explicit close

// Track container width (for auto open/close)
const containerWidth = ref(0)
let containerRO: ResizeObserver | null = null

// Track the actual preview viewport width in px
const viewportEl = ref<HTMLElement | null>(null)
const viewportPx = ref(0)
let viewportRO: ResizeObserver | null = null

// Device widths (desktop is fluid)
const deviceWidthPx = computed(() => {
  if (device.value === 'mobile') return 390
  if (device.value === 'tablet') return 768
  return undefined // desktop
})

// Styles for the preview viewport
const viewportStyle = computed(() => {
  const base = { height: `${props.height}px` }
  switch (device.value) {
    case 'mobile': return { ...base, width: '390px' }
    case 'tablet': return { ...base, width: '768px' }
    default: return { ...base, width: '100%' }
  }
})

const showRight = computed(() => isPanelOpen.value)
const previewPaneStyle = computed(() => ({ flex: `1 1 0`, minWidth: 0 }))
const rightPaneStyle = computed(() => ({
  width: isPanelOpen.value ? `${panelWidth.value}px` : '0px',
  flex: isPanelOpen.value ? '0 0 auto' : '0 0 0',
}))

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

// Drag only adjusts width; never hides panel
function onMouseDownHandle(e: MouseEvent) {
  if (!container.value) return
  dragging.value = true
  const startX = e.clientX
  const startWidth = panelWidth.value

  const onMove = (ev: MouseEvent) => {
    const dx = startX - ev.clientX // dragging left grows panel
    panelWidth.value = clamp(startWidth + dx, props.rightMin, props.rightMax)
  }
  const onUp = () => {
    dragging.value = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function toggleRight() {
  isPanelOpen.value = !isPanelOpen.value
  if (!isPanelOpen.value) userClosed.value = true
  if (isPanelOpen.value) panelWidth.value = Math.max(panelWidth.value, props.rightMin)
}

function copy(text?: string) {
  if (!text) return
  navigator.clipboard?.writeText(text).catch(() => {})
}

function refresh() {
  keyBump.value++
}

const openHref = computed(() => props.openUrl || props.iframeSrc || '#')

// Keyboard width resize (never hides)
function onHandleKeydown(e: KeyboardEvent) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
  e.preventDefault()
  const step = 24
  if (e.key === 'ArrowLeft') panelWidth.value = clamp(panelWidth.value + step, props.rightMin, props.rightMax)
  if (e.key === 'ArrowRight') panelWidth.value = clamp(panelWidth.value - step, props.rightMin, props.rightMax)
  if (e.key === 'Home') panelWidth.value = props.rightMin
  if (e.key === 'End') panelWidth.value = props.rightMax
}

// Respond to prop changes
watch(() => props.rightInitial, (v) => {
  isPanelOpen.value = (v ?? 0) > 0
  panelWidth.value = Math.max(props.rightMin, v || 0)
}, { immediate: true })

onMounted(() => {
  // Prevent text selection while dragging
  const onSelectStart = (e: Event) => dragging.value && e.preventDefault()
  window.addEventListener('selectstart', onSelectStart)
  onBeforeUnmount(() => window.removeEventListener('selectstart', onSelectStart))

  // Observe the viewport box for real px width
  if (viewportEl.value && 'ResizeObserver' in window) {
    viewportRO = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect
      if (cr) viewportPx.value = Math.round(cr.width)
    })
    viewportRO.observe(viewportEl.value)
  }

  // Observe container for auto panel behavior
  if (container.value && 'ResizeObserver' in window) {
    containerRO = new ResizeObserver((entries) => {
      const w = Math.round(entries[0]?.contentRect.width || 0)
      containerWidth.value = w
      if (!props.autoPanel) return

      // Open when roomy enough (unless the user explicitly closed)
      if (!userClosed.value && !isPanelOpen.value && w >= props.autoPanelMin) {
        isPanelOpen.value = true
        panelWidth.value = Math.max(panelWidth.value, props.rightMin)
      } else if (isPanelOpen.value && w <= (props.autoPanelMin - props.autoHysteresis)) {
        isPanelOpen.value = false
      }
    })
    containerRO.observe(container.value)
  }
})

onBeforeUnmount(() => {
  viewportRO?.disconnect()
  viewportRO = null
  containerRO?.disconnect()
  containerRO = null
})
</script>

<template>
  <section
    :id="id"
    class="group/block-view-wrapper flex min-w-0 flex-col gap-4 overflow-hidden"
  >
    <!-- Top utility bar -->
    <div class="hidden w-full items-center gap-2 pl-2 md:pr-6 lg:flex">
      <!-- Tabs -->
      <div class="flex items-center">
        <div
          role="tablist"
          aria-orientation="horizontal"
          class="grid h-8 grid-cols-2 items-center rounded-md p-1"
        >
          <button
            role="tab"
            :aria-selected="tab==='preview'"
            class="h-6 rounded-sm px-2 text-xs"
            @click="tab='preview'"
          >
            Preview
          </button>
          <button
            role="tab"
            :aria-selected="tab==='code'"
            class="h-6 rounded-sm px-2 text-xs"
            @click="tab='code'"
          >
            Code
          </button>
        </div>
      </div>

      <div
        class="mx-2 h-4 w-px bg-[color:var(--border,theme(colors.neutral.300))]"
        aria-hidden="true"
      />

      <!-- Title -->
      <div class="flex-1 text-center text-sm font-medium md:text-left">
        {{ title }}
      </div>

      <!-- Device toggle + width readout -->
      <div class="ml-auto flex items-center gap-2">
        <div class="flex h-8 items-center rounded-md border border-default p-1">
          <!-- Desktop -->
          <button
            class="size-6 rounded-sm grid place-items-center"
            :aria-checked="device==='desktop'"
            title="Desktop"
            @click="device='desktop'"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                x="2"
                y="3"
                width="20"
                height="14"
                rx="2"
              />
              <line
                x1="8"
                y1="21"
                x2="16"
                y2="21"
              />
              <line
                x1="12"
                y1="17"
                x2="12"
                y2="21"
              />
            </svg>
          </button>
          <!-- Tablet -->
          <button
            class="size-6 rounded-sm grid place-items-center"
            :aria-checked="device==='tablet'"
            title="Tablet"
            @click="device='tablet'"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                x="4"
                y="2"
                width="16"
                height="20"
                rx="2"
              />
              <line
                x1="12"
                y1="18"
                x2="12.01"
                y2="18"
              />
            </svg>
          </button>
          <!-- Mobile -->
          <button
            class="size-6 rounded-sm grid place-items-center"
            :aria-checked="device==='mobile'"
            title="Mobile"
            @click="device='mobile'"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                x="5"
                y="2"
                width="14"
                height="20"
                rx="2"
              />
              <path d="M12 18h.01" />
            </svg>
          </button>
        </div>

        <!-- Width badge -->
        <span class="rounded-md border border-default px-2 py-0.5 text-xs font-mono tabular-nums">
          <template v-if="device === 'desktop'">100% • {{ viewportPx }}px</template>
          <template v-else>{{ deviceWidthPx }}px</template>
        </span>

        <!-- Open in new tab -->
        <a
          v-if="openHref && openHref !== '#'"
          :href="openHref"
          target="_blank"
          class="size-6 rounded-sm grid place-items-center"
          title="Open in New Tab"
        >⤢</a>

        <!-- Refresh preview -->
        <button
          class="size-6 rounded-sm grid place-items-center"
          title="Refresh Preview"
          @click="refresh"
        >
          ⟳
        </button>

        <!-- Panel toggle (works even when hidden) -->
        <button
          class="h-8 rounded-md border border-default px-2 text-xs"
          title="Toggle Panel"
          @click="toggleRight"
        >
          {{ showRight ? 'Hide Panel' : 'Show Panel' }}
        </button>
      </div>
    </div>

    <!-- Main preview area -->
    <div
      ref="container"
      class="relative z-0 flex w-full overflow-hidden rounded-xl border border-default"
      :style="{ height: `${height}px` }"
    >
      <!-- Left (preview) -->
      <div
        class="relative flex min-w-0 items-start justify-center p-3"
        :style="previewPaneStyle"
      >
        <div class="w-full flex justify-center">
          <div
            :key="keyBump"
            ref="viewportEl"
            class="bg-background relative rounded-lg border border-default overflow-hidden"
            :style="viewportStyle"
          >
            <!-- If iframeSrc is passed, show iframe; otherwise render slot -->
            <iframe
              v-if="iframeSrc"
              :src="iframeSrc"
              loading="lazy"
              class="no-scrollbar absolute inset-0 h-full w-full"
            />
            <div
              v-else
              class="absolute inset-0 overflow-auto"
            >
              <slot />
            </div>
          </div>
        </div>
      </div>

      <!-- Handle (only when panel is open) -->
      <div
        class="relative hidden md:block"
        role="separator"
        aria-orientation="vertical"
        :aria-valuemin="rightMin"
        :aria-valuemax="rightMax"
        :aria-valuenow="panelWidth"
        tabindex="0"
        :class="[
          'w-3',
          'after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:-translate-y-1/2 after:rounded-full',
          'after:bg-[color:theme(colors.neutral.400/_40%)] hover:after:h-10',
          'cursor-col-resize',
        ]"
        title="Drag to resize"
        @keydown="onHandleKeydown"
        @mousedown="onMouseDownHandle"
      />

      <!-- Right (code/notes) -->
      <aside
        class="hidden md:flex flex-col min-w-0 border-l border-default bg-[color:var(--code-bg,hsl(240_4%_10%))] text-[color:var(--code-fg,hsl(0_0%_98%))]"
        :style="rightPaneStyle"
      >
        <header class="flex items-center gap-2 border-b border-default px-3 py-2">
          <strong class="text-sm">Panel</strong>
          <div class="ml-auto flex items-center gap-2">
            <button
              class="rounded-md border border-default px-2 text-xs h-7"
              @click="tab='preview'"
            >
              Preview
            </button>
            <button
              class="rounded-md border border-default px-2 text-xs h-7"
              @click="tab='code'"
            >
              Code
            </button>
            <button
              class="rounded-md border border-default px-2 text-xs h-7"
              @click="toggleRight"
            >
              {{ showRight ? 'Hide' : 'Show' }}
            </button>
          </div>
        </header>

        <div class="flex-1 min-h-0 overflow-auto">
          <div
            v-if="tab==='code'"
            class="p-3"
          >
            <div class="mb-2 flex items-center gap-2">
              <span class="text-xs opacity-70">Code</span>
              <button
                class="ml-auto rounded-md border border-default px-2 text-xs h-7"
                @click="copy(code)"
              >
                Copy
              </button>
            </div>
            <pre class="rounded-lg border border-default p-3 overflow-auto text-xs leading-relaxed"><code>{{ code || '/* No code provided */' }}</code></pre>
          </div>
          <div
            v-else
            class="p-3"
          >
            <slot name="right" />
            <p
              v-if="!$slots.right"
              class="opacity-70 text-sm"
            >
              Use <code>&lt;template #right&gt;</code> to add notes/tools here.
            </p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Mobile fallback -->
    <div class="flex flex-col gap-2 md:hidden">
      <div class="flex items-center gap-2 px-2">
        <div class="line-clamp-1 text-sm font-medium">
          {{ title }}
        </div>
        <div class="ml-auto shrink-0 font-mono text-xs">
          {{ id }}
        </div>
      </div>
      <div class="overflow-hidden rounded-xl border border-default p-2 text-sm opacity-75">
        This showcase is best viewed on larger screens.
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
