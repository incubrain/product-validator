<script setup lang="ts">
const PREVIEW_TEXT = 'The quick brown fox jumps';

const {
  fontPairings,
  categories,
  selectedCategory,
  fontString,
  formatWeightRange,
  selectPairing,
  isPairingSelected,
  // optional if you want live weights in the list:
  fetchGoogleFontWeights,
} = useThemeFonts();

// Preload visible weights (optional, keeps your UX snappy)
watchEffect(async () => {
  const group = fontPairings[selectedCategory.value] || [];
  await Promise.all(
    group.flatMap(async ({ heading, body }) => {
      await Promise.all([
        fetchGoogleFontWeights(heading.name),
        fetchGoogleFontWeights(body.name),
      ]);
    }),
  );
});

const weightsByFont = ref<Record<string, number[]>>({});

// Preload weights for the visible group to keep UI snappy
watchEffect(async () => {
  const group = fontPairings[selectedCategory.value] || [];
  const names = Array.from(
    new Set(group.flatMap((p) => [p.heading.name, p.body.name])),
  );
  const pairs = await Promise.all(
    names.map(async (n) => [n, await fetchGoogleFontWeights(n)] as const),
  );
  for (const [n, w] of pairs) weightsByFont.value[n] = w;
});

const weightText = (name: string) =>
  formatWeightRange(weightsByFont.value[name] || []);
</script>

<template>
  <div class="space-y-4">
    <!-- Category Tabs -->
    <div>
      <label class="block font-medium mb-3">Font Pairings</label>
      <div
        class="flex sticky top-20 gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
      >
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'flex-1 text-xs py-2 px-3 rounded-md transition-colors',
            selectedCategory === category
              ? 'bg-white dark:bg-neutral-700 font-medium shadow-sm'
              : 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
          ]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Pairing Preview Grid -->
    <div class="grid grid-cols-1 gap-3">
      <button
        v-for="(pairing, index) in fontPairings[selectedCategory]"
        :key="`${selectedCategory}-${index}`"
        :class="[
          'text-left p-4 border-2 rounded-lg transition-all hover:shadow-md',
          isPairingSelected(pairing)
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300',
        ]"
        @click="selectPairing(pairing)"
      >
        <!-- Heading Preview -->
        <div
          class="text-lg font-semibold mb-1"
          :style="{ fontFamily: fontString(pairing.heading.name) }"
        >
          <div class="truncate">
            {{ pairing.heading.name }}
            <em class="text-xs text-info-500 font-mono">
              {{ weightText(pairing.heading.name) || 'Loading...' }}
            </em>
            <span class="text-xs font-normal text-dimmed ml-2">
              {{ pairing.heading.feel }}
            </span>
          </div>
        </div>

        <!-- Body Preview -->
        <div
          class="text-sm text-neutral-600 dark:text-neutral-400"
          :style="{ fontFamily: fontString(pairing.body.name) }"
        >
          <div class="truncate">
            {{ pairing.body.name }}

            <em class="text-xs text-info-500 font-mono">
              {{ weightText(pairing.body.name) || 'Loading...' }}
            </em>
            <span class="text-xs font-normal text-dimmed ml-2">
              {{ pairing.body.feel }}
            </span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
