<script setup lang="ts">
interface Props {
  content: {
    headline: string;
    title: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
      class?: string;
      orientation?: string;
      reverse?: boolean;
      component?: string;
    }>;
  };
}

const { content } = defineProps<Props>();
</script>

<template>
  <UPageSection
    :headline="content.headline"
    :title="content.title"
    :description="content.description"
    orientation="vertical"
    :ui="{ container: 'py-16 sm:py-24 lg:py-32' }"
  >
    <UPageGrid>
      <UPageCard
        v-for="(card, index) in content.features"
        :key="index"
        :title="card.title"
        :description="card.description"
        :icon="card.icon"
        :class="card.class"
        :orientation="card.orientation"
        :reverse="!!card.reverse"
        variant="subtle"
        spotlight
        spotlight-color="primary"
      >
        <!-- Theme Palette Visualization -->
        <div v-if="card.component === 'theme-palette'" class="mt-4">
          <div class="space-y-3">
            <!-- Font Preview -->
            <div class="bg-elevated rounded-lg p-3">
              <div class="text-sm font-bold mb-1">Inter + JetBrains Mono</div>
              <div class="text-xs text-muted-foreground font-mono">
                console.log('Hello World')
              </div>
            </div>
            <!-- Color Swatches -->
            <div class="grid grid-cols-5 gap-2">
              <div class="h-6 bg-primary-500 rounded-sm"></div>
              <div class="h-6 bg-primary-600 rounded-sm"></div>
              <div class="h-6 bg-primary-700 rounded-sm"></div>
              <div class="h-6 bg-neutral-500 rounded-sm"></div>
              <div class="h-6 bg-neutral-600 rounded-sm"></div>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div v-else-if="card.component === 'code-example'" class="mt-4">
          <div class="bg-elevated rounded-lg p-3 font-mono text-xs">
            <div class="text-success">
              // Extend UButton with custom variant
            </div>
            <div>
              <span class="text-info">export</span>
              <span class="text-warning">const</span> CustomButton =
              <span class="text-primary">defineComponent</span>({
            </div>
            <div class="ml-2">extends: UButton,</div>
            <div class="ml-2">variants: { theme: 'startup' }</div>
            <div>})</div>
          </div>
        </div>

        <!-- Layer Stack (existing) -->
        <div v-else-if="card.component === 'layer-stack'" class="mt-4">
          <div class="bg-default p-2 rounded-lg">
            <p class="text-sm font-medium mb-3 flex items-center gap-2">
              <span>Layer 0</span>
              <code class="text-xs bg-black/20 px-1 py-0.5 rounded"
                >bg-default</code
              >
            </p>
            <div class="bg-muted p-2 rounded-lg mb-3">
              <p class="text-sm font-medium mb-3 flex items-center gap-2">
                <span>Layer 1</span>
                <code class="text-xs bg-black/20 px-1 py-0.5 rounded"
                  >bg-muted</code
                >
              </p>
              <div class="bg-elevated p-2 rounded-lg mb-3">
                <p class="text-sm font-medium mb-2 flex items-center gap-2">
                  <span>Layer 2</span>
                  <code class="text-xs bg-black/20 px-1 py-0.5 rounded"
                    >bg-elevated</code
                  >
                </p>
                <div class="bg-accented p-2 rounded-lg">
                  <p class="text-sm font-medium flex items-center gap-2">
                    <span>Layer 3</span>
                    <code class="text-xs bg-black/20 px-1 py-0.5 rounded"
                      >bg-accented</code
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Demo -->
        <div v-else-if="card.component === 'content-demo'" class="mt-4">
          <div class="bg-elevated rounded-lg p-3 space-y-2">
            <div class="flex items-start gap-2">
              <UIcon
                name="i-lucide-file-text"
                class="text-primary mt-0.5 flex-shrink-0"
              />
              <div class="min-w-0">
                <div class="text-sm font-medium">Getting Started Guide</div>
                <div class="text-xs text-muted-foreground">
                  Published 2 days ago
                </div>
              </div>
            </div>
            <div class="text-xs text-muted-foreground line-clamp-2">
              Learn how to set up your first startup website with our
              template...
            </div>
            <div class="flex gap-1">
              <UBadge size="sm" variant="outline">Nuxt</UBadge>
              <UBadge size="sm" variant="outline">Tutorial</UBadge>
            </div>
          </div>
        </div>

        <!-- Analytics Chart -->
        <div v-else-if="card.component === 'analytics-chart'" class="mt-4">
          <div class="bg-elevated rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="text-xs font-medium">User Analytics</div>
              <div class="text-xs text-success">+12.5%</div>
            </div>
            <!-- Mini Chart Visualization -->
            <div class="flex items-end gap-1 h-12">
              <div class="bg-primary-500 w-2 h-6 rounded-sm"></div>
              <div class="bg-primary-500 w-2 h-8 rounded-sm"></div>
              <div class="bg-primary-500 w-2 h-4 rounded-sm"></div>
              <div class="bg-primary-500 w-2 h-10 rounded-sm"></div>
              <div class="bg-primary-500 w-2 h-12 rounded-sm"></div>
              <div class="bg-primary-500 w-2 h-7 rounded-sm"></div>
              <div class="bg-primary-500 w-2 h-9 rounded-sm"></div>
            </div>
          </div>
        </div>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>
