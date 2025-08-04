<script setup lang="ts">
useHead({
  title: 'LayoutStack Showcase - Layout Primitives',
  meta: [{ name: 'description', content: 'Comprehensive showcase of LayoutStack variants and usage patterns' }],
})

const stackVariants = [
  {
    name: 'default',
    description: 'Standard vertical stacking with medium gaps (gap-4)',
    demoContent: [
      { text: 'Standard Item 1', size: 'p-4', width: 'w-full' },
      { text: 'Standard Item 2', size: 'p-6', width: 'w-full' },
      { text: 'Standard Item 3', size: 'p-4', width: 'w-full' },
    ],
  },
  {
    name: 'centered',
    description: 'Center-aligned items with consistent gaps (items-center)',
    demoContent: [
      { text: 'Centered Short', size: 'p-3', width: 'w-32' },
      { text: 'Centered Medium Length', size: 'p-4', width: 'w-48' },
      { text: 'Centered', size: 'p-3', width: 'w-24' },
    ],
  },
  {
    name: 'compact',
    description: 'Tight spacing for dense content (gap-2)',
    demoContent: [
      { text: 'Compact 1', size: 'p-2', width: 'w-full' },
      { text: 'Compact 2', size: 'p-2', width: 'w-full' },
      { text: 'Compact 3', size: 'p-2', width: 'w-full' },
      { text: 'Compact 4', size: 'p-2', width: 'w-full' },
    ],
  },
  {
    name: 'spacious',
    description: 'Generous spacing for breathing room (gap-8)',
    demoContent: [
      { text: 'Spacious Item 1', size: 'p-6', width: 'w-full' },
      { text: 'Spacious Item 2', size: 'p-6', width: 'w-full' },
    ],
  },
  {
    name: 'horizontal',
    description: 'Horizontal flow with wrapping (flex-row flex-wrap)',
    demoContent: [
      { text: 'Horiz 1', size: 'p-3', width: 'w-auto' },
      { text: 'Horizontal 2', size: 'p-3', width: 'w-auto' },
      { text: 'H3', size: 'p-3', width: 'w-auto' },
      { text: 'Horizontal Item 4', size: 'p-3', width: 'w-auto' },
    ],
  },
  {
    name: 'horizontal-between',
    description: 'Space-between horizontal layout (justify-between)',
    demoContent: [
      { text: 'Left', size: 'p-3', width: 'w-auto' },
      { text: 'Center', size: 'p-3', width: 'w-auto' },
      { text: 'Right', size: 'p-3', width: 'w-auto' },
    ],
  },
  {
    name: 'horizontal-center',
    description: 'Center-aligned horizontal (justify-center)',
    demoContent: [
      { text: 'Center 1', size: 'p-3', width: 'w-auto' },
      { text: 'Center 2', size: 'p-3', width: 'w-auto' },
      { text: 'Center 3', size: 'p-3', width: 'w-auto' },
    ],
  },
  {
    name: 'stack-to-row',
    description: 'Responsive: vertical mobile, horizontal desktop (md:flex-row)',
    demoContent: [
      { text: 'Responsive 1', size: 'p-4', width: 'md:w-auto w-full' },
      { text: 'Responsive 2', size: 'p-4', width: 'md:w-auto w-full' },
      { text: 'Responsive 3', size: 'p-4', width: 'md:w-auto w-full' },
    ],
  },
  {
    name: 'center-to-between',
    description: 'Responsive: centered mobile, space-between desktop',
    demoContent: [
      { text: 'Resp Left', size: 'p-3', width: 'w-auto' },
      { text: 'Resp Center', size: 'p-3', width: 'w-auto' },
      { text: 'Resp Right', size: 'p-3', width: 'w-auto' },
    ],
  },
]
</script>

