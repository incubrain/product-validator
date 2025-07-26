<!-- app/pages/index.vue -->
<script setup lang="ts">
// Fetch page content from Nuxt Content
const { data: pageContent } = await useAsyncData('home-page', () =>
  queryCollection('pages').path('/').first(),
)

// Load business config
const businessConfig = useConfig('business')

console.log('🔍 Home Page Content:', pageContent.value)
console.log('🏢 Business Config:', businessConfig)

// SEO Integration
const seo = await useSeoDefaults(pageContent.value)
seo.apply()
</script>

<template>
  <div>
    <ContentRenderer
      v-if="pageContent"
      :value="pageContent"
      :data="businessConfig"
    />
  </div>
</template>
