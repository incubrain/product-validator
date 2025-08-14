<!-- pages/blog/[category]/index.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'blog' })

const route = useRoute()
const category = route.params.category as string

const { data: categoryPosts, pending } = await useAsyncData(`blog-category-${category}`, () =>
  queryCollection('blog').where('category', '=', category).order('date', 'DESC').all(),
)

if (!pending.value && !categoryPosts.value?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found',
  })
}

useHead({
  title: `${getCategoryName(category)} - Incubrain Blog`,
  meta: [
    {
      name: 'description',
      content: `Latest ${getCategoryName(category).toLowerCase()} insights and articles from Incubrain.`,
    },
  ],
})
</script>

<template>
  <BlogContent
    :posts="categoryPosts || []"
    :loading="pending"
    :show-featured="false"
    :title="getCategoryName(category)"
    badge="Latest"
    :empty-message="`No ${getCategoryName(category).toLowerCase()} posts yet`"
  />
</template>
