<!-- playground/pages/index.vue - Clean Documentation -->
<script setup lang="ts">
const formatters = useI18nFormatters()
const { switchLocaleWithAnalytics } = useI18nEnhanced()

// Props documentation
const languageSwitcherProps = [
  {
    name: 'variant',
    type: '\'buttons\' | \'dropdown\' | \'minimal\'',
    default: '\'buttons\'',
    description: 'Visual style of the language switcher',
  },
  {
    name: 'size',
    type: '\'xs\' | \'sm\' | \'md\' | \'lg\' | \'xl\'',
    default: '\'md\'',
    description: 'Size of buttons and icons',
  },
  {
    name: 'showFlags',
    type: 'boolean',
    default: 'false',
    description: 'Display flag icons (requires icon in locale config)',
  },
  {
    name: 'autoDetect',
    type: 'boolean',
    default: 'false',
    description: 'Auto-detect browser language on first visit',
  },
  {
    name: 'preserveRoute',
    type: 'boolean',
    default: 'true',
    description: 'Keep current page when switching languages',
  },
  {
    name: 'storeChoice',
    type: 'boolean',
    default: 'false',
    description: 'Remember language choice in cookie',
  },
  {
    name: 'trackAnalytics',
    type: 'boolean',
    default: 'false',
    description: 'Log language switches to console',
  },
  {
    name: 'preserveScroll',
    type: 'boolean',
    default: 'true',
    description: 'Maintain scroll position when switching',
  },
  {
    name: 'ui',
    type: 'object',
    default: '{}',
    description: 'Override component styling',
  },
]

// Benefits data
const benefits = [
  {
    icon: 'i-lucide-rocket',
    title: 'Zero Setup',
    description: 'Works out of the box with no configuration required',
  },
  {
    icon: 'i-lucide-flag',
    title: 'Flag Support',
    description: 'Beautiful flag icons with circle-flags integration',
  },
  {
    icon: 'i-lucide-globe',
    title: 'Smart Detection',
    description: 'Auto-detect user language from browser preferences',
  },
  {
    icon: 'i-lucide-archive',
    title: 'Remember Choice',
    description: 'Persist user language preference across sessions',
  },
  {
    icon: 'i-lucide-pointer',
    title: 'Mobile Ready',
    description: 'Touch-friendly with multiple size variants',
  },
  {
    icon: 'i-lucide-paintbrush',
    title: 'Fully Customizable',
    description: 'Override any styling with UI props system',
  },
]

// Enhanced variants with all options
const allVariants = [
  {
    name: 'Buttons (Basic)',
    variant: 'buttons',
    props: { variant: 'buttons' },
    description: 'Classic button group layout',
  },
  {
    name: 'Buttons with Flags',
    variant: 'buttons',
    props: { variant: 'buttons', showFlags: true },
    description: 'Buttons with flag icons',
  },
  {
    name: 'Dropdown',
    variant: 'dropdown',
    props: { variant: 'dropdown' },
    description: 'Space-saving dropdown selector',
  },
  {
    name: 'Dropdown with Flags',
    variant: 'dropdown',
    props: { variant: 'dropdown', showFlags: true },
    description: 'Dropdown with flag in trigger',
  },
  {
    name: 'Minimal',
    variant: 'minimal',
    props: { variant: 'minimal' },
    description: 'Compact language codes only',
  },
  {
    name: 'Minimal with Flags',
    variant: 'minimal',
    props: { variant: 'minimal', showFlags: true },
    description: 'Small flag icons only',
  },
  {
    name: 'Auto-Detect + Store',
    variant: 'buttons',
    props: { variant: 'buttons', autoDetect: true, storeChoice: true },
    description: 'Smart detection with persistence',
  },
  {
    name: 'All Features',
    variant: 'dropdown',
    props: {
      variant: 'dropdown',
      showFlags: true,
      autoDetect: true,
      storeChoice: true,
      trackAnalytics: true,
    },
    description: 'Every feature enabled',
  },
]

// Content examples
const contentExamples = [
  { name: 'Blog Posts', path: '/blog/ai-revolution', complexity: 'Complex (cross-language slugs)' },
  { name: 'Categories', path: '/categories/ai-automation', complexity: 'Medium (i18n fields)' },
  { name: 'Pages', path: '/pages/about', complexity: 'Simple (structured content)' },
]

