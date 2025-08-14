<!-- layouts/blog.vue -->
<script setup lang="ts">
const { getComponent } = useSectionComponents()
</script>

<template>
  <div class="min-h-screen bg-muted text-default antialiased">
    <INavHeader class="h-[var(--ui-nav-height)]" />

    <main class="min-h-[calc(100vh-4rem)]">
      <section class="section-spacing">
        <UContainer>
          <div class="grid grid-cols-1 lg:grid-cols-4 grid-spacing">
            <!-- Hero: always first -->
            <component
              :is="getComponent('hero', 'authority', 0)"
              title="AI Automation Insights"
              description="Real-world strategies for building AI automation pipelines"
              class="rounded-2xl lg:col-span-3 order-1 lg:order-2"
              :section-index="0"
            />

            <!-- Sidebar: second on mobile, left column on desktop -->
            <ILayoutSidebar
              class="col-span-1 order-2 lg:order-1 lg:row-span-3"
              content-type="blog"
              base-path="/blog"
              :category="$route.params.category?.[0]"
              title="Browse by Category"
              search-placeholder="Search posts..."
            >
              <template #search="{ placeholder }">
                <INavSearch
                  :placeholder="placeholder"
                  variant="input"
                  size="md"
                />
              </template>
            </ILayoutSidebar>

            <!-- Main content: third on mobile, second row right column on desktop -->
            <div class="lg:col-span-3 order-3 lg:order-2">
              <slot />
            </div>

            <!-- CTA: fourth on mobile, third row right column on desktop -->
            <component
              :is="getComponent('cta', 'authority', 1)"
              :section-index="1"
              title="Never Miss AI Breakthroughs"
              subtitle="Weekly insights on automation strategies"
              class="rounded-2xl bg-primary-100/10 lg:col-span-3 order-4 lg:order-3"
            />
          </div>
        </UContainer>
      </section>
    </main>

    <INavFooter />
  </div>
</template>
