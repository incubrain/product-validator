<!-- pages/blog/index.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'blog' })

const { data: allPosts, pending } = await useAsyncData('blog-all-posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

useHead({
  title: 'Blog - AI Automation Insights',
  meta: [
    {
      name: 'description',
      content: 'AI automation insights, space tech expertise, and company updates from Incubrain.',
    },
  ],
})
</script>

<template>
  <BlogContent
    :posts="allPosts || []"
    :loading="pending"
    :show-featured="true"
    title="Recent Posts"
    badge="Latest"
  />
</template>
