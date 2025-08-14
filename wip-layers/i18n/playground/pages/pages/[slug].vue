<!-- playground/pages/pages/[slug].vue - Compact Formatter Showcase -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { content, pending, error, refresh } = useI18nContent({
  collection: 'pages',
  autoSEO: true,
  autoI18nParams: true,
})

const format = useI18nFormatters()

useHead(() => ({
  title: content.value?.title ? `${content.value.title} | Pages` : `Page: ${slug}`,
}))

// Sample data for formatter demonstrations
const sampleData = computed(() => ({
  foundedDate: new Date('2019-03-15'),
  lastUpdated: new Date('2024-12-01'),
  revenueUSD: 2500000.00, // Our actual revenue in USD
  growth: 0.275,
  teamSize: 47,
  fileSize: 15728640,
  processingTime: 245,
  locations: ['New York', 'San Francisco', 'London', 'Mumbai'],
  technologies: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
}))

// Formatter function reference data
const formatterCategories = [
  {
    title: 'Numbers & Currency',
    color: 'green',
    functions: [
      'currency(amount, currency?)',
      'number(value, options?)',
      'percent(decimal, options?)',
      'compact(number, options?)',
      'ordinal(number)',
    ],
  },
  {
    title: 'Dates & Time',
    color: 'blue',
    functions: [
      'date(date, options?)',
      'datePresets.short(date)',
      'datePresets.medium(date)',
      'relativeDate(date)',
      'relativeTime(value, unit)',
    ],
  },
  {
    title: 'Lists & Text',
    color: 'purple',
    functions: [
      'listStyles.and(array)',
      'listStyles.or(array)',
      'fileSize(bytes, decimals?)',
      'duration(seconds)',
      'textCase.title(string)',
    ],
  },
]

