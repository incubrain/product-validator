<!-- playground/pages/categories.vue -->
<script setup lang="ts">
import type { Collections } from '@nuxtjs/i18n'

const { locales } = useI18n()

type Cat = {
  id: string
  slug: string
  title?: string | Record<string, string>
  isPublic?: boolean
}

const stems = ref<Record<string, Record<string, { slug: string, title?: string }>>>({})

// Extract STEM from a document id: categories_<locale>/<filename>.md → <filename>.md
const stemFromId = (id: string, loc: string) => {
  const pA = `categories_${loc}/`
  return id.startsWith(pA) ? id.slice(pA.length) : id.split('/').pop() || id
}

// Load all categories for all locales and group by STEM
await Promise.all(
  locales.value.map(async (loc) => {
    const items = await queryCollection(`categories_${loc.code}` as keyof Collections)
      .where('isPublic', '=', true)
      .select('id', 'slug', 'title', 'isPublic')
      .all<Cat>()

    for (const item of items) {
      const stem = stemFromId(item.id, loc.code)
      if (!stems.value[stem]) stems.value[stem] = {}
      stems.value[stem][loc.code] = {
        slug: item.slug,
        // title can be plain string or i18n object; prefer current-locale title if object
        title: typeof item.title === 'object' ? item.title?.[loc.code] ?? item.title?.en : item.title,
      }
    }
  }),
)

// Stable, alpha-sorted list of stems
const stemList = computed(() => Object.keys(stems.value).sort((a, b) => a.localeCompare(b)))

// Helpers for specific locales (explicit EN/MR columns as requested)
const findFor = (stem: string, code: string) => stems.value[stem]?.[code]
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold text-white">
        Content by STEM
      </h1>
      <p class="text-gray-400 text-sm">
        Grouped by <strong>STEM</strong> (shared filename across locales). Click a slug to open that locale’s category page.
      </p>
    </header>

    <!-- Architecture: why STEM + standards -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-white">
          Architecture: STEM as the Identifier
        </h2>
      </template>

      <div class="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
        <div class="space-y-2">
          <h3 class="font-medium text-white">
            Why we do this
          </h3>
          <ul class="list-disc list-inside space-y-1">
            <li>Single source of truth for a piece of content across locales.</li>
            <li>Frictionless DX: <kbd>⌘+P</kbd> (vscode) or Content Studio <kbd>⌘+K</kbd> → same filename.</li>
            <li>No build-time slug maps; runtime matching is robust and portable.</li>
            <li>Only one conceptual “slug” per content item—the filename; per-locale routes stay free to differ.</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium text-white">
            Standards (follow these)
          </h3>
          <ul class="list-disc list-inside space-y-1">
            <li> Identical filenames across locales (<strong>STEM</strong> must match).</li>
            <li>Root content/locale directories (e.g., <code>content/en/</code>).</li>
            <li>Property <code>isPublic: true</code> required for content fetching.</li>
            <li>Content fetched by <code>slug + locale</code>; STEM used for cross-locale grouping.</li>
          </ul>
        </div>
      </div>
    </UCard>

    <!-- Table: STEM + EN/MR slugs -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-white">
          All Categories (by STEM)
        </h2>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="py-2 text-left text-gray-400">
                STEM (filename)
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
              <!-- STEM → also links to default-locale category if you want; here we just show the name -->
              <td class="py-2 font-mono text-gray-300">
                {{ stem }}
              </td>

              <!-- EN column -->
              <td class="py-2">
                <div
                  v-if="findFor(stem, 'en')"
                  class="space-y-0.5"
                >
                  <NuxtLinkLocale
                    :to="`/categories/${findFor(stem, 'en')!.slug}`"
                    locale="en"
                    class="text-primary-400 hover:underline"
                  >
                    /categories/{{ findFor(stem, 'en')!.slug }}
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

              <!-- MR column -->
              <td class="py-2">
                <div
                  v-if="findFor(stem, 'mr')"
                  class="space-y-0.5"
                >
                  <NuxtLinkLocale
                    :to="`/categories/${findFor(stem, 'mr')!.slug}`"
                    locale="mr"
                    class="text-primary-400 hover:underline"
                  >
                    /mr/categories/{{ findFor(stem, 'mr')!.slug }}
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
