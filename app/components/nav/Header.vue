<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Get blog categories for navigation
const { data: blogCategories } = await useAsyncData('header-blog-categories', () =>
  queryCollection('blog')
    .select('category')
    .all()
    .then((posts) => {
      const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))]
      return categories.sort()
    }),
)

const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-home',
  },
  {
    label: 'Blog',
    icon: 'i-lucide-file-text',
    to: '/blog',
    children: blogCategories.value
      ? [
          {
            label: 'All Posts',
            to: '/blog',
            description: 'View all blog posts',
          },
          ...blogCategories.value.map((category) => ({
            label: getCategoryName(category),
            to: `/blog/${category}`,
            description: `${getCategoryName(category).toLowerCase()} articles`,
          })),
        ]
      : [],
  },
])

const isMobileMenuOpen = ref(false)
const { public: config } = useRuntimeConfig()
</script>

<template>
  <header class="sticky top-0 z-50 bg-elevated/80 backdrop-blur-md border-b border-default">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <Logo size="md" />
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex relative w-full">
          <UNavigationMenu
          class="w-full flex justify-center"
            :items="navigationItems"
            color="neutral"
            variant="link"
          />
        </nav>

        <!-- Desktop CTA + Mobile Menu Button -->
        <div class="flex items-center space-x-4 relative">
          <NavSearch
            variant="button"
            size="sm"
            placeholder="Search..."
            class="hidden sm:block"
          />
          <UButton
            label="Free Consultation"
            color="primary"
            variant="solid"
            size="sm"
            class="hidden md:inline-flex"
            :to="`https://wa.me/${config.whatsappNumber}?text=Hi! I'm interested in AI automation consultation.`"
            target="_blank"
            trailing-icon="i-lucide-external-link"
          />

          <div class="flex items-center space-x-2 sm:hidden">
            <NavSearch
              variant="button"
              size="sm"
              placeholder=""
            />
            <UButton
              variant="ghost"
              color="neutral"
              size="sm"
              square
              aria-label="Open mobile menu"
              @click="isMobileMenuOpen = true"
            >
              <UIcon
                name="i-lucide-menu"
                class="size-4"
              />
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Mobile Navigation Component -->
    <NavMobile
      v-model:open="isMobileMenuOpen"
      :navigation-items="navigationItems"
      :blog-categories="blogCategories"
    />
  </header>
</template>
