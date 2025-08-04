<script setup lang="ts">
useHead({
  title: 'LayoutGrid Showcase - Layout Primitives',
  meta: [{ name: 'description', content: 'Comprehensive showcase of LayoutGrid variants for multi-column layouts' }],
})

const gridVariants = [
  { name: 'auto', description: 'Responsive: 1 → 2 → 3 columns', items: 6 },
  { name: 'thirds', description: '1 → 3 columns at md breakpoint', items: 6 },
  { name: 'halves', description: '1 → 2 columns at md breakpoint', items: 4 },
  { name: 'quarters', description: '1 → 2 → 4 columns progression', items: 8 },
  { name: 'cards', description: 'Card-optimized: 1 → 2 → 3 columns', items: 6 },
  { name: 'compact', description: 'Dense layout: 1 → 2 → 3 → 4 columns', items: 8 },
  { name: 'wide', description: 'Large content: 1 → 2 columns only', items: 4 },
  { name: 'masonry', description: 'CSS columns masonry layout', items: 9 },
]
</script>

<template>
  <div class="min-h-screen bg-muted">
    <LayoutCenter variant="full">
      <div class="py-section space-y-component">
        <!-- Page Header -->
        <LayoutStack variant="centered">
          <LayoutHeading
            text="LayoutGrid Showcase"
            variant="hero"
          />
          <LayoutText
            text="Multi-column grid systems with responsive breakpoint behavior"
            variant="subtitle"
          />
        </LayoutStack>

        <!-- Grid Variants -->
        <LayoutStack variant="spacious">
          <div
            v-for="(variant, index) in gridVariants"
            :key="variant.name"
            class="space-y-4"
          >
            <!-- Variant Info -->
            <div class="bg-elevated p-6 rounded-lg border border-muted">
              <div class="mb-4">
                <div class="flex items-center gap-3 mb-2">
                  <UBadge
                    :label="String(index + 1)"
                    color="primary"
                    variant="solid"
                  />
                  <LayoutHeading
                    :text="`variant='${variant.name}'`"
                    variant="card"
                  />
                </div>
                <LayoutText
                  :text="variant.description"
                  variant="description"
                />
              </div>

              <!-- Demo Container -->
              <div class="i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg">
                <component
                  :is="'LayoutGrid'"
                  :variant="variant.name"
                >
                  <div
                    v-for="i in variant.items"
                    :key="i"
                    class="bg-primary/20 border border-primary/50 p-4 rounded text-center"
                    :class="variant.name === 'masonry' ? `h-${20 + (i % 3) * 8}` : 'h-24'"
                  >
                    <span class="text-primary font-medium">{{ i }}</span>
                  </div>
                </component>
              </div>

              <!-- Responsive Behavior Note -->
              <div class="mt-3 p-3 bg-muted/50 rounded text-sm text-dimmed">
                <strong>Responsive Behavior:</strong> {{ variant.description }}
                <br>
                <em>Resize your browser to see the column changes</em>
              </div>

              <!-- Code Example -->
              <details class="mt-4">
                <summary class="cursor-pointer text-sm font-medium text-primary hover:text-primary/80">
                  View Code
                </summary>
                <pre class="mt-2 p-3 bg-black/50 rounded text-xs text-green-400 overflow-x-auto"><code>&lt;LayoutGrid variant="${variant.name}"&gt;
  &lt;div&gt;Grid Item 1&lt;/div&gt;
  &lt;div&gt;Grid Item 2&lt;/div&gt;
  &lt;div&gt;Grid Item 3&lt;/div&gt;
  &lt;!-- More items... --&gt;
&lt;/LayoutGrid&gt;</code></pre>
              </details>
            </div>

            <!-- Divider -->
            <LayoutDivider
              v-if="index < gridVariants.length - 1"
              variant="gradient"
              spacing="lg"
            />
          </div>
        </LayoutStack>

        <!-- Real-World Examples -->
        <div class="bg-elevated p-8 rounded-lg border border-muted">
          <LayoutHeading
            text="Real-World Grid Examples"
            variant="section"
          />

          <LayoutStack variant="spacious">
            <!-- Product Grid -->
            <div class="i-pattern-circuit border-2 border-dashed border-emerald-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-emerald-400">
                Product/Service Grid
              </h4>
              <LayoutGrid variant="cards">
                <UCard
                  v-for="i in 3"
                  :key="i"
                  class="h-full"
                >
                  <template #header>
                    <div class="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <UIcon
                        name="i-lucide-package"
                        class="size-8 text-primary"
                      />
                    </div>
                  </template>
                  <LayoutStack variant="compact">
                    <h4 class="font-semibold">
                      Product {{ i }}
                    </h4>
                    <p class="text-sm text-muted">
                      Brief product description with key benefits.
                    </p>
                  </LayoutStack>
                  <template #footer>
                    <UButton
                      label="Learn More"
                      variant="outline"
                      size="sm"
                      block
                    />
                  </template>
                </UCard>
              </LayoutGrid>
            </div>

            <!-- Team Grid -->
            <div class="i-pattern-circuit border-2 border-dashed border-blue-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-blue-400">
                Team Members Grid
              </h4>
              <LayoutGrid variant="thirds">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="text-center"
                >
                  <div class="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center">
                    <UIcon
                      name="i-lucide-user"
                      class="size-8 text-secondary"
                    />
                  </div>
                  <h4 class="font-semibold">
                    Team Member {{ i }}
                  </h4>
                  <p class="text-sm text-muted">
                    Role & Expertise
                  </p>
                </div>
              </LayoutGrid>
            </div>
          </LayoutStack>
        </div>
      </div>
    </LayoutCenter>
  </div>
</template>
