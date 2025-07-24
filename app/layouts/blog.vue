<!-- layouts/blog.vue -->
<script setup lang="ts">
const { data: metadata } = await useFetch('/api/content/metadata', {
  query: { collection: 'blog', category: 'all' },
  key: 'blog-metadata-all'
})
</script>

<template>
  <div class="min-h-screen bg-muted text-default antialiased">
    <NavHeader class="h-[var(--ui-nav-height)]" />

    <main class="min-h-[calc(100vh-4rem)]">
      <section class="section-spacing">
        <UContainer>
          <div class="grid grid-cols-1 lg:grid-cols-4 grid-spacing">
            <!-- Safe sidebar -->
            <LayoutSidebar
            class="lg:col-span-1 order-2 lg:order-1"
              content-type="blog"
              base-path="/blog"
              :category="$route.params.category?.[0]"
              title="Browse by Category"
              search-placeholder="Search posts..."
            >
              <template #search="{ placeholder }">
                <NavSearch :placeholder="placeholder" variant="input" size="md" />
              </template>
            </LayoutSidebar>

            <div class="lg:col-span-3 order-1 lg:order-2 space-y-component">
              <SectionHero
                title="AI Automation Insights"
                description="Real-world strategies for building AI automation pipelines"
                background-preset="neural"
                background-pattern="neural-network"
                enable-background-motion
                class="rounded-2xl"
              >
                <template #cta>
                  <div class="flex justify-center items-center space-x-4 text-sm text-dimmed">
                    <span>{{ metadata?.totalPosts || 0 }} insights</span>
                    <span>•</span>
                    <span>Updated regularly</span>
                  </div>
                </template>
              </SectionHero>

              <slot />

              <SectionCTA
                title="Never Miss AI Breakthroughs"
                subtitle="Weekly insights on automation strategies, technical deep-dives, and industry analysis."
              />
            </div>
          </div>
        </UContainer>
      </section>
    </main>

    <NavFooter />
  </div>
</template>
