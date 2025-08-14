<!-- playground/pages/index.vue -->
<script setup lang="ts">
useHead({ title: 'i18n Layer – Overview' })

/** Features: why this layer exists, and what to use */
const features = [
  {
    icon: 'i-lucide-rocket',
    title: 'Zero-guess DX',
    points: [
      'One composable for data + translations',
      'Filename STEM drives lookups',
      'Standards over config',
    ],
  },
  {
    icon: 'i-lucide-globe',
    title: 'i18n-first routing',
    points: [
      'Cross-locale params via paramMap',
      'Fetch only current-page translations',
      'Slug & category stay locale-correct',
    ],
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Safe by default',
    points: [
      'Status: "published" gates visibility',
      'Canonical category paths',
      'Lean queries with minimal fields',
    ],
  },
]

const buildingBlocks = [
  // Primary - Essential components everyone uses
  { kind: 'Component', name: 'ILanguageSwitcher', tier: 'primary' },
  { kind: 'Composable', name: 'useI18nContent', tier: 'primary' },

  // Secondary - Use when needed
  { kind: 'Composable', name: 'useI18nContentParams', tier: 'secondary' },
  { kind: 'Composable', name: 'useI18nContentSEO', tier: 'secondary' },
  { kind: 'Utility', name: 'useI18nFormatters', tier: 'secondary' },

  // Debug - Development tools
  { kind: 'Component', name: 'IDebugModal', tier: 'debug' },
  { kind: 'Composable', name: 'useI18nContentDebug', tier: 'debug' },
]

const getTierColor = (tier: string) => {
  const colors = {
    primary: 'success',
    secondary: 'secondary',
    debug: 'warning',
  }
  return colors[tier] || 'neutral'
}

const getTierLabel = (tier: string) => {
  const labels = {
    primary: 'Essential',
    secondary: 'Optional',
    debug: 'Debug',
  }
  return labels[tier] || tier
}

const standardsGroups = [
  {
    title: 'Content Resolution',
    bullets: [
      'Lookups resolve by STEM (filename), must be same across locales',
      'Root content/locale directories contain collections (content/en/blog)',
      'Locale-suffixed collections (en_blog, mr_blog)',
      '{singularItem}Id|Stem for collection linking (article.categoryStem)',
    ],
  },
  {
    title: 'Visibility',
    bullets: [
      'Set status: "published" for public docs',
    ],
  },
  {
    title: 'Localised Paths',
    bullets: [
      '{paramMap} for cross-locale param resolution',
      'Unique per-locale ASCII slug field used for routing',
    ],
  },
]

/** Language switcher demos */
const demoConfigs = [
  { label: 'Buttons (default)', code: '<ILanguageSwitcher />', props: { variant: 'buttons' } },
  { label: 'Dropdown + Flags', code: '<ILanguageSwitcher variant="dropdown" show-flags />', props: { variant: 'dropdown', showFlags: true } },
  { label: 'Minimal', code: '<ILanguageSwitcher variant="minimal" />', props: { variant: 'minimal' } },
]

