<script setup lang="ts">
useHead({
  title: 'ILayoutSplit Showcase - Layout Primitives',
  meta: [{ name: 'description', content: 'Comprehensive showcase of ILayoutSplit variants for two-column layouts' }],
})

const splitVariants = [
  { name: 'default', description: 'Equal columns with standard gap' },
  { name: 'narrow', description: 'Narrower secondary column (1fr + 0.8fr)' },
  { name: 'wide', description: 'Wider primary column (1.2fr + 1fr)' },
  { name: 'stack-lg', description: 'Stack on tablet, split on XL screens' },
  { name: 'reverse', description: 'Visual order reversal with flex-col-reverse' },
]
</script>

<template>
  <div class="min-h-screen bg-muted">
    <ILayoutCenter variant="full">
      <div class="py-section space-y-component">
        <!-- Page Header -->
        <ILayoutStack variant="centered">
          <IHeading
            text="ILayoutSplit Showcase"
            variant="hero"
          />
          <IText
            text="Two-column responsive layouts with intelligent breakpoint behavior"
            variant="subtitle"
          />
        </ILayoutStack>

        <!-- Split Variants -->
        <ILayoutStack variant="spacious">
          <div
            v-for="(variant, index) in splitVariants"
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
                  <IHeading
                    :text="`variant='${variant.name}'`"
                    variant="card"
                  />
                </div>
                <IText
                  :text="variant.description"
                  variant="description"
                />
              </div>

              <!-- Demo Container -->
              <div class="i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg">
                <component
                  :is="'ILayoutSplit'"
                  :variant="variant.name"
                  class="min-h-[300px]"
                >
                  <template #primary>
                    <div class="bg-primary/20 border border-primary/50 p-6 rounded h-full flex items-center justify-center">
                      <div class="text-center">
                        <span class="text-primary font-bold text-lg block">Primary Content</span>
                        <span class="text-primary/70 text-sm">Main content area</span>
                      </div>
                    </div>
                  </template>

                  <template #secondary>
                    <div class="bg-secondary/20 border border-secondary/50 p-6 rounded h-full flex items-center justify-center">
                      <div class="text-center">
                        <span class="text-secondary font-bold text-lg block">Secondary Content</span>
                        <span class="text-secondary/70 text-sm">Supporting content</span>
                      </div>
                    </div>
                  </template>
                </component>
              </div>

              <!-- Code Example -->
              <details class="mt-4">
                <summary class="cursor-pointer text-sm font-medium text-primary hover:text-primary/80">
                  View Code
                </summary>
                <pre class="mt-2 p-3 bg-black/50 rounded text-xs text-green-400 overflow-x-auto"><code>&lt;ILayoutSplit variant="${variant.name}"&gt;
  &lt;template #primary&gt;
    Primary content
  &lt;/template&gt;
  &lt;template #secondary&gt;
    Secondary content
  &lt;/template&gt;
&lt;/ILayoutSplit&gt;</code></pre>
              </details>
            </div>

            <!-- Divider -->
            <ILayoutDivider
              v-if="index < splitVariants.length - 1"
              variant="gradient"
              spacing="lg"
            />
          </div>
        </ILayoutStack>

        <!-- Real-World Examples -->
        <div class="bg-elevated p-8 rounded-lg border border-muted">
          <IHeading
            text="Real-World Split Examples"
            variant="section"
          />

          <ILayoutStack variant="spacious">
            <!-- Hero Section Example -->
            <div class="i-pattern-circuit border-2 border-dashed border-emerald-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-emerald-400">
                Hero Section Layout
              </h4>
              <ILayoutSplit variant="default">
                <template #primary>
                  <ILayoutStack variant="default">
                    <IHeading
                      text="Hero Title"
                      variant="hero"
                    />
                    <IText
                      text="Compelling hero description that converts visitors into customers."
                      variant="description"
                    />
                    <ILayoutStack variant="horizontal">
                      <UButton
                        label="Get Started"
                        color="primary"
                      />
                      <UButton
                        label="Learn More"
                        variant="outline"
                      />
                    </ILayoutStack>
                  </ILayoutStack>
                </template>

                <template #secondary>
                  <div class="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg h-64 flex items-center justify-center border border-primary/20">
                    <span class="text-muted">Hero Image/Video</span>
                  </div>
                </template>
              </ILayoutSplit>
            </div>

            <!-- Content + Sidebar Example -->
            <div class="i-pattern-circuit border-2 border-dashed border-blue-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold mb-4 text-blue-400">
                Content + Sidebar Layout
              </h4>
              <ILayoutSplit variant="wide">
                <template #primary>
                  <div class="prose prose-sm max-w-none">
                    <h3>Main Content Area</h3>
                    <p>This would be your main content like blog posts, product descriptions, or detailed information.</p>
                  </div>
                </template>

                <template #secondary>
                  <div class="bg-elevated p-4 rounded border border-muted">
                    <h4 class="font-semibold mb-3">
                      Sidebar Content
                    </h4>
                    <ul class="space-y-2 text-sm text-muted">
                      <li>• Related articles</li>
                      <li>• Call-to-action</li>
                      <li>• Author bio</li>
                      <li>• Social sharing</li>
                    </ul>
                  </div>
                </template>
              </ILayoutSplit>
            </div>
          </ILayoutStack>
        </div>
      </div>
    </ILayoutCenter>
  </div>
</template>