<template>
  <div class="min-h-screen bg-muted">
    <LayoutCenter variant="full">
      <div class="py-section space-y-component">
        <!-- Page Header -->
        <LayoutStack variant="centered">
          <LayoutHeading
            text="LayoutStack Showcase (FIXED)"
            variant="hero"
          />
          <LayoutText
            text="Visual exploration of all stack variants with distinct demo content"
            variant="subtitle"
          />
          <div class="text-sm text-amber-400 bg-amber-500/10 rounded border border-amber-500/30">
            ⚡ Now with varied content to show real differences between variants
          </div>
        </LayoutStack>

        <!-- Stack Variants -->
        <LayoutStack variant="spacious">
          <div
            v-for="(variant, index) in stackVariants"
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

              <!-- Demo Container with visible boundaries -->
              <div class="i-pattern-circuit border-2 border-dashed border-primary/30 p-6 rounded-lg min-h-[200px]">
                <component
                  :is="'LayoutStack'"
                  :variant="variant.name"
                  class="h-full"
                >
                  <!-- Varied Demo Items -->
                  <div
                    v-for="(item, i) in variant.demoContent"
                    :key="i"
                    :class="[
                      'border rounded text-center',
                      item.size,
                      item.width,
                      i === 0 ? 'bg-primary/20 border-primary/50 text-primary'
                      : i === 1 ? 'bg-secondary/20 border-secondary/50 text-secondary'
                        : i === 2 ? 'bg-amber-500/20 border-amber-500/50 text-amber-600'
                          : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-600',
                    ]"
                  >
                    <span class="font-medium">{{ item.text }}</span>
                  </div>
                </component>
              </div>

              <!-- Behavior Notes -->
              <div class="mt-3 p-3 bg-muted/50 rounded text-sm">
                <div class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-info"
                    class="size-4 text-blue-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <strong class="text-blue-400">Visual Clues:</strong>
                    <ul class="mt-1 space-y-1 text-dimmed">
                      <li v-if="variant.name.includes('horizontal')">
                        • Items flow horizontally instead of vertically
                      </li>
                      <li v-if="variant.name === 'centered'">
                        • Items center-align (different widths show this)
                      </li>
                      <li v-if="variant.name === 'compact'">
                        • Tighter gaps between items
                      </li>
                      <li v-if="variant.name === 'spacious'">
                        • Larger gaps between items
                      </li>
                      <li v-if="variant.name.includes('between')">
                        • Items spread to container edges
                      </li>
                      <li v-if="variant.name.includes('responsive')">
                        • Layout changes at md: breakpoint (768px)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Code Example -->
              <details class="mt-4">
                <summary class="cursor-pointer text-sm font-medium text-primary hover:text-primary/80">
                  View Code
                </summary>
                <pre class="mt-2 p-3 bg-black/50 rounded text-xs text-green-400 overflow-x-auto"><code>&lt;LayoutStack variant="${variant.name}"&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
  &lt;div&gt;Item 3&lt;/div&gt;
&lt;/LayoutStack&gt;</code></pre>
              </details>
            </div>

            <!-- Divider -->
            <LayoutDivider
              v-if="index < stackVariants.length - 1"
              variant="gradient"
              spacing="lg"
            />
          </div>
        </LayoutStack>

        <!-- Responsive Testing Guide -->
        <div class="bg-elevated p-8 rounded-lg border border-muted">
          <LayoutHeading
            text="How to Test Responsive Variants"
            variant="section"
          />
          <div class="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mt-4">
            <LayoutStack variant="compact">
              <p class="text-blue-400 font-medium">
                🖥️ Responsive Testing Guide:
              </p>
              <ol class="text-sm text-dimmed space-y-2 list-decimal list-inside">
                <li><strong>stack-to-row:</strong> Items stack vertically on mobile, flow horizontally on desktop (768px+)</li>
                <li><strong>center-to-between:</strong> Items center on mobile, space-between on desktop</li>
                <li><strong>All horizontal variants:</strong> Will wrap to new lines if container is too narrow</li>
              </ol>
              <p class="text-xs text-dimmed mt-3">
                💡 <strong>Tip:</strong> Resize your browser window to see responsive changes in action!
              </p>
            </LayoutStack>
          </div>
        </div>
      </div>
    </LayoutCenter>
  </div>
</template>
