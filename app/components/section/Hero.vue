<!-- components/sections/HeroSection.vue -->
<script setup lang="ts">
const content = {
  hero: {
    badge: {
      icon: 'i-lucide-sparkles',
      text: 'Open-source Nuxt template · WIP',
    },
    headlineLeadIn: 'Sick of Building',
    headlineProduct: 'GHOST PRODUCTS?',
    subheadline: 'Validate your idea with Nuxt Launch Kit BEFORE you build it!',
    primaryCta: { text: 'Get Started', subtitle: 'pnpm dev in minutes' },
    secondaryCta: 'Star on GitHub',
  },
}

/**
 * Icon placements are anchored inside the hero section (relative container).
 * For right-side anchors ('tr' | 'br'), x is measured from the RIGHT edge.
 */
const floatingIcons = [
  { name: 'vue', icon: 'i-logos-vue', anchor: 'tl', x: 96, y: 140, lg: { x: 160, y: 120 }, size: 'w-16 h-16' },
  { name: 'ts', icon: 'i-logos-typescript-icon', anchor: 'tl', x: 32, y: 320, lg: { x: 64, y: 280 }, size: 'w-16 h-16' },
  { name: 'vueuse', icon: 'i-logos-vueuse', anchor: 'bl', x: 120, y: 180, lg: { x: 180, y: 220 }, size: 'w-16 h-16' },
  { name: 'nuxt', icon: 'i-logos-nuxt-icon', anchor: 'tr', x: 160, y: 120, lg: { x: 220, y: 96 }, size: 'w-16 h-16' },
  { name: 'tailwind', icon: 'i-logos-tailwindcss-icon', anchor: 'tr', x: 32, y: 320, lg: { x: 64, y: 280 }, size: 'w-16 h-16' },
  { name: 'vercel', icon: 'i-logos-vercel-icon', anchor: 'br', x: 140, y: 120, lg: { x: 180, y: 140 }, size: 'w-16 h-16' },
]

function styleFor(fi: (typeof floatingIcons)[number], bp: 'base' | 'lg') {
  const x = bp === 'lg' ? fi.lg.x : fi.x
  const y = bp === 'lg' ? fi.lg.y : fi.y
  // map anchor -> css inset props
  const base: Record<string, string> = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }
  const set = (k: 'top' | 'right' | 'bottom' | 'left', v: string) => (base[k] = v)
  if (fi.anchor === 'tl') { set('top', `${y}px`); set('left', `${x}px`) }
  if (fi.anchor === 'tr') { set('top', `${y}px`); set('right', `${x}px`) }
  if (fi.anchor === 'bl') { set('bottom', `${y}px`); set('left', `${x}px`) }
  if (fi.anchor === 'br') { set('bottom', `${y}px`); set('right', `${x}px`) }
  return base
}
</script>

<template>
  <UPageHero
    :headline="content.hero.badge.text"
    :title="`${content.hero.headlineLeadIn} ${content.hero.headlineProduct}`"
    :description="content.hero.subheadline"
    orientation="vertical"
  >
    <!-- Badge replaces headline text via slot -->
    <template #headline>
      <UButton
        variant="outline"
        color="neutral"
        size="sm"
        :leading-icon="content.hero.badge.icon"
        class="border-default bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
      >
        {{ content.hero.badge.text }}
      </UButton>
    </template>

    <!-- Fancy 2-line title with gradient emphasis -->
    <template #title>
      <h1 class="text-5xl sm:text-7xl font-bold tracking-tight leading-none text-center">
        {{ content.hero.headlineLeadIn }}
        <span
          class="block bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600"
        >
          {{ content.hero.headlineProduct }}
        </span>
      </h1>
    </template>

    <!-- Description already comes from prop; override if you want custom markup -->
    <!-- <template #description> ... </template> -->

    <!-- CTA buttons with subtitle on primary -->
    <template #links>
      <div class="flex flex-wrap justify-center gap-3">
        <UButton
          size="xl"
          color="neutral"
          variant="solid"
          class="px-8 py-4 text-lg font-semibold text-gray-900 bg-white shadow-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl"
        >
          {{ content.hero.primaryCta.text }}
          <span class="ml-2 text-sm font-normal opacity-70">— {{ content.hero.primaryCta.subtitle }}</span>
        </UButton>

        <UButton
          size="xl"
          color="neutral"
          variant="outline"
          class="px-8 py-4 text-lg font-semibold text-white border-default backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
        >
          {{ content.hero.secondaryCta }}
        </UButton>
      </div>
    </template>

    <!-- Floating tech icons (decorative) -->
    <template #top>
      <div class="pointer-events-none absolute inset-0">
        <!-- mobile/tablet positions -->
        <UIcon
          v-for="fi in floatingIcons"
          :key="fi.name + '-base'"
          :name="fi.icon"
          :class="['absolute opacity-70', fi.size, 'lg:hidden']"
          :style="styleFor(fi, 'base')"
        />
        <!-- lg+ positions -->
        <UIcon
          v-for="fi in floatingIcons"
          :key="fi.name + '-lg'"
          :name="fi.icon"
          :class="['absolute opacity-70 hidden lg:block', fi.size]"
          :style="styleFor(fi, 'lg')"
        />
      </div>
    </template>
  </UPageHero>
</template>
