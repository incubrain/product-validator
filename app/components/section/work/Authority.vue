<!-- app/components/section/work/Authority.vue -->
<!-- MOVED FROM: app/components/section/Work.vue -->
<script setup lang="ts">
import type { WorkSection } from '#shared/types/sections'
import type { IntentConfig } from '#shared/types/website-intention'

defineProps<Omit<WorkSection, 'type'>>()

const authorityConfig: IntentConfig = {
  background: 'circuit',
  sectionVariant: 'default',
  emphasis: 'expertise',
  colorScheme: 'primary',
}

// Get featured blog posts for authority building
const { data: blogPosts } = await useAsyncData('featured-blog-posts', () =>
  queryCollection('blog')
    .where('featured', '=', true)
    .order('date', 'DESC')
    .limit(6)
    .all(),
)
</script>

<template>
  <LayoutSection
    :variant="authorityConfig.sectionVariant"
    :background="authorityConfig.background"
    class="authority-work"
  >
    <LayoutCenter variant="prose">
      <LayoutStack variant="spacious">
        <!-- Authority-focused header -->
        <LayoutCenter variant="text-only">
          <LayoutStack variant="default">
            <LayoutHeading
              :text="title"
              variant="section"
              anchor
            />

            <LayoutText
              v-if="subtitle"
              :text="subtitle"
              variant="subtitle"
            />
          </LayoutStack>
        </LayoutCenter>

        <!-- Featured Work Grid - Expertise showcase -->
        <LayoutGrid
          v-if="blogPosts?.length"
          variant="thirds"
        >
          <BlogPostCard
            v-for="post in blogPosts.slice(0, 6)"
            :key="post.path"
            :post="post"
            :featured="false"
            class="authority-card"
          />
        </LayoutGrid>
      </LayoutStack>
    </LayoutCenter>
  </LayoutSection>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.authority-work {
  --section-emphasis: expertise;
}

.authority-card {
  @apply border-primary/20 hover:border-primary/40;
}
</style>
