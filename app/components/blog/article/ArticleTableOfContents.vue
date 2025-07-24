<!-- components/blog/BlogTOC.vue - MODERN FLOATING DESIGN -->
<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface Props {
  toc?: { links?: TocLink[] }
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
})

const activeId = ref('')
const isMobileDrawerOpen = ref(false)
const currentSectionIndex = ref(0)

// Enhanced scroll spy with section progress
onMounted(() => {
  const headings = document.querySelectorAll('h2[id], h3[id], h4[id]')

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id)

      if (visibleHeadings.length > 0) {
        activeId.value = visibleHeadings[0] as string

        // Update current section index for progress
        const flatLinks = flattenTocLinks(tocLinks.value)
        const index = flatLinks.findIndex((link) => link.id === activeId.value)
        if (index !== -1) {
          currentSectionIndex.value = index
        }
      }
    },
    {
      rootMargin: '-10% 0% -80% 0%',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  )

  headings.forEach((heading) => observer.observe(heading))

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})

// Flatten TOC links for progress calculation
const flattenTocLinks = (links: TocLink[]): TocLink[] => {
  const flattened: TocLink[] = []
  links.forEach((link) => {
    flattened.push(link)
    if (link.children) {
      flattened.push(...link.children)
    }
  })
  return flattened
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 100
    const elementTop = element.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top: elementTop,
      behavior: 'smooth',
    })

    history.replaceState(null, '', `#${id}`)

    // Close mobile drawer after navigation
    isMobileDrawerOpen.value = false
  }
}

const tocLinks = computed(() => props.toc?.links || [])
const flatTocLinks = computed(() => flattenTocLinks(tocLinks.value))
const readingProgress = computed(() =>
  flatTocLinks.value.length > 0 ? (currentSectionIndex.value / flatTocLinks.value.length) * 100 : 0,
)

// Keyboard shortcuts for navigation
defineShortcuts({
  t: () => {
    isMobileDrawerOpen.value = !isMobileDrawerOpen.value
  },
})
</script>

<template>
  <div
    v-if="show && tocLinks.length"
    class="h-full"
  >
    <!-- DESKTOP: Floating TOC -->
    <div class="hidden xl:block relative h-full">
      <div
        v-motion
        :initial="{ opacity: 0, x: 20 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 400, delay: 200 } }"
        class="sticky left-6 top-24 z-40"
      >
        <div class="max-w-sm h-screen">
          <!-- Floating TOC Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span class="text-xs font-medium text-muted uppercase tracking-wide">Navigation</span>
            </div>
            <span class="text-xs text-dimmed">{{ Math.round(readingProgress) }}%</span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-muted/30 rounded-full h-0.5 mb-4">
            <div
              class="bg-primary h-0.5 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${readingProgress}%` }"
            />
          </div>

          <!-- Floating TOC Links -->
          <nav
            class="space-y-1 overflow-y-auto scrollbar-thin"
            :class="`max-h-[calc(100vh-var(--ui-nav-height))]`"
          >
            <template
              v-for="(link, index) in tocLinks"
              :key="link.id"
            >
              <div
                v-motion
                :initial="{ opacity: 0, x: 10 }"
                :enter="{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 300, delay: 300 + index * 50 },
                }"
              >
                <!-- Main heading -->
                <button
                  class="group flex items-start text-left w-full py-1.5 px-2 rounded-md transition-all duration-200"
                  :class="{
                    'text-primary font-medium': activeId === link.id,
                    'text-toned hover:text-highlighted': activeId !== link.id,
                  }"
                  @click="scrollToHeading(link.id)"
                >
                  <!-- Depth indicator -->
                  <div
                    class="flex-shrink-0 w-1 h-1 rounded-full mt-2 mr-2 transition-all duration-200"
                    :class="{
                      'bg-primary': activeId === link.id,
                      'bg-muted group-hover:bg-toned': activeId !== link.id,
                    }"
                  />
                  <span class="text-xs leading-relaxed">{{ link.text }}</span>
                </button>

                <!-- Sub-headings -->
                <template v-if="link.children?.length">
                  <button
                    v-for="child in link.children"
                    :key="child.id"
                    class="group flex items-start text-left w-full py-1 px-2 ml-3 rounded-md transition-all duration-200"
                    :class="{
                      'text-primary': activeId === child.id,
                      'text-muted hover:text-toned': activeId !== child.id,
                    }"
                    @click="scrollToHeading(child.id)"
                  >
                    <div
                      class="flex-shrink-0 w-0.5 h-0.5 rounded-full mt-2 mr-2 transition-all duration-200"
                      :class="{
                        'bg-primary': activeId === child.id,
                        'bg-dimmed group-hover:bg-muted': activeId !== child.id,
                      }"
                    />
                    <span class="text-xs leading-relaxed">{{ child.text }}</span>
                  </button>
                </template>
              </div>
            </template>
          </nav>
        </div>
      </div>
    </div>

    <!-- MOBILE: Floating Button + Drawer -->
    <div class="xl:hidden">
      <!-- Floating Action Button -->
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 300, delay: 500 } }"
        class="fixed bottom-6 right-6 z-50"
      >
        <UButton
          icon="i-lucide-list"
          color="primary"
          variant="solid"
          size="lg"
          square
          class="shadow-lg"
          @click="isMobileDrawerOpen = true"
        >
          <template #trailing>
            <UKbd
              value="T"
              class="hidden"
            />
          </template>
        </UButton>
      </div>

      <!-- Mobile Drawer -->
      <UModal
        v-model:open="isMobileDrawerOpen"
        title="Table of Contents"
        description="Navigate through article sections"
      >
        <template #body>
          <nav class="space-y-2">
            <template
              v-for="link in tocLinks"
              :key="`mobile-${link.id}`"
            >
              <!-- Main heading -->
              <button
                class="flex items-start text-left w-full p-3 rounded-lg transition-all duration-200 hover:bg-elevated"
                :class="{
                  'bg-primary/10 text-primary': activeId === link.id,
                  'text-toned': activeId !== link.id,
                }"
                @click="scrollToHeading(link.id)"
              >
                <div class="flex-shrink-0 mr-3 mt-0.5">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="{
                      'bg-primary': activeId === link.id,
                      'bg-muted': activeId !== link.id,
                    }"
                  />
                </div>
                <span class="font-medium">{{ link.text }}</span>
              </button>

              <!-- Sub-headings -->
              <template v-if="link.children?.length">
                <button
                  v-for="child in link.children"
                  :key="`mobile-${child.id}`"
                  class="flex items-start text-left w-full ml-6 rounded-lg transition-all duration-200 hover:bg-elevated"
                  :class="{
                    'bg-primary/50 text-primary': activeId === child.id,
                    'text-default': activeId !== child.id,
                  }"
                  @click="scrollToHeading(child.id)"
                >
                  <div class="flex-shrink-0 mr-2 mt-1">
                    <div
                      class="w-1 h-1 rounded-full"
                      :class="{
                        'bg-primary': activeId === child.id,
                        'bg-dimmed': activeId !== child.id,
                      }"
                    />
                  </div>
                  <span class="text-sm">{{ child.text }}</span>
                </button>
              </template>
            </template>
          </nav>
        </template>

        <template #footer>
          <div class="flex items-center justify-between text-xs text-default">
            <div class="flex items-center space-x-2">
              <UIcon
                name="i-lucide-keyboard"
                class="size-3"
              />
              <span>Press T to toggle</span>
            </div>
            <span>{{ flatTocLinks.length }} sections</span>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--color-zinc-400)) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgb(var(--color-zinc-400));
  border-radius: 2px;
}
</style>
