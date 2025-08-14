<script setup lang="ts">
interface Props {
  post?: any
  loading?: boolean
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  featured: false,
})

// Unified UI configuration for Nuxt UI Card
const cardUI = computed(() => ({
  root: [
    'h-full',
    'motion-card', // Our motion-enhanced hover utility
    'border-motion', // Enhanced border transitions
    'group',
    'flex flex-col', // Enable flex layout for equal heights
    props.featured
      ? 'backdrop-glass-premium hover-premium'
      : 'bg-elevated/50 hover-professional',
  ].join(' '),
  header: 'p-4 sm:px-6 flex-shrink-0',
  body: 'p-4 sm:p-6 flex-grow flex flex-col space-y-4',
  footer: 'p-4 sm:px-6 flex-shrink-0',
}))
</script>

<template>
  <!-- Show skeleton when loading (no motion needed) -->
  <BlogPostCardSkeleton v-if="loading" />

  <UCard
    v-else
    variant="outline"
    :ui="cardUI"
  >
    <!-- Header slot -->
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Featured badge (automatically animated by MotionGroup) -->
          <UBadge
            v-if="featured"
            label="Featured"
            color="primary"
            variant="solid"
            size="sm"
            class="hover-premium badge"
          />

          <!-- Category badge (automatically animated by MotionGroup) -->
          <UBadge
            :label="getCategoryName(post?.category)"
            color="secondary"
            variant="soft"
            size="sm"
            class="hover-professional badge"
          />
        </div>

        <!-- Meta information (automatically animated by MotionGroup) -->
        <div class="flex items-center space-x-2 text-xs text-dimmed">
          <span>{{ post?.date || 'No date' }}</span>
          <span v-if="post?.readTime">•</span>
          <span v-if="post?.readTime">{{ post.readTime }}</span>
        </div>
      </div>
    </template>

    <!-- Default body slot -->
    <!-- Featured image area (automatically animated by MotionGroup) -->
    <div
      v-if="featured"
      class="relative aspect-video gradient-card-elevated flex items-center justify-center mb-4 rounded-md overflow-hidden flex-shrink-0"
    >
      <IImage
        :src="`images/blog/${post?.category}/${post?.image}`"
        :alt="post?.title || 'Blog post image'"
        class="w-full h-full hover-premium"
        aspect-ratio="video"
        object-fit="cover"
        loading="lazy"
        format="webp"
      />
    </div>

    <!-- Main content that grows to fill available space -->
    <div class="flex-grow flex flex-col">
      <!-- Post Title (h3 gets automatic animation) -->
      <ULink
        :to="post?.path || '#'"
        class="block title-link flex-shrink-0"
      >
        <h3
          class="font-bold text-highlighted line-clamp-2 transition-colors title-text hover-professional"
          :class="featured ? 'text-2xl' : 'text-lg'"
        >
          {{ post?.title || (featured ? 'Untitled Featured Post' : 'No title available') }}
        </h3>
      </ULink>

      <!-- Post Description (p gets automatic animation) -->
      <p class="text-dimmed line-clamp-3 flex-grow">
        {{
          post?.description
            || (featured
              ? 'No description available for this featured post.'
              : 'No description available')
        }}
      </p>
    </div>

    <!-- Footer (automatically animated by MotionGroup) -->
    <template #footer>
      <div class="flex items-center justify-between text-sm">
        <div class="text-muted">
          <span>{{ post?.author || 'Incubrain Team' }}</span>
        </div>

        <ULink
          :to="post?.path || '#'"
          class="text-primary hover:text-primary-600 transition-colors inline-flex items-center space-x-1 font-medium hover-professional button"
        >
          <span>{{ featured ? 'Read More' : 'Read' }}</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3 transition-transform group-hover:translate-x-1"
          />
        </ULink>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.title-link:hover .title-text {
  color: var(--ui-secondary);
}

.group:hover .title-link .title-text {
  color: var(--ui-secondary);
}

/* Enhanced motion states */
.group:hover .title-text {
  transform: translateY(-1px);
}

/* Featured card enhancements */
.backdrop-glass-premium {
  position: relative;
}

.backdrop-glass-premium::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-radial-primary);
  opacity: 0;
  transition: opacity var(--hover-duration) var(--hover-easing);
  pointer-events: none;
  border-radius: inherit;
}

.backdrop-glass-premium:hover::before {
  opacity: 1;
}
</style>
