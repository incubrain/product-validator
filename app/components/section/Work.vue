<!-- app/components/section/Work.vue -->
<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()

// Get featured blog posts
const { data: blogPosts } = await useAsyncData('featured-blog-posts', () =>
  queryCollection('blog')
    .where('featured', '=', true)
    .order('date', 'DESC')
    .limit(6)
    .all()
)
</script>

<template>
  <section>
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-component max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-highlighted mb-4">{{ title }}</h2>
        <p class="text-xl text-muted">{{ subtitle }}</p>
      </div>

      <!-- Featured Work Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-spacing">
        <BlogPostCard
          v-for="post in blogPosts?.slice(0, 6)"
          :key="post.path"
          :post="post"
          :featured="false"
        />
      </div>
    </UContainer>
  </section>
</template>