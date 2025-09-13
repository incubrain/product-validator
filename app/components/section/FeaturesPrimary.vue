<script setup lang="ts">
interface Props {
  content: Array<{
    headline: string;
    title: string;
    description: string;
    features: Array<{ title: string; description: string; icon: string }>;
    image: string;
    orientation: string;
    reverse?: boolean;
  }>;
}

const { content } = defineProps<Props>();

// Add currentTheme dynamic description for layer stack card
const { currentTheme } = useThemeColor();

const featureCards = computed(() =>
  content.features?.map((card) =>
    card.slot === 'layer-stack'
      ? {
          ...card,
          description: `Background hierarchy using ${
            currentTheme.value?.name || 'current'
          } theme`,
        }
      : card,
  ),
);
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
        v-for="(card, index) in featureCards"
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
        <!-- Color Palette Card Content -->
        <div v-if="card.title === 'Color Palette'" class="mt-4">
          <div class="bg-white rounded-lg p-4 shadow-lg">
            <div class="grid grid-cols-5 gap-2">
              <div class="h-8 bg-primary-300 rounded"></div>
              <div class="h-8 bg-primary-400 rounded"></div>
              <div class="h-8 bg-primary-500 rounded"></div>
              <div class="h-8 bg-primary-600 rounded"></div>
              <div class="h-8 bg-primary-700 rounded"></div>
            </div>
            <div class="grid grid-cols-5 gap-2 mt-2">
              <div class="h-8 bg-neutral-300 rounded"></div>
              <div class="h-8 bg-neutral-400 rounded"></div>
              <div class="h-8 bg-neutral-500 rounded"></div>
              <div class="h-8 bg-neutral-600 rounded"></div>
              <div class="h-8 bg-neutral-700 rounded"></div>
            </div>
          </div>
        </div>

        <!-- Fully Customizable Card Content -->
        <div v-else-if="card.title === 'Fully Customizable'" class="mt-4">
          <div class="bg-white rounded-lg p-4 shadow-lg">
            <div class="bg-gray-100 p-3 rounded font-mono text-xs text-black">
              <div class="text-green-600">// nuxt.config.ts</div>
              <div>export default defineNuxtConfig({</div>
              <div class="ml-2">ui: {</div>
              <div class="ml-4 text-blue-600">
                primary: '<span class="text-red-600">emerald</span>',
              </div>
              <div class="ml-4 text-blue-600">
                neutral: '<span class="text-red-600">slate</span>'
              </div>
              <div class="ml-2">}</div>
              <div>})</div>
            </div>
          </div>
        </div>

        <!-- Light & Dark Card Content -->
        <div v-else-if="card.title === 'Light & Dark'" class="mt-4">
          <div class="bg-white rounded-lg p-4 shadow-lg">
            <div class="space-y-2">
              <div class="flex items-center gap-2 p-2 bg-gray-100 rounded">
                <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span class="text-sm text-black">Light</span>
                <UIcon name="i-lucide-check" class="text-green-500 ml-auto" />
              </div>
              <div
                class="flex items-center gap-2 p-2 bg-gray-800 rounded text-white"
              >
                <div class="w-4 h-4 bg-blue-400 rounded-full"></div>
                <span class="text-sm">Dark</span>
              </div>
              <div class="flex items-center gap-2 p-2 bg-gray-100 rounded">
                <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span class="text-sm text-black">System</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Icons Card Content -->
        <div v-else-if="card.title === 'Icons'" class="mt-4">
          <div class="bg-white rounded-lg p-4 shadow-lg">
            <div class="grid grid-cols-8 gap-2">
              <UIcon
                v-for="i in 24"
                :key="i"
                name="i-lucide-home"
                class="text-gray-600 text-xl"
              />
            </div>
          </div>
        </div>

        <!-- Layer Stack Visualization Card Content -->
        <div v-else-if="card.slot === 'layer-stack'" class="mt-4">
          <div class="bg-default p-2 rounded-lg">
            <p class="text-sm font-medium mb-4 flex items-center gap-2">
              <span>Layer 0</span>
              <code class="text-xs bg-black/20 px-1 py-0.5 rounded"
                >bg-default</code
              >
            </p>

            <div class="bg-muted p-2 rounded-lg mb-4">
              <p class="text-sm font-medium mb-4 flex items-center gap-2">
                <span>Layer 1</span>
                <code class="text-xs bg-black/20 px-1 py-0.5 rounded"
                  >bg-muted</code
                >
              </p>

              <div class="bg-elevated p-2 rounded-lg mb-4">
                <p class="text-sm font-medium mb-4 flex items-center gap-2">
                  <span>Layer 2</span>
                  <code class="text-xs bg-black/20 px-1 py-0.5 rounded"
                    >bg-elevated</code
                  >
                </p>

                <div class="bg-accented p-2 rounded-lg">
                  <p class="text-sm font-medium mb-3 flex items-center gap-2">
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
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>
