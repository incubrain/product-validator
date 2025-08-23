<script setup lang="ts">
// Variants from your tv() config
type Variant = 'masonry' | 'dense' | 'cascade' | 'narrow' | 'balanced' | 'wide' | 'split' | 'auto'
type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const variant = ref<Variant>('auto')
const gap = ref<Gap>('md')
const spacing = ref<Spacing>('md')

// Tiny data set to visualize flow & column breaks
const items = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  // staggered heights to show masonry-like flow
  lines: (i % 5) + 2,
}))

// Minimal code sample to show in the right panel (trimmed)
const codeSample = `// Usage
<Columns :variant="'${variant.value}'" :gap="'${gap.value}'" :spacing="'${spacing.value}'">
  <article v-for="i in 12" :key="i">...</article>
</Columns>`
</script>

<template>
  <ISection>
    <WipShowcaseContainer
      id="columns-showcase"
      title="CSS Columns Layouts (Masonry / Magazine)"
      :height="930"
      :code="codeSample"
      :install-command="'npx shadcn add sidebar-03'"
      v0-url="https://v0.dev"
    >
      <!-- LIVE PREVIEW (left pane) -->
      <div class="p-3">
        <ILayoutColumns
          :variant="variant"
          :gap="gap"
          :spacing="spacing"
          class="w-full"
        >
          <article
            v-for="item in items"
            :key="item.id"
            class="rounded-lg border border-default bg-background/60 p-3"
          >
            <h4 class="mb-2 font-medium">
              Card #{{ item.id }}
            </h4>
            <p
              v-for="n in item.lines"
              :key="n"
              class="text-sm opacity-80"
            >
              This is a sample line to simulate variable content height.
            </p>
          </article>
        </ILayoutColumns>
      </div>

      <!-- RIGHT PANEL (controls / notes) -->
      <template #right>
        <div class="space-y-4">
          <h3 class="text-sm font-medium">
            Live Controls
          </h3>

          <div class="grid grid-cols-1 gap-3">
            <label class="text-xs opacity-80">
              Variant
              <select
                v-model="variant"
                class="mt-1 w-full rounded-md border border-default px-2 py-1 text-sm"
              >
                <option value="masonry">masonry</option>
                <option value="dense">dense</option>
                <option value="cascade">cascade</option>
                <option value="narrow">narrow</option>
                <option value="balanced">balanced</option>
                <option value="wide">wide</option>
                <option value="split">split</option>
                <option value="auto">auto</option>
              </select>
            </label>

            <label class="text-xs opacity-80">
              Gap
              <select
                v-model="gap"
                class="mt-1 w-full rounded-md border border-default px-2 py-1 text-sm"
              >
                <option value="none">none</option>
                <option value="xs">xs</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
                <option value="2xl">2xl</option>
              </select>
            </label>

            <label class="text-xs opacity-80">
              Spacing (item bottom margin)
              <select
                v-model="spacing"
                class="mt-1 w-full rounded-md border border-default px-2 py-1 text-sm"
              >
                <option value="none">none</option>
                <option value="xs">xs</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
                <option value="2xl">2xl</option>
              </select>
            </label>
          </div>

          <div class="rounded-lg border border-default p-3 text-sm opacity-80">
            <p class="mb-2">
              <strong>What this shows:</strong>
            </p>
            <ul class="list-disc pl-5 space-y-1">
              <li><code>variant</code> switches column count rules (e.g. masonry vs magazine-like grids).</li>
              <li><code>gap</code> controls the space between columns.</li>
              <li><code>spacing</code> applies bottom margin to items inside columns.</li>
              <li>Each child gets <code>break-inside-avoid</code> to prevent awkward splits.</li>
            </ul>
          </div>
        </div>
      </template>
    </WipShowcaseContainer>
  </ISection>
</template>
