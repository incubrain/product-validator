<!-- components/blog/BlogContent.vue -->
<script setup lang="ts">
interface Props {
  posts: any[]
  loading?: boolean
  showFeatured?: boolean
  title?: string
  badge?: string
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showFeatured: true,
  title: 'Recent Posts',
  badge: 'Latest',
  emptyMessage: 'No posts found',
})

// Separate featured and regular posts
const featuredPosts = computed(() =>
  props.showFeatured ? props.posts.filter((p) => p.featured).slice(0, 2) : [],
)

const route = useRoute()
</script>

<!-- components/blog/BlogContentSection.vue -->
<template>
  <div class="space-y-component">
    <!-- Featured Posts Section -->
    <section v-if="showFeatured && featuredPosts.length">
      <Header
        title="Featured Posts"
        badge="Curated"
        badge-color="primary"
      />
      <LayoutGrid variant="cards">
        <BlogPostCard
          v-for="post in featuredPosts"
          :key="`featured-${post.path}`"
          featured
          :post="post"
          :loading="loading"
        />
      </LayoutGrid>
    </section>

    <!-- Main Posts Section -->
    <section>
      <Header
        :title="title"
        :badge="badge"
      />

      <NavPagination
        content-type="blog"
        :category="route.query.category"
      >
        <template
          #default="{
            items,
            loading,
            error,
            hasData,
            isEmpty,
          }"
        >
          <!-- Error State -->
          <div
            v-if="error"
            class="text-center py-section"
          >
            <UIcon
              name="i-lucide-alert-circle"
              class="size-12 text-error mx-auto mb-component"
            />
            <h3 class="text-lg font-medium text-error mb-2">
              Failed to Load Content
            </h3>
            <p class="text-muted">
              {{ error?.message || 'Please try again later' }}
            </p>
          </div>

          <!-- Loading State -->
          <LayoutGrid
            v-else-if="loading"
            variant="cards"
          >
            <BlogPostCardSkeleton
              v-for="i in 6"
              :key="`skeleton-${i}`"
            />
          </LayoutGrid>

          <!-- Content State -->
          <LayoutMotion
            v-else-if="hasData && items.length"
            preset="feature-grid"
            :stagger="150"
          >
            <LayoutGrid variant="cards">
              <BlogPostCard
                v-for="(item, i) in items"
                :key="`${item.path}-${i}`"
                :post="item"
              />
            </LayoutGrid>
          </LayoutMotion>

          <!-- Empty State Instead of this -->
          <div
            v-else-if="isEmpty"
            class="text-center py-section"
          >
            <UIcon
              name="i-lucide-file-text"
              class="size-12 text-dimmed mx-auto mb-component"
            />
            <h3 class="text-lg font-medium text-highlighted mb-2">
              No posts yet
            </h3>
            <p class="text-muted">
              Check back soon for new content!
            </p>
          </div>
        </template>
      </NavPagination>
    </section>
  </div>
</template>