// Architecture decisions
const architectureDecisions = [
  {
    decision: 'Self-contained components over theme integration',
    rationale: 'Portability and zero-dependency approach',
    impact: 'Works in any project structure',
  },
  {
    decision: 'Composable-first data fetching',
    rationale: 'Separation of concerns and reusability',
    impact: 'More flexible than component-based approach',
  },
  {
    decision: 'Dual content strategy support',
    rationale: 'Handle both simple and complex content needs',
    impact: 'Backward compatible with existing patterns',
  },
  {
    decision: 'Build-time slug mapping rejected',
    rationale: 'Single point of failure and edge case complexity',
    impact: 'Runtime approach preferred for reliability',
  },
]

// Quick stats
const stats = {
  components: 1,
  composables: 3,
  variants: 3,
  languages: 2,
}

// Test data for formatters
const testData = {
  price: 2999.99,
  currentDate: new Date(),
  largeNumber: 12345.67,
  fruits: ['Apple', 'Banana', 'Orange'],
}

async function testLanguageSwitch(locale: string) {
  try {
    await switchLocaleWithAnalytics(locale)
  } catch (error) {
    console.error('Language switch failed:', error)
  }
}

useHead({
  title: 'i18n Layer Documentation | Features & Examples',
})
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center space-y-6">
      <div class="space-y-3">
        <UBadge
          variant="soft"
          color="primary"
          size="lg"
        >
          Enterprise i18n Layer
        </UBadge>
        <h1 class="text-4xl font-bold text-white">
          {{ $t('layer.name') }}
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Production-ready internationalization for Nuxt applications with smart content handling
        </p>
      </div>

      <!-- Quick Demo -->
      <div class="flex justify-center">
        <ILanguageSwitcher
          variant="buttons"
          show-flags
        />
      </div>
    </div>

    <!-- Benefits Section -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          Key Benefits
        </h2>
        <p class="text-gray-400 mt-1">
          Why choose this i18n layer for your project
        </p>
      </template>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="flex items-start gap-3"
        >
          <div class="p-2 bg-primary-500/10 rounded-lg flex">
            <UIcon
              :name="benefit.icon"
              class="w-5 h-5 text-primary-400"
            />
          </div>
          <div>
            <h3 class="font-medium text-white">
              {{ benefit.title }}
            </h3>
            <p class="text-sm text-gray-400 mt-1">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Props Documentation -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          Component Props
        </h2>
        <p class="text-gray-400 mt-1">
          ILanguageSwitcher configuration options
        </p>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left py-2 font-medium text-white">
                Prop
              </th>
              <th class="text-left py-2 font-medium text-white">
                Type
              </th>
              <th class="text-left py-2 font-medium text-white">
                Default
              </th>
              <th class="text-left py-2 font-medium text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prop in languageSwitcherProps"
              :key="prop.name"
              class="border-b border-gray-800/50"
            >
              <td class="py-2">
                <code class="text-primary-400 bg-gray-800 px-2 py-1 rounded text-xs">
                  {{ prop.name }}
                </code>
              </td>
              <td class="py-2">
                <code class="text-green-400 text-xs">{{ prop.type }}</code>
              </td>
              <td class="py-2">
                <code class="text-gray-400 text-xs">{{ prop.default }}</code>
              </td>
              <td class="py-2 text-gray-300">
                {{ prop.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- All Variants Demo -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          All Variants & Examples
        </h2>
        <p class="text-gray-400 mt-1">
          Every configuration option in action
        </p>
      </template>

      <div class="grid lg:grid-cols-2 gap-6">
        <div
          v-for="example in allVariants"
          :key="example.name"
          class="p-4 bg-gray-800/30 rounded-lg"
        >
          <div class="space-y-3">
            <div>
              <h3 class="font-medium text-white">
                {{ example.name }}
              </h3>
              <p class="text-sm text-gray-400">
                {{ example.description }}
              </p>
            </div>

            <!-- Live Component -->
            <div class="flex justify-center p-4 bg-gray-900/50 rounded border border-default">
              <ILanguageSwitcher
                v-bind="example.props"
                size="sm"
                preserve-scroll
              />
            </div>

            <!-- Code Example -->
            <details class="group">
              <summary class="cursor-pointer text-xs text-primary-400 hover:text-primary-300">
                Show Code
              </summary>
              <pre class="mt-2 text-xs bg-gray-900 p-3 rounded overflow-x-auto text-gray-300">{{ `<ILanguageSwitcher${Object.entries(example.props).map(([key, value]) =>
                typeof value === 'boolean' && value ? ` ${key}`
                : typeof value === 'string' ? ` ${key}="${value}"` : '',
              ).join('')} />` }}</pre>
            </details>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Custom Variant Demo -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          Custom Variant (Slot)
        </h2>
        <p class="text-gray-400 mt-1">
          Shows a dropdown that expands to content width (no truncation)
        </p>
      </template>

      <div class="flex justify-center">
        <ILanguageSwitcher
          v-slot="{ currentLocale, locales, switchLocale, switching }"
          variant="custom"
          show-flags
          auto-detect
          store-choice
          track-analytics
        >
          <USelect
            :items="[locales.map(l => ({
              label: l.name,
              icon: l.icon,
              onSelect: () => switchLocale(l.code),
            }))]"
            :ui="{ content: 'min-w-max w-auto', item: { label: 'whitespace-nowrap' } }"
          >
            <UButton
              :disabled="switching"
              variant="soft"
              class="min-w-[168px] justify-between"
              :trailing-icon="currentLocale?.icon"
            >
              {{ currentLocale?.name || 'Select language' }}
            </UButton>
          </USelect>
        </ILanguageSwitcher>
      </div>
    </UCard>

    <!-- Usage Examples -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          Usage Examples
        </h2>
        <p class="text-gray-400 mt-1">
          Common implementation patterns
        </p>
      </template>

      <div class="space-y-6">
        <!-- Basic Usage -->
        <div>
          <h3 class="font-medium text-white mb-2">
            Basic Usage
          </h3>
          <div class="bg-gray-900 p-4 rounded">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>&lt;!-- Simple language switcher --&gt;
