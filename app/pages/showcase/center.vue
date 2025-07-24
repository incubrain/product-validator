<script setup lang="ts">
useHead({
  title: 'LayoutCenter Showcase - Layout Primitives',
  meta: [{ name: 'description', content: 'Comprehensive showcase of LayoutCenter variants for content centering and constraints' }],
})

const centerVariants = [
  { name: 'default', description: 'Standard max-width with responsive padding' },
  { name: 'narrow', description: 'Tight constraint for focused content' },
  { name: 'prose', description: 'Optimized for readable text content' },
  { name: 'wide', description: 'Wider constraint for complex layouts' },
  { name: 'full', description: 'Maximum width with container padding' },
  { name: 'text-only', description: 'Text-optimized centering with text-center' },
  { name: 'no-padding', description: 'No horizontal padding for edge cases' },
]
</script>

<template>
  <div class="min-h-screen bg-muted">
    <!-- Full width background to show centering -->
    <div class="py-section space-y-component">
      <!-- Page Header -->
      <LayoutCenter variant="full">
        <LayoutStack variant="centered">
          <LayoutHeading
            text="LayoutCenter Showcase"
            variant="hero"
          />
          <LayoutText
            text="Content centering and width constraints with responsive behavior"
            variant="subtitle"
          />
        </LayoutStack>
      </LayoutCenter>

      <!-- Center Variants -->
      <LayoutStack variant="spacious">
        <div
          v-for="(variant, index) in centerVariants"
          :key="variant.name"
          class="space-y-4"
        >
          <!-- Variant Info -->
          <LayoutCenter variant="full">
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

              <!-- Demo Container with full-width background -->
              <div class="bg-circuit border-2 border-dashed border-primary/30 p-2 rounded-lg">
                <component
                  :is="'LayoutCenter'"
                  :variant="variant.name"
                >
                  <div class="bg-primary/20 border border-primary/50 p-6 rounded">
                    <div class="text-center">
                      <span class="text-primary font-bold text-lg block">Centered Content</span>
                      <span class="text-primary/70 text-sm">
                        Max-width: {{
                          variant.name === 'narrow' ? '32rem'
                          : variant.name === 'prose' ? '65ch'
                            : variant.name === 'wide' ? '72rem'
                              : variant.name === 'full' ? '80rem'
                                : variant.name === 'text-only' ? '48rem'
                                  : '64rem'
                        }}
                      </span>
                    </div>
                  </div>
                </component>
              </div>

              <!-- Width demonstration -->
              <div class="mt-3 p-3 bg-muted/50 rounded text-sm text-dimmed">
                <strong>Container Constraint:</strong> Content is centered and constrained to optimal width for its purpose.
              </div>

              <!-- Code Example -->
              <details class="mt-4">
                <summary class="cursor-pointer text-sm font-medium text-primary hover:text-primary/80">
                  View Code
                </summary>
                <pre class="mt-2 p-3 bg-black/50 rounded text-xs text-green-400 overflow-x-auto"><code>&lt;LayoutCenter variant="${variant.name}"&gt;
  &lt;div&gt;Your content here&lt;/div&gt;
&lt;/LayoutCenter&gt;</code></pre>
              </details>
            </div>
          </LayoutCenter>

          <!-- Divider -->
          <LayoutDivider
            v-if="index < centerVariants.length - 1"
            variant="gradient"
            spacing="lg"
          />
        </div>
      </LayoutStack>

      <!-- Real-World Examples -->
      <LayoutCenter variant="full">
        <div class="bg-elevated p-8 rounded-lg border border-muted">
          <LayoutHeading
            text="Real-World Center Examples"
            variant="section"
          />

          <LayoutStack variant="spacious">
            <!-- Article Layout -->
            <div class="bg-circuit border-2 border-dashed border-emerald-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-emerald-400">
                Article Content Layout
              </h4>
              <LayoutCenter variant="prose">
                <div class="prose prose-sm">
                  <h3>Article Title</h3>
                  <p>This is how article content would look when properly centered and constrained for optimal reading. The prose variant provides the perfect line length for comfortable reading.</p>
                  <p>Multiple paragraphs maintain their readability even on very wide screens because the content is constrained to an appropriate measure.</p>
                </div>
              </LayoutCenter>
            </div>

            <!-- Landing Page Section -->
            <div class="bg-circuit border-2 border-dashed border-blue-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-blue-400">
                Landing Page Section
              </h4>
              <LayoutCenter variant="wide">
                <LayoutStack variant="centered">
                  <LayoutHeading
                    text="Compelling Headline"
                    variant="section"
                  />
                  <LayoutText
                    text="Supporting text that's wide enough for complex layouts but still maintains good visual hierarchy."
                    variant="description"
                  />
                  <LayoutStack variant="horizontal">
                    <UButton
                      label="Primary CTA"
                      color="primary"
                    />
                    <UButton
                      label="Secondary CTA"
                      variant="outline"
                    />
                  </LayoutStack>
                </LayoutStack>
              </LayoutCenter>
            </div>

            <!-- Text-Only Center -->
            <div class="bg-circuit border-2 border-dashed border-amber-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-amber-400">
                Text-Only Centering
              </h4>
              <LayoutCenter variant="text-only">
                <LayoutStack variant="compact">
                  <LayoutHeading
                    text="Centered Text Block"
                    variant="card"
                  />
                  <LayoutText
                    text="Perfect for testimonials, quotes, or simple call-out content that needs to be prominently centered."
                    variant="description"
                  />
                </LayoutStack>
              </LayoutCenter>
            </div>
          </LayoutStack>
        </div>
      </LayoutCenter>
    </div>
  </div>
</template>
