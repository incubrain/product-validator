<script setup lang="ts">
import { useMergeProps } from '#shared/utils/props'
import type { LanguageSwitcherProps } from '#shared/types/components'
import languageSwitcherStyles from '#theme/i18n/language-switcher'

const props = withDefaults(defineProps<LanguageSwitcherProps>(), {
  variant: 'buttons',
  size: 'md',
  showFlags: false,
  preserveRoute: true,
  smart: false,
  ubutton: () => ({}),
  ubuttonGroup: () => ({}),
  uselect: () => ({}),
})

defineOptions({ inheritAttrs: false })

defineSlots<{
  default(props?: {
    locales: any[]
    currentLocale: any
    availableLocales: any[]
    switching: boolean
    switchLocale: (locale: string) => Promise<void>
  }): any
}>()

// ✅ Core composables
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const switching = ref(false)

// ✅ MUTABLE COOKIE STORAGE - Always created, conditionally used
const preferredLanguage = useCookie<string | null>('preferred-language', {
  default: () => null,
  maxAge: 365 * 24 * 60 * 60, // 1 year
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: false,
})

// ✅ Simple browser detection
function detectBrowserLanguage(): string | null {
  if (!import.meta.client) return null

  const browserLanguages = navigator.languages || [navigator.language]
  const availableCodes = locales.value.map((l) => l.code)

  for (const browserLang of browserLanguages) {
    // Exact match (en-US)
    if (availableCodes.includes(browserLang)) {
      return browserLang
    }

    // Language-only match (en-US -> en)
    const langOnly = browserLang.split('-')[0]
    if (availableCodes.includes(langOnly)) {
      return langOnly!
    }

    // Partial match (en-US matches en-GB if available)
    const partialMatch = availableCodes.find((code) =>
      code.startsWith(langOnly + '-') || code === langOnly,
    )
    if (partialMatch) {
      return partialMatch
    }
  }

  return null
}

// ✅ Auto-detect on mount (if enabled or smart mode)
onMounted(() => {
  if (props.smart) {
    // Check stored preference first
    const stored = preferredLanguage.value
    if (stored && locales.value.some((l) => l.code === stored)) {
      if (stored !== locale.value) {
        handleLocaleSwitch(stored)
      }
      return
    }

    // Try browser detection
    const detected = detectBrowserLanguage()
    if (detected && detected !== locale.value) {
      handleLocaleSwitch(detected)
    }
  }
})

// ✅ Enhanced locale switching
async function handleLocaleSwitch(newLocale: string) {
  if (switching.value || newLocale === locale.value) return

  switching.value = true

  // ✅ Store preference when user actively switches or smart mode enabled
  if (props.smart) {
    preferredLanguage.value = newLocale
  }

  // Store scroll position (smart mode enables this by default)
  let scrollPosition = { x: 0, y: 0 }
  if (props.smart && import.meta.client) {
    scrollPosition = { x: window.scrollX, y: window.scrollY }
  }

  try {
    if (props.preserveRoute) {
      const targetPath = switchLocalePath(newLocale)
      if (targetPath) {
        await navigateTo(targetPath, { replace: false, external: false })

        // Restore scroll position (smart mode enables this by default)
        if (props.smart && import.meta.client) {
          await nextTick()
          window.scrollTo(scrollPosition.x, scrollPosition.y)
        }
      }
    }
  } catch (error) {
    console.error('Language switch failed:', error)
  } finally {
    switching.value = false
  }
}

// ✅ Available locales for dropdown/buttons
const availableLocales = computed(() =>
  locales.value.filter((loc: any) => loc.code !== locale.value),
)

const currentLocale = computed(() =>
  locales.value.find((loc: any) => loc.code === locale.value),
)

// ✅ USelect items format with optional icons
const selectItems = computed(() =>
  locales.value.map((loc) => ({
    label: loc.name,
    value: loc.code,
    // Read icon from locale config if available
    icon: props.showFlags && loc.icon ? loc.icon : undefined,
  })),
)

// ✅ Handle USelect change - fix the type signature
function handleSelectChange(selectedLocale: string | boolean | undefined) {
  if (typeof selectedLocale === 'string') {
    handleLocaleSwitch(selectedLocale)
  }
}

// ✅ THEME INTEGRATION - tvComputed pattern
const ui = tvComputed(() => languageSwitcherStyles({
  variant: props.variant,
  size: props.size,
}))

const buttonGroupProps = useMergeProps(props.ubuttonGroup, {
  size: props.size,
  orientation: 'horizontal' as const,
})

const selectProps = useMergeProps(props.uselect, {
  value: locale.value,
  placeholder: currentLocale.value.name,
  items: selectItems.value,
  size: props.size,
  disabled: switching.value,
  trailingIcon: props.showFlags && currentLocale.value?.icon ? currentLocale.value.icon : undefined,
  content: {
    align: 'center',
    side: 'bottom',
    sideOffset: 4,
  },
  ui: {
    base: 'justify-center w-auto max-w-48',
    content: 'w-auto',
  },
})

const buttonPropsForLocale = useMergeProps(props.ubutton, (loc: any) => ({
  label: loc.isCompact ? loc.code.toUpperCase() : loc.name,
  variant: locale.value === loc.code ? 'subtle' as const : 'outline' as const,
  color: locale.value === loc.code ? 'primary' as const : 'neutral' as const,
  size: props.size,
  disabled: switching.value,
  trailingIcon: props.showFlags && loc.icon ? loc.icon : undefined,
  onClick: () => handleLocaleSwitch(loc.code),
}))
</script>

<template>
  <div
    :data-switching="switching"
    :class="ui.root({ class: [props.ui?.root, $attrs.class] })"
  >
    <!-- Button Group Variant -->
    <UButtonGroup
      v-if="variant === 'buttons'"
      v-bind="buttonGroupProps"
      :class="ui.group({ class: props.ui?.group })"
    >
      <UButton
        v-for="loc in locales"
        :key="loc.code"
        v-bind="buttonPropsForLocale({ ...loc, isCompact: true }).value"
      />
    </UButtonGroup>

    <!-- Dropdown Variant -->
    <USelect
      v-else-if="variant === 'dropdown'"
      v-bind="selectProps"
      v-model="locale"
    />

    <!-- Minimal Variant -->
    <div
      v-else-if="variant === 'minimal'"
      :class="ui.group({ class: props.ui?.group })"
    >
      <UButton
        v-for="loc in locales"
        :key="loc.code"
        v-bind="buttonPropsForLocale(loc).value"
      />
    </div>

    <!-- Custom Slot Variant -->
    <div
      v-else-if="variant === 'custom'"
    >
      <slot
        :locales="locales"
        :current-locale="currentLocale"
        :available-locales="availableLocales"
        :switching="switching"
        :switch-locale="handleLocaleSwitch"
      />
    </div>
  </div>
</template>