&lt;ILanguageSwitcher /&gt;

&lt;!-- With specific variant --&gt;
&lt;ILanguageSwitcher variant="dropdown" /&gt;

&lt;!-- With flags (requires icon in nuxt.config) --&gt;
&lt;ILanguageSwitcher show-flags /&gt;</code></pre>
          </div>
        </div>

        <!-- Advanced Usage -->
        <div>
          <h3 class="font-medium text-white mb-2">
            Advanced Features
          </h3>
          <div class="bg-gray-900 p-4 rounded">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>&lt;!-- Smart detection + persistence --&gt;
&lt;ILanguageSwitcher
  auto-detect
  store-choice
/&gt;

&lt;!-- All features enabled --&gt;
&lt;ILanguageSwitcher
  variant="dropdown"
  show-flags
  auto-detect
  store-choice
  track-analytics
/&gt;</code></pre>
          </div>
        </div>

        <!-- Custom Styling -->
        <div>
          <h3 class="font-medium text-white mb-2">
            Custom Styling
          </h3>
          <div class="bg-gray-900 p-4 rounded">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>&lt;!-- Custom UI overrides --&gt;
&lt;ILanguageSwitcher
  :ui="{
    root: 'bg-blue-500/10 backdrop-blur rounded-lg p-1',
    button: { root: 'hover:bg-blue-500/20' }
  }"
/&gt;</code></pre>
          </div>
        </div>

        <!-- Nuxt Config -->
        <div>
          <h3 class="font-medium text-white mb-2">
            Nuxt Configuration (with Icons)
          </h3>
          <div class="bg-gray-900 p-4 rounded">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>// nuxt.config.ts
