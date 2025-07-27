<script setup lang="ts">
const route = useRoute()
const category = route.params.category
const slug = route.params.slug

const { data: post } = await useAsyncData(`blog-${category}-${slug}`, () => {
  return queryCollection('blog').path(route.path).first()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found',
  })
}

const { getComponent } = useSectionComponents()

// SEO Integration
// useSeoMeta(post.value.seo || {})
// useHead(post.value.head || {})
//
// // OG Image
// if (import.meta.server && post.value?.ogImage) {
//   defineOgImage({
//     component: 'Nuxt',
//     props: {
//       headline: post.value.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
//       title: post.value.title,
//       description: post.value.description,
//     },
//   })
// }
//
// // Schema.org
// useSchemaOrg([
//   defineArticle({
//     headline: post.value.title,
//     description: post.value.description,
//     image: post.value.image || '/default-blog-image.png',
//     datePublished: post.value.date,
//     dateModified: post.value.date,
//     author: {
//       '@type': 'Organization',
//       'name': post.value.author,
//     },
//     publisher: {
//       '@type': 'Organization',
//       'name': 'Incubrain ltd.',
//       'logo': '/logo.png',
//     },
//     articleSection: post.value.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
//     keywords: post.value.tags || [],
//   }),
// ])

const seo = await useSeoDefaults(post.value)
seo.apply()

// Extract TOC from content (if available)
const tableOfContents = computed(() => {
  return post.value?.body?.toc // This comes from our enhanced TOC config
})

const currentUrl = computed(() => {
  const { public: config } = useRuntimeConfig()
  return `${config.siteUrl || 'https://incubrain.org'}${post.value?.path}`
})
</script>

<template>
  <div v-if="post">
    <!-- Progress Bar -->
    <UContainer>
      <div class="max-w-7xl mx-auto">
        <!-- Article Header -->
        <BlogArticleHeader
          :title="post.title"
          :description="post.description"
          :author="post.author || 'Drew MacGibbon'"
          :date="post.date"
          :read-time="post.readTime"
          :category="post.category"
          :tags="post.tags"
          :image="post.image"
        />

        <div class="grid grid-cols-1 xl:grid-cols-[1fr_700px_1fr] gap-8 xl:gap-8">
          <!-- Table of Contents (Desktop Sidebar) -->
          <aside class="xl:col-span-1 order-2 xl:order-1 relative border-r border-default pr-4">
            <BlogArticleTableOfContents :toc="tableOfContents" />
          </aside>

          <!-- Main Content -->
          <main class="order-1 xl:order-2 w-full max-w-3xl mx-auto xl:max-w-none px-4 xl:px-8">
            <article>
              <ContentRenderer :value="post" />
            </article>

            <Header
              class="py-8"
              title="Did you like it?"
              badge="help us grow"
            >
              <template #end>
                <SocialShare
                  :title="post.title"
                  :url="currentUrl"
                  :description="post.description"
                />
              </template>
            </Header>

            <component
              :is="getComponent('cta', 'authority', 1)"
              :section-index="1"
              title="Never Miss AI Breakthroughs"
              subtitle="Weekly insights on automation strategies"
              class="rounded-2xl bg-primary-100/10"
            />

            <BlogArticleAuthorBio />

            <!-- <ContentRelated
              collection="blog"
              :current-path="post.path"
              related-by="category"
              :related-value="post.category"
              title="Related Articles"
              badge="Continue Learning"
            >
              <template #default="{ items = [] }">
                <BlogPostCard
                  v-for="item in items"
                  :key="item.path"
                  :post="item"
                />
              </template>
            </ContentRelated> -->
            <div class="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <NavSurroundings
                collection="blog"
                :current-path="post.path"
              />
            </div>
          </main>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";
</style>
