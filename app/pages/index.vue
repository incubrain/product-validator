<!-- app/pages/index.vue -->
<script setup lang="ts">
// Fetch page content from Nuxt Content
const { data: pageContent } = await useAsyncData('home-page', () =>
  queryCollection('pages').path('/').first(),
)

console.log('🔍 Home Page Content:', pageContent.value)

// SEO Integration
const seo = await useSeoDefaults(pageContent.value)
seo.apply()
</script>

<template>
  <div>
    <ContentRenderer
      v-if="pageContent"
      :value="pageContent"
    />
  </div>
</template>