export default defineNuxtConfig({
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        icon: 'i-circle-flags-us'  // Flag icon
      },
      {
        code: 'mr',
        name: 'मराठी',
        icon: 'i-circle-flags-in'  // India flag
      }
    ]
  }
})</code></pre>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Live Formatter Demo -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          Locale-Aware Formatters
        </h2>
        <p class="text-gray-400 mt-1">
          Automatic formatting that adapts to current language
        </p>
      </template>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h3 class="font-medium text-white">
            Live Formatting Examples
          </h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-gray-400">Currency (INR):</span>
              <code class="px-2 py-1 bg-gray-800 rounded text-primary-400">
                {{ formatters.currency(testData.price, 'INR') }}
              </code>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-400">Number:</span>
              <code class="px-2 py-1 bg-gray-800 rounded text-primary-400">
                {{ formatters.number(testData.largeNumber) }}
              </code>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-400">Date:</span>
              <code class="px-2 py-1 bg-gray-800 rounded text-primary-400">
                {{ formatters.date(testData.currentDate, { dateStyle: 'short' }) }}
              </code>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-400">List:</span>
              <code class="px-2 py-1 bg-gray-800 rounded text-primary-400">
                {{ formatters.list(testData.fruits) }}
              </code>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="font-medium text-white">
            Usage
          </h3>
          <div class="bg-gray-900 p-4 rounded">
            <pre class="text-xs text-gray-300 overflow-x-auto"><code>const formatters = useI18nFormatters()

// Format currency
formatters.currency(2999.99, 'INR')

// Format numbers
formatters.number(12345.67)

// Format dates
formatters.date(new Date(), {
  dateStyle: 'short'
})

// Format lists
formatters.list(['A', 'B', 'C'])</code></pre>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Content Examples -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          Content Integration Examples
        </h2>
        <p class="text-gray-400 mt-1">
          Test different content types with cross-language support
        </p>
      </template>

      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="example in contentExamples"
          :key="example.name"
          class="p-4 bg-gray-800/30 rounded-lg"
        >
          <h3 class="font-medium text-white mb-2">
            {{ example.name }}
          </h3>
          <p class="text-sm text-gray-400 mb-3">
            {{ example.complexity }}
          </p>
          <NuxtLinkLocale :to="example.path">
            <UButton
              variant="soft"
              size="sm"
              block
            >
              Test {{ example.name.split(' ')[0] }} →
            </UButton>
          </NuxtLinkLocale>
        </div>
      </div>
    </UCard>

    <!-- Architecture Decisions -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold text-white">
          Architecture Decisions
        </h2>
        <p class="text-gray-400 mt-1">
          Key decisions made during development and their rationale
        </p>
      </template>

      <div class="space-y-4">
        <UCard
          v-for="decision in architectureDecisions"
          :key="decision.decision"
          class="bg-gray-800/30 border-gray-700"
        >
          <div class="space-y-2">
            <h3 class="font-medium text-white">
              {{ decision.decision }}
            </h3>
            <p class="text-sm text-gray-400">
              {{ decision.rationale }}
            </p>
            <p class="text-sm text-green-400">
              Impact: {{ decision.impact }}
            </p>
          </div>
        </UCard>
      </div>
    </UCard>

    <!-- Quick Stats & Info -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Stats -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-white">
            Layer Stats
          </h3>
        </template>
        <div class="grid grid-cols-2 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-primary-400">
              {{ stats.components }}
            </div>
            <div class="text-sm text-gray-400">
              Component
            </div>
          </div>
          <div>
            <div class="text-2xl font-bold text-primary-400">
              {{ stats.composables }}
            </div>
            <div class="text-sm text-gray-400">
              Composables
            </div>
          </div>
          <div>
            <div class="text-2xl font-bold text-primary-400">
              {{ stats.variants }}
            </div>
            <div class="text-sm text-gray-400">
              UI Variants
            </div>
          </div>
          <div>
            <div class="text-2xl font-bold text-primary-400">
              {{ stats.languages }}
            </div>
            <div class="text-sm text-gray-400">
              Languages
            </div>
          </div>
        </div>
      </UCard>

      <!-- Quick Actions -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-white">
            Quick Test
          </h3>
        </template>
        <div class="space-y-3">
          <UButton
            variant="outline"
            size="sm"
            block
            @click="testLanguageSwitch('mr')"
          >
            Switch to मराठी
          </UButton>
          <UButton
            variant="outline"
            size="sm"
            block
            @click="testLanguageSwitch('en')"
          >
            Switch to English
          </UButton>
          <p class="text-xs text-gray-500">
            Check console for analytics events
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>
