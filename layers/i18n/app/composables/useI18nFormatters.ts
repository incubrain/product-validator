// app/composables/useI18nFormatters.ts - Enhanced locale-aware formatting utilities

import type { I18nFormatterOptions } from '~~/i18n-content'

/**
 * Comprehensive locale-aware formatting utilities using Intl API
 * Automatically adapts to current language with extensive formatting options
 */
export function useI18nFormatters() {
  const { locale, locales } = useI18n()

  // Get the full ISO locale with fallback testing
  const getFullLocale = () => {
    const currentLocaleInfo = locales.value.find((l: any) => l.code === locale.value)
    let fullLocale = String(currentLocaleInfo?.iso || locale.value)

    // Debug: Check what locales are actually supported
    if (import.meta.dev) {
      // Test different Marathi locale variations
      const marathiVariants = ['mr-IN', 'mr', 'hi-IN']
      const supported = Intl.NumberFormat.supportedLocalesOf(marathiVariants)
      console.log(`Marathi variants supported:`, supported)

      const testFormatter = new Intl.NumberFormat(fullLocale)
      const resolved = testFormatter.resolvedOptions()
      console.log(`Requested: ${fullLocale} → Resolved: ${resolved.locale}, numberingSystem: ${resolved.numberingSystem}`)

      // Test Indian grouping specifically
      const testNumber = 123456.789
      console.log(`Test with en-IN:`, new Intl.NumberFormat('en-IN').format(testNumber))
      console.log(`Test with hi-IN:`, new Intl.NumberFormat('hi-IN').format(testNumber))
      console.log(`Test with mr-IN:`, new Intl.NumberFormat('mr-IN').format(testNumber))
      console.log(`Test with mr:`, new Intl.NumberFormat('mr').format(testNumber))
    }

    // If mr-IN is not supported, try fallbacks for Marathi users who want Indian grouping
    if (locale.value === 'mr') {
      const marathiFallbacks = ['mr-IN', 'hi-IN', 'en-IN']
      const supported = Intl.NumberFormat.supportedLocalesOf(marathiFallbacks)
      if (supported.length > 0) {
        fullLocale = supported[0]!
        if (import.meta.dev) {
          console.log(`Using fallback locale for Marathi: ${fullLocale}`)
        }
      }
    }

    return fullLocale
  }

  return computed(() => ({
    /**
     * Format currency amounts using the current locale's formatting rules
     */
    currency: (amount: number, currency = 'USD', options?: Intl.NumberFormatOptions) => {
      const formatLocale = getFullLocale()

      const result = new Intl.NumberFormat(formatLocale, {
        style: 'currency',
        currency,
        ...options,
      }).format(amount)

      // Debug the actual currency formatting call
      if (import.meta.dev) {
        console.log(`currency(${amount}, "${currency}") with locale "${formatLocale}" → ${result}`)
      }

      return result
    },

    /**
     * Format dates with extensive options using full ISO locale
     */
    date: (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const d = typeof date === 'string' ? new Date(date) : date
      return new Intl.DateTimeFormat(getFullLocale(), options).format(d)
    },

    /**
     * Format dates in common presets using full ISO locale
     */
    datePresets: {
      short: (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date
        return new Intl.DateTimeFormat(getFullLocale(), {
          dateStyle: 'short',
        }).format(d)
      },
      medium: (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date
        return new Intl.DateTimeFormat(getFullLocale(), {
          dateStyle: 'medium',
        }).format(d)
      },
      long: (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date
        return new Intl.DateTimeFormat(getFullLocale(), {
          dateStyle: 'long',
        }).format(d)
      },
      full: (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date
        return new Intl.DateTimeFormat(getFullLocale(), {
          dateStyle: 'full',
        }).format(d)
      },
    },

    /**
     * Format time values using full ISO locale
     */
    time: (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const d = typeof date === 'string' ? new Date(date) : date
      return new Intl.DateTimeFormat(getFullLocale(), {
        timeStyle: 'short',
        ...options,
      }).format(d)
    },

    /**
     * Format numbers with various options using full ISO locale
     */
    number: (num: number, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(getFullLocale(), options).format(num),

    /**
     * Format percentages using full ISO locale
     */
    percent: (num: number, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(getFullLocale(), {
        style: 'percent',
        ...options,
      }).format(num),

    /**
     * Format relative time using full ISO locale
     */
    relativeTime: (value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions) =>
      new Intl.RelativeTimeFormat(getFullLocale(), {
        numeric: 'auto',
        ...options,
      }).format(value, unit),

    /**
     * Smart relative time formatting from dates using full ISO locale
     */
    relativeDate: (date: Date | string) => {
      const d = typeof date === 'string' ? new Date(date) : date
      const now = new Date()
      const diffMs = d.getTime() - now.getTime()
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

      if (Math.abs(diffDays) < 1) {
        const diffHours = Math.round(diffMs / (1000 * 60 * 60))
        if (Math.abs(diffHours) < 1) {
          const diffMinutes = Math.round(diffMs / (1000 * 60))
          return new Intl.RelativeTimeFormat(getFullLocale(), { numeric: 'auto' })
            .format(diffMinutes, 'minute')
        }
        return new Intl.RelativeTimeFormat(getFullLocale(), { numeric: 'auto' })
          .format(diffHours, 'hour')
      }

      if (Math.abs(diffDays) < 7) {
        return new Intl.RelativeTimeFormat(getFullLocale(), { numeric: 'auto' })
          .format(diffDays, 'day')
      }

      const diffWeeks = Math.round(diffDays / 7)
      if (Math.abs(diffWeeks) < 4) {
        return new Intl.RelativeTimeFormat(getFullLocale(), { numeric: 'auto' })
          .format(diffWeeks, 'week')
      }

      const diffMonths = Math.round(diffDays / 30)
      if (Math.abs(diffMonths) < 12) {
        return new Intl.RelativeTimeFormat(getFullLocale(), { numeric: 'auto' })
          .format(diffMonths, 'month')
      }

      const diffYears = Math.round(diffDays / 365)
      return new Intl.RelativeTimeFormat(getFullLocale(), { numeric: 'auto' })
        .format(diffYears, 'year')
    },

    /**
     * Format lists of items using full ISO locale
     */
    list: (items: string[], options?: Intl.ListFormatOptions) =>
      new Intl.ListFormat(getFullLocale(), options).format(items),

    /**
     * Format lists with different styles using full ISO locale
     */
    listStyles: {
      and: (items: string[]) =>
        new Intl.ListFormat(getFullLocale(), { style: 'long', type: 'conjunction' }).format(items),
      or: (items: string[]) =>
        new Intl.ListFormat(getFullLocale(), { style: 'long', type: 'disjunction' }).format(items),
      narrow: (items: string[]) =>
        new Intl.ListFormat(getFullLocale(), { style: 'narrow' }).format(items),
    },

    /**
     * Format file sizes using full ISO locale for number formatting
     */
    fileSize: (bytes: number, decimals = 2) => {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))

      const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
      return `${new Intl.NumberFormat(getFullLocale()).format(value)} ${sizes[i]}`
    },

    /**
     * Format durations (in seconds)
     */
    duration: (seconds: number) => {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secs = Math.floor(seconds % 60)

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      }
      return `${minutes}:${secs.toString().padStart(2, '0')}`
    },

    /**
     * Format ordinal numbers using full ISO locale
     */
    ordinal: (num: number) => {
      const pr = new Intl.PluralRules(getFullLocale(), { type: 'ordinal' })
      const suffixes = new Map([
        ['one', 'st'],
        ['two', 'nd'],
        ['few', 'rd'],
        ['other', 'th'],
      ])
      const rule = pr.select(num)
      const suffix = suffixes.get(rule) || 'th'
      return `${num}${suffix}`
    },

    /**
     * Format compact numbers using full ISO locale
     */
    compact: (num: number, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(getFullLocale(), {
        notation: 'compact',
        compactDisplay: 'short',
        ...options,
      }).format(num),

    /**
     * Format text case (title case, sentence case, etc.)
     */
    textCase: {
      title: (text: string) => {
        return text.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
        )
      },
      sentence: (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      },
      camel: (text: string) => {
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase(),
        ).replace(/\s+/g, '')
      },
      kebab: (text: string) => {
        return text.toLowerCase().replace(/\s+/g, '-')
      },
      snake: (text: string) => {
        return text.toLowerCase().replace(/\s+/g, '_')
      },
    },
  }))
}
