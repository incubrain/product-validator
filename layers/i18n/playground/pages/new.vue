<!-- playground/pages/index.vue -->
<script setup lang="ts">
useHead({ title: 'i18n Content Layer — Overview' })
</script>

<template>
  <div class="space-y-10">
    <!-- Hero -->
    <section class="space-y-3">
      <h1 class="text-3xl font-bold text-white">
        i18n Content Layer
      </h1>
      <p class="text-gray-400">
        Minimal, production-ready pattern for Nuxt + i18n + Nuxt Content.
        One composable handles fetch, translations, SEO, and cross-locale params.
      </p>
    </section>

    <!-- How it works -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          How it works
        </h2>
      </template>
      <ol class="list-decimal list-inside text-sm text-gray-300 space-y-1">
        <li>URL provides <code>[slug]</code> (and optional <code>[category]</code>).</li>
        <li><code>useI18nContent({ collection })</code> loads current-locale doc by <code>slug</code> if <code>isPublic</code>.</li>
        <li>Translations are discovered by identical filenames across locales.</li>
        <li>SEO hreflang + cross-locale param mapping are set automatically.</li>
      </ol>
      <div class="mt-4 bg-gray-900 p-3 rounded">
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>const { content, translations } = useI18nContent({
  collection: 'blog',
  autoSEO: true,
  autoI18nParams: true
})</code></pre>
      </div>
    </UCard>

    <!-- Features -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          Features
        </h2>
      </template>
      <ul class="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
        <li>✔ Filename-anchored translation discovery (no build-time slug maps)</li>
        <li>✔ <code>isPublic</code> gating prevents accidental leaks</li>
        <li>✔ Function-keyed caching per <code>(locale, slug)</code> (no stale bleed)</li>
        <li>✔ Category is a URL concern; canonicalized from <code>content.categorySlug</code></li>
        <li>✔ Auto i18n params for instant, correct language switching</li>
        <li>✔ SEO via <code>useLocaleHead</code> + enriched meta</li>
      </ul>
    </UCard>

    <!-- Standards (do these or it breaks) -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          Standards
        </h2>
      </template>
      <ul class="text-sm text-gray-300 space-y-1">
        <li>• **Identical filenames** across locales (e.g., <code>blog_en/ai-revolution.md</code>, <code>blog_mr/ai-revolution.md</code>).</li>
        <li>• Documents must set <code>isPublic: true</code> to be fetchable.</li>
        <li>• Fetch is by <code>slug + locale</code>; **do not** key fetches by category.</li>
        <li>• If using category in URLs, ensure content has <code>categorySlug</code> for canonicalization.</li>
        <li>• Collections live in per-locale dirs (e.g., <code>en/</code>, <code>mr/</code>) for categories/pages.</li>
        <li>• Avoid calling composables in watchers; keep side-effects inside watchers only.</li>
      </ul>
    </UCard>

    <!-- ILanguageSwitcher: live + props -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          ILanguageSwitcher
        </h2>
      </template>

      <!-- Live demo -->
      <div class="flex justify-center mb-4">
        <ILanguageSwitcher
          variant="buttons"
          show-flags
          size="sm"
        />
      </div>

      <!-- Quick usage -->
      <div class="bg-gray-900 p-3 rounded mb-4">
        <pre class="text-xs text-gray-300 overflow-x-auto"><code>&lt;ILanguageSwitcher variant="dropdown" show-flags smart size="sm" /&gt;</code></pre>
      </div>

      <!-- Props table (concise) -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="py-2 text-left text-white">
                Prop
              </th>
              <th class="py-2 text-left text-white">
                Type
              </th>
              <th class="py-2 text-left text-white">
                Default
              </th>
              <th class="py-2 text-left text-white">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-800/50">
              <td><code>variant</code></td>
              <td><code>'buttons' | 'dropdown' | 'minimal' | 'custom'</code></td>
              <td><code>'buttons'</code></td>
              <td>Choose UI style; <code>custom</code> exposes a slot API.</td>
            </tr>
            <tr class="border-b border-gray-800/50">
              <td><code>size</code></td>
              <td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
              <td><code>'md'</code></td>
              <td>Control footprint.</td>
            </tr>
            <tr class="border-b border-gray-800/50">
              <td><code>show-flags</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Requires <code>icon</code> on each locale.</td>
            </tr>
            <tr class="border-b border-gray-800/50">
              <td><code>smart</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Auto-detect + remember + preserve scroll.</td>
            </tr>
            <tr class="border-b border-gray-800/50">
              <td><code>preserve-route</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Stay on current page when switching.</td>
            </tr>
            <tr class="border-b border-gray-800/50">
              <td><code>store-choice</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Persist preferred language in cookie.</td>
            </tr>
            <tr>
              <td><code>ui</code></td>
              <td><code>object</code></td>
              <td><code>{}</code></td>
              <td>UI overrides (class tokens).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>
