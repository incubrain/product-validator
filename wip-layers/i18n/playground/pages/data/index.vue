<!-- playground/pages/categories.vue - NOW THIS IS WHAT HELPERS SHOULD ENABLE -->
<script setup lang="ts">
const { loadCollectionStems, getCollectionCoverage } = useI18nContentHelpers()

const { stems, debugInfo } = await loadCollectionStems('categories', {
  includeDebugInfo: true,
})

const stemList = computed(() => Object.keys(stems).sort())
const coverage = computed(() => getCollectionCoverage(stems))
const findFor = (stem: string, code: string) => stems[stem]?.[code]
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold text-white">
        STEM-Based Content Architecture
      </h1>
      <p class="text-gray-400 text-sm">
        Showcase of <strong>translation coverage analysis</strong> and the <strong>loadCollectionStems()</strong> helper function in action.
      </p>
    </header>

    <!-- Available Helper Functions -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-wrench"
            class="w-5 h-5 text-blue-400"
          />
          <span class="text-lg font-semibold text-white">Available Helper Functions</span>
          <UBadge
            variant="soft"
            size="xs"
            color="blue"
          >
            useI18nContentHelpers
          </UBadge>
        </div>
      </template>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-3">
          <h3 class="font-medium text-blue-400">
            Collection Management
          </h3>
          <div class="space-y-2 text-sm">
            <div class="border-l-2 border-emerald-500 pl-3">
              <code class="text-emerald-300 text-xs">loadCollectionStems()</code>
              <div class="text-gray-400 text-xs mt-1">
                Load entire collection across all locales, grouped by STEM
              </div>
            </div>
            <div class="border-l-2 border-blue-500 pl-3">
              <code class="text-blue-300 text-xs">loadCollectionData()</code>
              <div class="text-gray-400 text-xs mt-1">
                Simplified version - just return STEM data structure
              </div>
            </div>
            <div class="border-l-2 border-purple-500 pl-3">
              <code class="text-purple-300 text-xs">getCollectionCoverage()</code>
              <div class="text-gray-400 text-xs mt-1">
                Calculate translation coverage statistics
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="font-medium text-amber-400">
            Content Utilities
          </h3>
          <div class="space-y-2 text-sm">
            <div class="border-l-2 border-gray-500 pl-3">
              <code class="text-gray-300 text-xs">extractContentMetadata()</code>
              <div class="text-gray-400 text-xs mt-1">
                Extract STEM, collection, and locale info from content
              </div>
            </div>
            <div class="border-l-2 border-gray-500 pl-3">
              <code class="text-gray-300 text-xs">buildCollectionName()</code>
              <div class="text-gray-400 text-xs mt-1">
                Generate consistent collection names
              </div>
            </div>
            <div class="border-l-2 border-gray-500 pl-3">
              <code class="text-gray-300 text-xs">buildSelectFields()</code>
              <div class="text-gray-400 text-xs mt-1">
                Optimize queries with required field selection
              </div>
            </div>
            <div class="border-l-2 border-gray-500 pl-3">
              <code class="text-gray-300 text-xs">validateContentStructure()</code>
              <div class="text-gray-400 text-xs mt-1">
                Validate content for i18n compatibility
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Translation Coverage Showcase -->
    <UCard class="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-bar-chart-3"
            class="w-5 h-5 text-purple-400"
          />
          <span class="text-lg font-semibold text-white">Translation Coverage Analysis</span>
          <UBadge
            variant="soft"
            size="xs"
            color="purple"
          >
            getCollectionCoverage()
          </UBadge>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Coverage Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-gray-900/50 p-4 rounded text-center">
            <div class="text-2xl font-bold text-white">
              {{ coverage.total }}
            </div>
            <div class="text-xs text-gray-400">
              Total Content Items
            </div>
          </div>
          <div class="bg-emerald-900/50 p-4 rounded text-center">
            <div class="text-2xl font-bold text-emerald-400">
              {{ coverage.complete.length }}
            </div>
            <div class="text-xs text-gray-400">
              Fully Translated
            </div>
          </div>
          <div class="bg-amber-900/50 p-4 rounded text-center">
            <div class="text-2xl font-bold text-amber-400">
              {{ Object.keys(coverage.missing).length }}
            </div>
            <div class="text-xs text-gray-400">
              Partial Translations
            </div>
          </div>
          <div class="bg-blue-900/50 p-4 rounded text-center">
            <div class="text-2xl font-bold text-blue-400">
              {{ Math.round((coverage.complete.length / coverage.total) * 100) }}%
            </div>
            <div class="text-xs text-gray-400">
              Coverage Rate
            </div>
          </div>
        </div>

        <!-- Per-Locale Breakdown -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h3 class="font-medium text-purple-400">
              Per-Locale Coverage
            </h3>
            <div class="space-y-2">
              <div
                v-for="(count, locale) in coverage.coverage"
                :key="locale"
                class="flex justify-between items-center p-2 bg-gray-900/50 rounded"
              >
                <div class="flex items-center gap-2">
                  <UBadge
                    size="xs"
                    variant="soft"
                    color="primary"
                  >
                    {{ locale.toUpperCase() }}
                  </UBadge>
                  <span class="text-sm text-gray-300">{{ count }} items</span>
                </div>
                <div class="text-xs text-gray-400">
                  {{ Math.round((count / coverage.total) * 100) }}%
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="font-medium text-amber-400">
              Missing Translations
            </h3>
            <div class="max-h-32 overflow-y-auto space-y-1">
              <div
                v-for="(missingLocales, stem) in coverage.missing"
                :key="stem"
                class="flex justify-between items-center p-2 bg-amber-900/20 rounded text-xs"
              >
                <code class="text-amber-300">{{ stem }}</code>
                <div class="flex gap-1">
                  <UBadge
                    v-for="locale in missingLocales"
                    :key="locale"
                    size="xs"
                    color="warning"
                  >
                    {{ locale }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Implementation Example -->
        <div class="bg-gray-900 p-4 rounded">
          <div class="text-xs text-gray-400 mb-2">
            Implementation:
          </div>
          <code class="text-emerald-300 text-xs font-mono">
            const coverage = getCollectionCoverage(stems)<br>
            // Returns: { total, coverage: {locale: count}, missing: {stem: [locales]}, complete: [stems] }
          </code>
        </div>
      </div>
    </UCard>

    <!-- Performance & Debug Info -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <UCard class="text-center">
        <div class="text-lg font-bold text-purple-400">
          {{ debugInfo?.processedItems }}
        </div>
        <div class="text-xs text-gray-400">
          Items Processed
        </div>
      </UCard>
      <UCard class="text-center">
        <div class="text-lg font-bold text-blue-400">
          {{ debugInfo?.totalQueries }}
        </div>
        <div class="text-xs text-gray-400">
          Queries Executed
        </div>
      </UCard>
      <UCard class="text-center">
        <div class="text-lg font-bold text-emerald-400">
          {{ debugInfo?.loadTime }}ms
        </div>
        <div class="text-xs text-gray-400">
          Load Time
        </div>
      </UCard>
      <UCard class="text-center">
        <div class="text-lg font-bold text-amber-400">
          {{ debugInfo?.queriedCollections?.length }}
        </div>
        <div class="text-xs text-gray-400">
          Collections
        </div>
      </UCard>
    </div>

    <!-- The actual table - unchanged, much simpler data prep -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-white">
          STEM Translation Matrix
        </h2>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="py-2 text-left text-gray-400">
                STEM
              </th>
              <th class="py-2 text-left text-gray-400">
                EN
              </th>
              <th class="py-2 text-left text-gray-400">
                MR
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="stem in stemList"
              :key="stem"
              class="border-b border-gray-800/50"
            >
              <td class="py-2 font-mono text-gray-300">
                {{ stem }}
              </td>

              <td class="py-2">
                <div
                  v-if="findFor(stem, 'en')"
                  class="space-y-0.5"
                >
                  <NuxtLinkLocale
                    :to="`/data/${findFor(stem, 'en')!.slug}`"
                    locale="en"
                    class="text-primary-400 hover:underline"
                  >
                    /data/{{ findFor(stem, 'en')!.slug }}
                  </NuxtLinkLocale>
                  <div class="text-xs text-gray-500 truncate">
                    {{ findFor(stem, 'en')!.title || 'Untitled' }}
                  </div>
                </div>
                <span
                  v-else
                  class="text-gray-500"
                >—</span>
              </td>

              <td class="py-2">
                <div
                  v-if="findFor(stem, 'mr')"
                  class="space-y-0.5"
                >
                  <NuxtLinkLocale
                    :to="`/mr/mahiti/${findFor(stem, 'mr')!.slug}`"
                    locale="mr"
                    class="text-primary-400 hover:underline"
                  >
                    /mr/mahiti/{{ findFor(stem, 'mr')!.slug }}
                  </NuxtLinkLocale>
                  <div class="text-xs text-gray-500 truncate">
                    {{ findFor(stem, 'mr')!.title || 'Untitled' }}
                  </div>
                </div>
                <span
                  v-else
                  class="text-gray-500"
                >—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>
