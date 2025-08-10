# @incubrain/i18n-layer

Enterprise-grade i18n layer for Nuxt applications with English and Marathi support.

## ✨ Features

- 🎯 **3 Core Components** - Simple, focused functionality
- 🔧 **Smart Text Resolution** - Automatic fallbacks and locale switching
- 📱 **Content Integration** - Seamless Nuxt Content + i18n
- 🎨 **Clean UI Components** - Professional language switcher
- 📊 **Basic Analytics** - Track language preferences
- 🚀 **Zero Configuration** - Drop in and use immediately

## 🚀 Quick Start

### Installation

```bash
npm install @incubrain/i18n-layer
```

### Usage

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@incubrain/i18n-layer'],
  
  i18n: {
    locales: [
      { code: 'en', file: 'english.json', name: 'English' },
      { code: 'mr', file: 'marathi.json', name: 'मराठी' }
    ],
    defaultLocale: 'en'
  }
})
```

### Basic Example

```vue
<script setup>
const title = useLocalizedText({
  en: "Welcome to our website",
  mr: "आमच्या वेबसाइटवर आपले स्वागत आहे"
})
</script>

<template>
  <ILocalizedContent 
    :content="title"
    component="h1"
  />
  
  <ILanguageSwitcher variant="buttons" />
  
  <IContentRenderer 
    collection="blog"
    :auto-seo="true"
  />
</template>
```

## 📚 Components

### ILocalizedContent

Smart content resolution with automatic fallbacks.

```vue
<ILocalizedContent 
  :content="{ en: 'Hello', mr: 'नमस्कार' }"
  component="h2"
  :bind-props="{ class: 'text-primary' }"
  fallback="en"
/>
```

### IContentRenderer

Nuxt Content integration with i18n support.

```vue
<IContentRenderer 
  collection="blog"
  :slug="$route.params.slug"
  :auto-seo="true"
  :auto-i18n-params="true"
/>
```

### ILanguageSwitcher

Professional language switching UI.

```vue
<ILanguageSwitcher 
  variant="dropdown"
  :preserve-route="true"
  :show-names="true"
/>
```

## 🎯 Composables

### useLocalizedText()

Simple text resolution:

```typescript
const text = useLocalizedText({
  en: "Read more",
  mr: "आणखी वाचा"
})
```

### useI18nEnhanced()

Enhanced i18n utilities:

```typescript
const { formatters, switchLocaleWithAnalytics } = useI18nEnhanced()

// Format currency, dates, numbers
const price = formatters.value.currency(29.99)
const date = formatters.value.date(new Date())

// Switch with analytics tracking
await switchLocaleWithAnalytics('mr')
```

## 🔧 Configuration

### Default Configuration

The layer provides sensible defaults:

```typescript
{
  i18n: {
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      redirectOn: 'root'
    },
    skipSettingLocaleOnNavigate: true
  }
}
```

### Override Configuration

Customize any aspect:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@incubrain/i18n-layer'],
  
  // Override defaults
  i18n: {
    defaultLocale: 'mr',  // Marathi first
    baseUrl: 'https://yoursite.com',
    detectBrowserLanguage: false  // Disable detection
  }
})
```

## 📊 Analytics

Basic language preference tracking is included:

- Language switches (manual)
- Missing translations
- User preferences

Configure via runtime config:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      i18nLayer: {
        analytics: {
          enabled: true,
          provider: 'google'  // or 'custom'
        }
      }
    }
  }
})
```

## 🎨 Styling

Components use your project's design system:

```vue
<ILanguageSwitcher 
  :ui="{
    button: 'custom-button-class',
    activeButton: 'custom-active-class'
  }"
/>
```

## 📁 File Structure

```
your-project/
├── locales/
│   ├── english.json
│   └── marathi.json
├── content/
│   ├── blog/
│   │   ├── english/
│   │   └── marathi/
└── nuxt.config.ts
```

## 🔄 Migration

### From Manual i18n

Replace manual locale checking:

```vue
<!-- Before -->
<h1 v-if="locale === 'en'">{{ content.title.en }}</h1>
<h1 v-else>{{ content.title.mr }}</h1>

<!-- After -->
<ILocalizedContent 
  :content="content.title"
  component="h1"
/>
```

### From Basic Language Switcher

Upgrade to professional component:

```vue
<!-- Before -->
<button @click="setLocale('en')">English</button>
<button @click="setLocale('mr')">मराठी</button>

<!-- After -->
<ILanguageSwitcher variant="buttons" />
```

## 🤝 Contributing

1. Clone the repository
2. Install dependencies: `npm install`
3. Start playground: `npm run dev`
4. Make changes and test
5. Submit PR

## 📄 License

MIT © Incubrain Team

## 🔗 Links

- [Documentation](https://github.com/incubrain/i18n-layer)
- [Issues](https://github.com/incubrain/i18n-layer/issues)
- [Changelog](https://github.com/incubrain/i18n-layer/releases)