// Demo sections with examples
const demoSections = [
  {
    title: 'Number Formatters',
    icon: 'i-lucide-calculator',
    color: 'emerald',
    badge: 'Intl.NumberFormat',
    categories: [
      {
        title: 'Currency Formatting',
        color: 'emerald',
        examples: [
          {
            fn: 'currency(2500000, "USD")',
            input: '2500000, "USD"',
            getValue: () => format.value.currency(sampleData.value.revenueUSD, 'USD'),
            note: 'US Dollar with standard formatting',
          },
          {
            fn: 'currency(2500000, "INR")',
            input: '2500000, "INR"',
            getValue: () => format.value.currency(sampleData.value.revenueUSD, 'INR'),
            note: 'Indian Rupee with lakh/crore grouping',
          },
          {
            fn: 'currency(2500000, "EUR")',
            input: '2500000, "EUR"',
            getValue: () => format.value.currency(sampleData.value.revenueUSD, 'EUR'),
            note: 'Euro with current locale formatting',
          },
        ],
      },
      {
        title: 'Percentages & Numbers',
        color: 'blue',
        examples: [
          {
            fn: 'percent(0.275)',
            input: '0.275',
            getValue: () => format.value.percent(sampleData.value.growth),
          },
          {
            fn: 'number(47)',
            input: '47',
            getValue: () => format.value.number(sampleData.value.teamSize),
          },
          {
            fn: 'compact(1250000)',
            input: '1250000',
            getValue: () => format.value.compact(1250000),
          },
        ],
      },
      {
        title: 'Ordinals',
        color: 'purple',
        examples: [
          { fn: 'ordinal(1)', input: '1', getValue: () => format.value.ordinal(1) },
          { fn: 'ordinal(22)', input: '22', getValue: () => format.value.ordinal(22) },
          { fn: 'ordinal(103)', input: '103', getValue: () => format.value.ordinal(103) },
        ],
      },
    ],
  },
  {
    title: 'Date & Time Formatters',
    icon: 'i-lucide-calendar',
    color: 'blue',
    badge: 'Intl.DateTimeFormat',
    categories: [
      {
        title: 'Date Presets',
        color: 'blue',
        examples: [
          {
            fn: 'datePresets.short(new Date("2019-03-15"))',
            input: '\'2019-03-15\'',
            getValue: () => format.value.datePresets.short(sampleData.value.foundedDate),
          },
          {
            fn: 'datePresets.medium(new Date("2019-03-15"))',
            input: '\'2019-03-15\'',
            getValue: () => format.value.datePresets.medium(sampleData.value.foundedDate),
          },
          {
            fn: 'datePresets.long(new Date("2019-03-15"))',
            input: '\'2019-03-15\'',
            getValue: () => format.value.datePresets.long(sampleData.value.foundedDate),
          },
        ],
      },
      {
        title: 'Relative Time',
        color: 'amber',
        examples: [
          {
            fn: 'relativeDate(new Date("2019-03-15"))',
            input: '\'2019-03-15\'',
            getValue: () => format.value.relativeDate(sampleData.value.foundedDate),
          },
          {
            fn: 'relativeDate(new Date("2024-12-01"))',
            input: '\'2024-12-01\'',
            getValue: () => format.value.relativeDate(sampleData.value.lastUpdated),
          },
          {
            fn: 'relativeTime(-2, "day")',
            input: '-2, "day"',
            getValue: () => format.value.relativeTime(-2, 'day'),
          },
        ],
      },
    ],
  },
  {
    title: 'List Formatters',
    icon: 'i-lucide-list',
    color: 'purple',
    badge: 'Intl.ListFormat',
    categories: [
      {
        title: 'Locations',
        color: 'purple',
        examples: [
          {
            fn: 'listStyles.and([\'New York\', \'San Francisco\', \'London\', \'Mumbai\'])',
            input: '["New York", "San Francisco", "London", "Mumbai"]',
            getValue: () => format.value.listStyles.and(sampleData.value.locations),
            multiline: true,
          },
          {
            fn: 'listStyles.or([\'New York\', \'San Francisco\'])',
            input: '["New York", "San Francisco"]',
            getValue: () => format.value.listStyles.or(sampleData.value.locations.slice(0, 2)),
          },
          {
            fn: 'listStyles.narrow([\'New York\', \'San Francisco\', \'London\', \'Mumbai\'])',
            input: '["New York", "San Francisco", "London", "Mumbai"]',
            getValue: () => format.value.listStyles.narrow(sampleData.value.locations),
            multiline: true,
          },
        ],
      },
      {
        title: 'Technologies',
        color: 'emerald',
        examples: [
          {
            fn: 'listStyles.and([\'Vue.js\', \'Nuxt\', \'TypeScript\', \'Tailwind CSS\'])',
            input: '["Vue.js", "Nuxt", "TypeScript", "Tailwind CSS"]',
            getValue: () => format.value.listStyles.and(sampleData.value.technologies),
            multiline: true,
          },
          {
            fn: 'listStyles.or([\'Vue.js\', \'Nuxt\', \'TypeScript\'])',
            input: '["Vue.js", "Nuxt", "TypeScript"]',
            getValue: () => format.value.listStyles.or(sampleData.value.technologies.slice(0, 3)),
            multiline: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Utility Formatters',
    icon: 'i-lucide-wrench',
    color: 'amber',
    badge: 'Custom Logic',
    categories: [
      {
        title: 'File Sizes',
        color: 'amber',
        examples: [
          { fn: 'fileSize(15728640)', input: '15728640', getValue: () => format.value.fileSize(sampleData.value.fileSize) },
          { fn: 'fileSize(5368709120)', input: '5368709120', getValue: () => format.value.fileSize(5368709120) },
          { fn: 'fileSize(2048)', input: '2048', getValue: () => format.value.fileSize(2048) },
        ],
      },
      {
        title: 'Durations',
        color: 'red',
        examples: [
          { fn: 'duration(245)', input: '245', getValue: () => format.value.duration(sampleData.value.processingTime) },
          { fn: 'duration(45)', input: '45', getValue: () => format.value.duration(45) },
          { fn: 'duration(7265)', input: '7265', getValue: () => format.value.duration(7265) },
        ],
      },
      {
        title: 'Text Cases',
        color: 'gray',
        examples: [
          { fn: 'textCase.title("hello world")', input: '"hello world"', getValue: () => format.value.textCase.title('hello world') },
          { fn: 'textCase.kebab("Hello World")', input: '"Hello World"', getValue: () => format.value.textCase.kebab('Hello World') },
          { fn: 'textCase.camel("hello world")', input: '"hello world"', getValue: () => format.value.textCase.camel('hello world') },
        ],
      },
    ],
  },
]

// Stats for header display
const headerStats = computed(() => [
  { label: 'Founded', value: format.value.relativeDate(sampleData.value.foundedDate), color: 'emerald' },
  { label: 'Team Members', value: format.value.compact(sampleData.value.teamSize), color: 'blue' },
  { label: 'Annual Revenue', value: format.value.currency(sampleData.value.revenueUSD, 'USD'), color: 'purple' },
  { label: 'Growth Rate', value: format.value.percent(sampleData.value.growth), color: 'amber' },
])
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="border-b border-gray-800 pb-6">
      <UBadge
        variant="soft"
        color="success"
        size="sm"
        class="mb-4"
      >
        Formatter Showcase
      </UBadge>
      <h1 class="text-2xl font-bold text-white mb-2">
        i18n Formatters in Action
      </h1>
      <p class="text-gray-400 mb-4">
        This page demonstrates our <strong>useI18nFormatters()</strong> composable with live data formatting that automatically adapts to the current locale.
      </p>

      <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div class="space-y-3">
          <h3 class="font-medium text-purple-400">
            Formatter Categories
          </h3>
          <ul class="text-xs space-y-1 text-gray-400">
            <li>• <strong>Numbers:</strong> Currency formatting, percentages, compact notation</li>
            <li>• <strong>Dates:</strong> Relative time, presets, custom formats</li>
            <li>• <strong>Lists:</strong> Conjunctions, disjunctions, narrow style</li>
            <li>• <strong>Text:</strong> Case transformations, ordinals</li>
            <li>• <strong>Files:</strong> Size formatting, duration display</li>
          </ul>
        </div>

        <div class="space-y-3">
          <h3 class="font-medium text-blue-400">
            Currency Formatting Note
          </h3>
          <div class="bg-amber-900/20 border border-amber-700/30 rounded p-3">
            <div class="text-xs text-amber-200">
              <strong>Important:</strong> Currency examples show <em>formatting variations</em>, not currency conversion.
              The same USD amount is displayed with different regional number formatting (e.g., Indian lakh/crore grouping).
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Language Switcher -->
    <div class="flex justify-between items-center">
      <ILanguageSwitcher
        variant="buttons"
        size="sm"
      />
      <div class="text-sm text-gray-500">
        Live formatting demo - switch locales to see changes
      </div>
    </div>

    <!-- Loading/Error States -->
    <div
      v-if="pending"
      class="space-y-4"
    >
      <USkeleton class="h-8 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-5/6" />
      </div>
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      :title="'Failed to load page'"
      :description="error.message"
    >
      <template #actions>
        <UButton
          variant="outline"
          size="xs"
          @click="refresh()"
        >
          Retry
        </UButton>
      </template>
    </UAlert>

    <UAlert
      v-else-if="!content"
      color="warning"
      variant="soft"
      :title="'Page not found'"
      :description="`No page found for slug '${slug}' in ${$i18n.locale.toUpperCase()}`"
    />

    <!-- Main Content -->
    <template v-else>
      <!-- Page Header with Formatted Data -->
      <UCard class="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <template #header>
          <h1 class="text-2xl font-bold text-white">
            {{ content.title }}
          </h1>
        </template>

        <div class="space-y-4">
          <p
            v-if="content.subtitle"
            class="text-lg text-gray-300"
          >
            {{ content.subtitle }}
          </p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="stat in headerStats"
              :key="stat.label"
              class="text-center p-3 bg-gray-900/50 rounded"
            >
              <div :class="`text-lg font-bold text-${stat.color}-400`">
                {{ stat.value }}
              </div>
              <div class="text-xs text-gray-400">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Formatter Function Reference -->
      <UCard class="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-code-2"
              class="w-5 h-5 text-green-400"
            />
            <span class="text-lg font-semibold text-white">Formatter Function Reference</span>
            <UBadge
              size="xs"
              variant="soft"
              color="green"
            >
              useI18nFormatters()
            </UBadge>
          </div>
        </template>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div
            v-for="category in formatterCategories"
            :key="category.title"
            class="space-y-2"
          >
            <h4 :class="`font-medium text-${category.color}-400 text-sm`">
              {{ category.title }}
            </h4>
            <div class="space-y-1 font-mono">
              <div
                v-for="func in category.functions"
                :key="func"
              >
                <span class="text-blue-300">{{ func.split('(')[0] }}</span>
                <span class="text-gray-400">({{ func.split('(')[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Dynamic Demo Sections -->
      <UCard
        v-for="section in demoSections"
        :key="section.title"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              :name="section.icon"
              :class="`w-5 h-5 text-${section.color}-400`"
            />
            <span class="text-lg font-semibold text-white">{{ section.title }}</span>
            <UBadge
              size="xs"
              variant="soft"
              :color="section.color"
            >
              {{ section.badge }}
            </UBadge>
          </div>
        </template>

        <div :class="`grid md:grid-cols-${Math.min(section.categories.length, 3)} gap-6`">
          <div
            v-for="category in section.categories"
            :key="category.title"
            class="space-y-3"
          >
            <h3 :class="`font-medium text-${category.color}-400`">
              {{ category.title }}
            </h3>
            <div class="space-y-3 text-sm">
              <div
                v-for="example in category.examples"
                :key="example.fn"
                class="bg-gray-900/50 p-3 rounded"
              >
                <div class="text-xs text-gray-400 mb-1">
                  {{ example.fn }}
                </div>
                <div :class="example.multiline ? 'space-y-1' : 'flex justify-between items-start'">
                  <span class="text-gray-400">Input:</span>
                  <code
                    class="text-gray-300"
                    :class="example.multiline ? 'block text-right' : ''"
                  >{{ example.input }}</code>
                </div>
                <div :class="example.multiline ? 'space-y-1' : 'flex justify-between items-start'">
                  <span class="text-gray-400">Output:</span>
                  <code :class="`text-${category.color}-300` + (example.multiline ? ' block text-right' : '')">{{ example.getValue() }}</code>
                </div>
                <div
                  v-if="example.note"
                  class="text-xs text-gray-500 mt-1 italic"
                >
                  {{ example.note }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Original Content (if available) -->
      <UCard
        v-if="content.content"
        class="bg-gray-900/50"
      >
        <template #header>
          <h2 class="text-lg font-semibold text-white">
            Original Page Content
          </h2>
        </template>
        <div class="space-y-4">
          <div
            v-for="(sectionContent, sectionKey) in content.content"
            :key="sectionKey"
            class="border-l-2 border-gray-700 pl-4"
          >
            <h3 class="font-medium text-white capitalize mb-2">
              {{ sectionKey }}
            </h3>
            <div
              v-if="typeof sectionContent === 'string'"
              class="text-gray-300"
            >
              {{ sectionContent }}
            </div>
            <div
              v-else-if="Array.isArray(sectionContent)"
              class="space-y-2"
            >
              <div
                v-for="(item, index) in sectionContent"
                :key="index"
                class="text-gray-300"
              >
                {{ typeof item === 'object' ? JSON.stringify(item, null, 2) : item }}
              </div>
            </div>
            <div
              v-else-if="typeof sectionContent === 'object'"
              class="space-y-1"
            >
              <div
                v-for="(value, key) in sectionContent"
                :key="key"
                class="flex gap-3 text-sm"
              >
                <span class="font-medium text-gray-400 min-w-24">{{ key }}:</span>
                <span class="text-gray-300">
                  {{ typeof value === 'object' ? JSON.stringify(value) : value }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Implementation Code -->
      <UCard class="bg-gray-900">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-code-2"
              class="w-5 h-5 text-green-400"
            />
            <span class="text-lg font-semibold text-white">Implementation</span>
          </div>
        </template>
        <div class="space-y-3">
          <div class="text-xs text-gray-400 mb-2">
            Usage:
          </div>
          <code class="text-green-300 text-sm font-mono bg-gray-950 p-3 rounded block">
            const format = useI18nFormatters()<br><br>
            format.value.currency(2500000) // $2,500,000.00<br>
            format.value.relativeDate(new Date('2019-03-15')) // 5 years ago<br>
            format.value.listStyles.and(['Vue', 'Nuxt', 'TypeScript']) // Vue, Nuxt, and TypeScript
          </code>
        </div>
      </UCard>

      <!-- Navigation -->
      <div class="flex justify-between items-center pt-6 border-t border-gray-800">
        <NuxtLinkLocale to="/">
          <UButton
            variant="ghost"
            size="sm"
          >
            ← Back to Tests
          </UButton>
        </NuxtLinkLocale>
        <div class="text-sm text-gray-500">
          Switch languages to see locale-aware formatting
        </div>
      </div>
    </template>
  </div>
</template>
