<!-- app/components/ib/LanguageSwitcher.vue - COMPLETELY FIXED -->
<script setup lang="ts">
interface Props {
  variant?: 'buttons' | 'dropdown' | 'minimal'
  preserveRoute?: boolean
  trackAnalytics?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'buttons',
  preserveRoute: true,
  trackAnalytics: true,
})

// ✅ Use correct composables
const { locale, locales } = useI18n()
const { switchLocaleWithAnalytics } = useI18nEnhanced()
console.log('localeszz', locale.value)
const switchLocalePath = useSwitchLocalePath()

const switching = ref(false)
const dropdownOpen = ref(false)

// ✅ FIXED: Simple locale switching with proper error handling
async function handleLocaleSwitch(newLocale: string) {
  if (switching.value || newLocale === locale.value) {
    console.log(`⏭️ Skipping switch: ${newLocale} (already current or switching)`)
    return
  }

  console.log(`🎯 Starting locale switch to: ${newLocale}`)
  switching.value = true
  dropdownOpen.value = false // Close dropdown

  try {
    if (props.trackAnalytics) {
      console.log('📊 Using analytics switch')
      await switchLocaleWithAnalytics(newLocale)
    } else if (props.preserveRoute) {
      console.log('🔄 Using route preservation')
      // ✅ Use existing Nuxt i18n route switching
      const targetPath = switchLocalePath(newLocale)
      console.log(`🎯 Target path: ${targetPath}`)

      if (targetPath) {
        await navigateTo(targetPath)
        console.log(`✅ Navigation completed to: ${targetPath}`)
      } else {
        console.warn('⚠️ No target path generated')
      }
    }
  } catch (error) {
    console.error('❌ Error switching locale:', error)
  } finally {
    switching.value = false
    console.log('🏁 Locale switch attempt completed')
  }
}

// ✅ Simple available locales with debugging
const availableLocales = computed(() => {
  const filtered = locales.value.filter((loc: any) => loc.code !== locale.value)
  console.log('🌐 Available locales:', filtered)
  return filtered
})

// ✅ Toggle dropdown
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

// ✅ Close dropdown when clicking outside
onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('.language-dropdown')) {
        dropdownOpen.value = false
      }
    })
  }
})
</script>

<template>
  <div
    class="relative language-dropdown"
    :class="{ 'opacity-50 pointer-events-none': switching }"
  >
    <!-- Button Group Variant -->
    <div
      v-if="variant === 'buttons'"
      class="flex gap-1"
    >
      <button
        v-for="loc in locales"
        :key="loc.code"
        :class="[
          'px-3 py-1.5 text-sm rounded-md font-medium transition-colors',
          locale === loc.code
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
        ]"
        :disabled="switching"
        @click="handleLocaleSwitch(loc.code)"
      >
        {{ loc.name }}
      </button>
    </div>

    <!-- Dropdown Variant - FIXED -->
    <div
      v-else-if="variant === 'dropdown'"
      class="relative"
    >
      <button
        class="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-50 transition-colors"
        :disabled="switching"
        @click="toggleDropdown"
      >
        {{ locales.find((l: any) => l.code === locale)?.name || locale }}
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': dropdownOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- FIXED: Dropdown menu with proper state management -->
      <div
        v-show="dropdownOpen"
        class="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg py-1 z-10 min-w-full"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors whitespace-nowrap"
          @click="handleLocaleSwitch(loc.code)"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>

    <!-- Minimal Variant -->
    <div
      v-else-if="variant === 'minimal'"
      class="flex gap-1"
    >
      <button
        v-for="loc in locales"
        :key="loc.code"
        :class="[
          'px-2 py-1 text-sm rounded transition-colors',
          locale === loc.code
            ? 'bg-blue-600 text-white font-medium'
            : 'text-gray-500 hover:text-gray-700',
        ]"
        :disabled="switching"
        @click="handleLocaleSwitch(loc.code)"
      >
        {{ loc.code.toUpperCase() }}
      </button>
    </div>

    <!-- Loading Indicator -->
    <div
      v-if="switching"
      class="absolute inset-0 flex items-center justify-center bg-white/80 rounded"
    >
      <svg
        class="w-4 h-4 animate-spin text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  </div>
</template>