/** Core props table (short, keyword-level content only) */
const propsCore = [
  { name: 'variant', type: `'buttons' | 'dropdown' | 'minimal'`, def: `'buttons'`, desc: 'Choose layout' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`, def: `'md'`, desc: 'Control footprint' },
  { name: 'showFlags', type: 'boolean', def: 'false', desc: 'Show flag icons' },
  { name: 'smart', type: 'boolean', def: 'false', desc: 'Auto-detect + remember' },
  { name: 'preserveRoute', type: 'boolean', def: 'true', desc: 'Stay on page when switching' },
  { name: 'ui', type: 'object', def: '{}', desc: 'Styling overrides' },
]

// Debug panel info
const debugFeatures = [
  'Real-time i18n system monitoring',
  'Content & translation status tracking',
  'Parameter resolution debugging',
  'SEO metadata inspection',
  'Performance metrics',
]

// Add to index.vue script section
const directoryStructure = [
  {
    label: 'content/',
    value: 'content',
    icon: 'i-lucide-folder',
    defaultExpanded: true,
    children: [
      {
        label: 'en/',
        value: 'en',
        icon: 'i-lucide-folder',
        defaultExpanded: true,
        children: [
          {
            label: 'blog/',
            value: 'blog-en',
            icon: 'i-lucide-folder',
            defaultExpanded: true,
            children: [
              {
                label: 'post.md',
                icon: 'i-lucide-file-text',
                class: 'text-emerald-300',
              },
            ],
          },
          {
            label: 'categories/',
            value: 'categories-en',
            icon: 'i-lucide-folder',
            defaultExpanded: true,
            children: [
              {
                label: 'technology.yml',
                icon: 'i-lucide-database',
                class: 'text-blue-300',
              },
            ],
          },
          {
            label: 'pages/',
            value: 'pages-en',
            icon: 'i-lucide-folder',
            children: [
              {
                label: 'about.yml',
                icon: 'i-lucide-file',
                class: 'text-purple-300',
              },
            ],
          },
        ],
      },
      {
        label: 'mr/',
        value: 'mr',
        icon: 'i-lucide-folder',
        defaultExpanded: true,
        children: [
          {
            label: 'blog/',
            value: 'blog-mr',
            icon: 'i-lucide-folder',
            defaultExpanded: true,
            children: [
              {
                label: 'post.md',
                icon: 'i-lucide-file-text',
                class: 'text-emerald-300',
              },
            ],
          },
          {
            label: 'categories/',
            value: 'categories-mr',
            icon: 'i-lucide-folder',
            defaultExpanded: true,
            children: [
              {
                label: 'technology.yml',
                icon: 'i-lucide-database',
                class: 'text-blue-300',
              },
            ],
          },
          {
            label: 'pages/',
            value: 'pages-mr',
            icon: 'i-lucide-folder',
            children: [
              {
                label: 'about.yml',
                icon: 'i-lucide-file',
                class: 'text-purple-300',
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="space-y-10">
    <!-- Hero -->
    <section class="text-center space-y-2">
      <h1 class="text-4xl font-bold text-white">
        i18n Layer
      </h1>
      <p class="text-gray-300">
        Production-ready i18n for Nuxt. Clear rules, fast DX.
      </p>
    </section>

    <!-- Features -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          Features
        </h2>
        <p class="text-gray-400 text-sm">
          Why this exists and what you'll use
        </p>
      </template>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="f in features"
          :key="f.title"
          class="space-y-3"
        >
          <div class="flex items-center gap-2">
            <UIcon
              :name="f.icon"
              class="w-5 h-5 text-primary-400"
            />
            <h3 class="font-medium text-white">
              {{ f.title }}
            </h3>
          </div>
          <ul class="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li
              v-for="p in f.points"
              :key="p"
            >
              {{ p }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 border-t border-gray-800 pt-6">
        <h3 class="text-sm font-semibold text-white mb-4">
          Building Blocks
        </h3>

        <!-- Grouped by tier -->
        <div class="space-y-4">
          <div
            v-for="tier in ['primary', 'secondary', 'debug']"
            :key="tier"
          >
            <div class="flex items-center gap-2 mb-3">
              <UBadge
                :color="getTierColor(tier)"
                size="xs"
                variant="soft"
              >
                {{ getTierLabel(tier) }}
              </UBadge>
              <span class="text-xs text-gray-500">
                {{ tier === 'primary' ? 'Core components used in every project'
                  : tier === 'secondary' ? 'Optional utilities for specific needs'
                    : 'Development and debugging tools' }}
              </span>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="b in buildingBlocks.filter(block => block.tier === tier)"
                :key="b.name"
                class="text-sm text-gray-300 flex items-center gap-2"
              >
                <UBadge
                  variant="soft"
                  size="xs"
                  :color="getTierColor(b.tier)"
                >
                  {{ b.kind }}
                </UBadge>
                <span class="text-white">{{ b.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Debug Panel Feature -->
    <UCard class="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-700/50">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-500/20 rounded-lg">
            <UIcon
              name="i-lucide-bug"
              class="w-5 h-5 text-purple-400"
            />
          </div>
          <div>
            <h3 class="font-semibold text-white">
              Real-time Debug Panel
            </h3>
            <p class="text-sm text-gray-400">
              Professional i18n debugging tools for developers
            </p>
          </div>
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium text-purple-300">
              Features
            </h4>
            <ul class="text-sm space-y-2">
              <li
                v-for="feature in debugFeatures"
                :key="feature"
                class="flex items-center gap-2"
              >
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-4 h-4 text-purple-400 flex-shrink-0"
                />
                <span class="text-gray-300">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h4 class="font-medium text-purple-300">
              How to Access
            </h4>
            <div class="bg-gray-900/50 p-4 rounded-lg space-y-2">
              <div class="flex items-center gap-2 text-sm">
                <UKbd size="xs">
                  ⌘
                </UKbd>
                <UKbd size="xs">
                  ⇧
                </UKbd>
                <UKbd size="xs">
                  D
                </UKbd>
                <span class="text-gray-300">Toggle debug modal</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <UKbd size="xs">
                  ⌘
                </UKbd>
                <UKbd size="xs">
                  ⇧
                </UKbd>
                <UKbd size="xs">
                  L
                </UKbd>
                <span class="text-gray-300">Cycle languages</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <UKbd size="xs">
                  Esc
                </UKbd>
                <span class="text-gray-300">Close modal</span>
              </div>
            </div>

            <div class="text-xs text-purple-200">
              <strong>Dev Mode:</strong> Debug button appears in navigation automatically
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Smart URL Canonicalization Feature - Enhanced Layout -->
    <UCard class="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border-emerald-700/50">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-emerald-500/20 rounded-lg">
            <UIcon
              name="i-lucide-link"
              class="w-5 h-5 text-emerald-400"
            />
          </div>
          <div>
            <h3 class="font-semibold text-white">
              Smart URL Canonicalization
            </h3>
            <p class="text-sm text-gray-400">
              SEO-optimized automatic URL correction
            </p>
          </div>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Flow Demonstration -->
        <div class="flex md:flex-row gap-4">
          <div class="bg-gray-900/50 p-4 rounded-lg">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-red-400 rounded-full" />
                <span class="text-xs text-gray-400 font-medium">User visits wrong URL</span>
              </div>
              <code class="text-red-300 text-sm block">/blog/wrong-category/post</code>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="flex items-center gap-2 text-emerald-400">
              <UIcon
                name="i-lucide-arrow-right"
                class="w-4 h-4"
              />
              <span class="text-xs font-medium">301 Redirect</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-4 h-4"
              />
            </div>
          </div>

          <div class="bg-gray-900/50 p-4 rounded-lg">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full" />
                <span class="text-xs text-gray-400 font-medium">Canonical URL</span>
              </div>
              <code class="text-emerald-300 text-sm block">/blog/technology/post</code>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium text-emerald-300 mb-3">
              SEO Benefits
            </h4>
            <ul class="text-sm space-y-2">
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-4 h-4 text-emerald-400 flex-shrink-0"
                />
                <span class="text-gray-300">Prevents duplicate content SEO penalties</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-4 h-4 text-emerald-400 flex-shrink-0"
                />
                <span class="text-gray-300">Consolidates link equity to canonical URLs</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-4 h-4 text-emerald-400 flex-shrink-0"
                />
                <span class="text-gray-300">Works automatically across all content types</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium text-blue-300 mb-3">
              How It Works
            </h4>
            <ul class="text-sm space-y-2 text-gray-300">
              <li>• System analyzes content metadata</li>
              <li>• Compares with current URL structure</li>
              <li>• Issues 301 redirect if mismatch found</li>
              <li>• Preserves query parameters and fragments</li>
            </ul>
          </div>
        </div>

        <div class="pt-2">
          <NuxtLinkLocale :to="`/blog/wrong-category/${$i18n.locale === 'en' ? 'post' : 'poosta'}`">
            <UButton
              size="sm"
              variant="outline"
              color="emerald"
            >
              Try Demo →
            </UButton>
          </NuxtLinkLocale>
        </div>
      </div>
    </UCard>

    <!-- Replace the Standards section in index.vue -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          Standards & Best Practices
        </h2>
        <p class="text-gray-400 text-sm">
          Essential rules for reliable i18n content management
        </p>
      </template>

      <div class="space-y-8">
        <!-- File Structure -->
        <!-- Replace the File Structure section in index.vue -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <UIcon
              name="i-lucide-folder-tree"
              class="w-5 h-5 text-blue-400"
            />
            <h3 class="font-medium text-white text-lg">
              File Structure
            </h3>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium text-blue-300">
                Required Directory Structure
              </h4>
              <UTree
                :items="directoryStructure"
                :default-expanded="['content', 'en', 'mr', 'blog-en', 'blog-mr', 'categories-en', 'categories-mr']"
                size="sm"
                color="neutral"
              />
            </div>

            <div class="space-y-4">
              <h4 class="font-medium text-emerald-300">
                Collection Naming Rules
              </h4>
              <ul class="space-y-3 text-sm">
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div class="text-white font-medium">
                      Collections: locale_collection
                    </div>
                    <div class="text-gray-400">
                      en_blog, mr_blog, en_categories
                    </div>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div class="text-white font-medium">
                      Identical filenames = STEM matching
                    </div>
                    <div class="text-gray-400">
                      post.md in both en/blog/ and mr/blog/
                    </div>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div class="text-white font-medium">
                      Directory mirrors locale structure
                    </div>
                    <div class="text-gray-400">
                      content/en/blog/ → en_blog collection
                    </div>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div class="text-white font-medium">
                      File extensions indicate type
                    </div>
                    <div class="text-gray-400">
                      .md = pages, .yml = data collections
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Content Schema -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <UIcon
              name="i-lucide-database"
              class="w-5 h-5 text-purple-400"
            />
            <h3 class="font-medium text-white text-lg">
              Content Schema
            </h3>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium text-purple-300">
                Required Fields
              </h4>
              <div class="space-y-3">
                <div class="bg-gray-900/50 p-3 rounded border-l-4 border-red-500">
                  <div class="flex items-center gap-2 mb-1">
                    <code class="text-red-300 text-sm">status</code>
                    <UBadge
                      color="error"
                      size="xs"
                    >
                      Required
                    </UBadge>
                  </div>
                  <div class="text-xs text-gray-400">
                    Must be "published" for public content
                  </div>
                </div>

                <div class="bg-gray-900/50 p-3 rounded border-l-4 border-blue-500">
                  <div class="flex items-center gap-2 mb-1">
                    <code class="text-blue-300 text-sm">slug</code>
                    <UBadge
                      color="primary"
                      size="xs"
                    >
                      Required
                    </UBadge>
                  </div>
                  <div class="text-xs text-gray-400">
                    Unique ASCII identifier for URL routing
                  </div>
                </div>

                <div class="bg-gray-900/50 p-3 rounded border-l-4 border-emerald-500">
                  <div class="flex items-center gap-2 mb-1">
                    <code class="text-emerald-300 text-sm">title</code>
                    <UBadge
                      color="success"
                      size="xs"
                    >
                      Required
                    </UBadge>
                  </div>
                  <div class="text-xs text-gray-400">
                    Content title for display and SEO
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="font-medium text-amber-300">
                Linking Fields
              </h4>
              <div class="space-y-3">
                <div class="bg-gray-900/50 p-3 rounded border-l-4 border-amber-500">
                  <div class="flex items-center gap-2 mb-1">
                    <code class="text-amber-300 text-sm">categoryStem</code>
                    <UBadge
                      color="warning"
                      size="xs"
                    >
                      Linking
                    </UBadge>
                  </div>
                  <div class="text-xs text-gray-400">
                    Links to categories collection via STEM
                  </div>
                </div>

                <div class="bg-gray-900/50 p-3 rounded border-l-4 border-cyan-500">
                  <div class="flex items-center gap-2 mb-1">
                    <code class="text-cyan-300 text-sm">authorId</code>
                    <UBadge
                      color="info"
                      size="xs"
                    >
                      Optional
                    </UBadge>
                  </div>
                  <div class="text-xs text-gray-400">
                    Links to authors collection
                  </div>
                </div>

                <div class="bg-gray-900/50 p-3 rounded border-l-4 border-gray-500">
                  <div class="flex items-center gap-2 mb-1">
                    <code class="text-gray-300 text-sm">tags</code>
                    <UBadge
                      color="neutral"
                      size="xs"
                    >
                      Optional
                    </UBadge>
                  </div>
                  <div class="text-xs text-gray-400">
                    Array of tag STEMs for categorization
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- URL Mapping -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <UIcon
              name="i-lucide-route"
              class="w-5 h-5 text-emerald-400"
            />
            <h3 class="font-medium text-white text-lg">
              URL Mapping & Parameters
            </h3>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium text-emerald-300">
                Parameter Resolution
              </h4>
              <div class="bg-gray-900 p-4 rounded-lg">
                <div class="text-xs text-gray-500 mb-2">
                  Example paramMap configuration:
                </div>
                <pre class="text-sm text-gray-300"><code>{
  slug: 'slug',
  category: {
    field: 'categoryStem',
    collection: 'categories',
    targetField: 'slug'
  }
}</code></pre>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-3 h-3 text-emerald-400"
                  />
                  <span class="text-gray-300">Resolves category STEM to localized slug</span>
                </div>
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-3 h-3 text-emerald-400"
                  />
                  <span class="text-gray-300">Enables seamless language switching</span>
                </div>
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-3 h-3 text-emerald-400"
                  />
                  <span class="text-gray-300">Maintains URL structure across locales</span>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="font-medium text-cyan-300">
                Cross-Locale URL Examples
              </h4>
              <div class="space-y-3">
                <div class="bg-gray-900/50 p-3 rounded">
                  <div class="text-xs text-gray-500 mb-1">
                    English:
                  </div>
                  <code class="text-emerald-300 text-sm">/blog/technology/ai-guide</code>
                </div>
                <div class="flex justify-center">
                  <UIcon
                    name="i-lucide-arrow-down"
                    class="w-4 h-4 text-gray-500"
                  />
                </div>
                <div class="bg-gray-900/50 p-3 rounded">
                  <div class="text-xs text-gray-500 mb-1">
                    Marathi:
                  </div>
                  <code class="text-cyan-300 text-sm">/mr/blooga/tantrajnaana/ai-margadarshak</code>
                </div>
              </div>

              <div class="text-xs text-gray-400 bg-cyan-900/20 p-2 rounded">
                <strong>Note:</strong> Same STEM "ai-guide" resolves to different slugs per locale
              </div>
            </div>
          </div>
        </div>

        <!-- Common Pitfalls -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <UIcon
              name="i-lucide-alert-triangle"
              class="w-5 h-5 text-red-400"
            />
            <h3 class="font-medium text-white text-lg">
              Common Pitfalls
            </h3>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <UIcon
                  name="i-lucide-x-circle"
                  class="w-4 h-4 text-red-400"
                />
                <span class="font-medium text-red-300">Don't Do</span>
              </div>
              <ul class="text-sm space-y-1 text-red-200">
                <li>• Different filenames across locales</li>
                <li>• Missing status: "published" field</li>
                <li>• Non-ASCII characters in slugs</li>
                <li>• Inconsistent collection naming</li>
              </ul>
            </div>

            <div class="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-4 h-4 text-emerald-400"
                />
                <span class="font-medium text-emerald-300">Best Practice</span>
              </div>
              <ul class="text-sm space-y-1 text-emerald-200">
                <li>• Use identical STEMs across locales</li>
                <li>• Always set status: "published"</li>
                <li>• Use kebab-case for slugs</li>
                <li>• Follow locale_collection naming</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Demos -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          Language Switcher
        </h2>
        <p class="text-gray-400 text-sm">
          Three common configurations
        </p>
      </template>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="d in demoConfigs"
          :key="d.label"
          class="space-y-3"
        >
          <h3 class="font-medium text-white">
            {{ d.label }}
          </h3>
          <div class="flex justify-center p-4 bg-gray-900/50 rounded border border-gray-800">
            <ILanguageSwitcher v-bind="d.props" />
          </div>
          <pre class="bg-gray-900 p-3 rounded text-xs text-gray-300 overflow-x-auto"><code>{{ d.code }}</code></pre>
        </div>
      </div>
    </UCard>

    <!-- Props -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-white">
          Core Props
        </h2>
      </template>

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
            <tr
              v-for="p in propsCore"
              :key="p.name"
              class="border-b border-gray-800/50"
            >
              <td class="py-2">
                <code class="bg-gray-800 px-2 py-0.5 rounded text-primary-400">{{ p.name }}</code>
              </td>
              <td class="py-2">
                <code class="text-green-400">{{ p.type }}</code>
              </td>
              <td class="py-2">
                <code class="text-gray-400">{{ p.def }}</code>
              </td>
              <td class="py-2 text-gray-300">
                {{ p.desc }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>
