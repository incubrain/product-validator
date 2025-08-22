<script setup lang="ts">
// Component configuration for the showcase
const gradientConfig = {
  variant: 'spotlight',
  x: 'center',
  y: 'quarter',
  intensity: 'intense',
  from: 'primary-800',
}

const patternConfig = {
  variant: 'triangles',
  intensity: 'strong',
  size: 'lg',
  stroke: 'normal',
  from: 'secondary-100',
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-8 space-y-12">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-bold text-foreground">
        Layered Visual Effects
      </h2>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        Combine gradients and patterns to create rich, sophisticated backgrounds that enhance your interface design.
      </p>
    </div>

    <!-- Two Row Layout: Components then Hero -->
    <div class="space-y-12">
      <!-- Top Row: Component Breakdown in horizontal flow -->
      <div class="space-y-8">
        <div class="text-center space-y-4">
          <h3 class="text-2xl font-semibold text-foreground">
            Component Breakdown
          </h3>
          <p class="text-muted-foreground">
            100+ gradient variants × 20+ patterns = unlimited backgrounds
          </p>
        </div>

        <div class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <!-- Gradient Component -->
          <div class="flex-1 max-w-sm space-y-4">
            <h4 class="text-lg font-medium text-foreground text-center flex items-center justify-center gap-3">
              <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm flex items-center justify-center font-semibold">
                1
              </div>
              50+ Gradients
            </h4>
            <div class="relative h-48 w-full rounded-xl overflow-hidden border border-default bg-elevated">
              <WipGradient v-bind="gradientConfig" />
            </div>
          </div>

          <!-- Plus Symbol -->
          <UIcon
            name="i-lucide-plus"
            size="34"
          />

          <!-- Pattern Component -->
          <div class="flex-1 max-w-sm space-y-4">
            <h4 class="text-lg font-medium text-foreground text-center flex items-center justify-center gap-3">
              <div class="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm flex items-center justify-center font-semibold">
                2
              </div>
              20+ Patterns
            </h4>
            <div class="relative h-48 w-full rounded-xl overflow-hidden border border-default bg-elevated">
              <WipPattern v-bind="patternConfig" />
            </div>
          </div>

          <!-- Equals Symbol -->
          <UIcon
            name="i-lucide-equal"
            size="34"
          />

          <!-- Combined Result -->
          <div class="flex-1 max-w-sm space-y-4">
            <h4 class="text-lg font-medium text-foreground text-center flex items-center justify-center gap-3">
              <div class="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm flex items-center justify-center font-semibold">
                3
              </div>
              100s of Combinations
            </h4>
            <div class="relative h-48 w-full rounded-xl overflow-hidden border border-default bg-elevated">
              <WipGradient
                v-bind="gradientConfig"
                class="absolute inset-0"
              />
              <WipPattern
                v-bind="patternConfig"
                class="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Hero CTA -->
      <div class="relative rounded-3xl overflow-hidden border border-default shadow-2xl">
        <!-- Background Layers -->
        <WipGradient
          v-bind="gradientConfig"
          class="absolute inset-0"
        />
        <WipPattern
          v-bind="patternConfig"
          class="absolute inset-0"
        />

        <!-- Content Overlay -->
        <div class="relative z-10 p-12 lg:p-16 xl:p-20 min-h-[500px] flex items-center justify-center text-center">
          <div class="max-w-4xl space-y-8">
            <div class="space-y-6">
              <h4 class="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                Ready to Transform Your Design?
              </h4>
              <p class="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Combine gradients and patterns to create sophisticated visual experiences that engage your users and elevate your brand.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
                Get Started
              </button>
              <button class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
