<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { CATEGORY_NAMES, getCategoryName, getCategoryDescription } from '#shared/utils/blog'

const blogCategories = Object.keys(CATEGORY_NAMES)

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
    children: [
      {
        label: 'All Posts',
        to: '/blog',
        description: 'View all blog posts',
      },
      ...blogCategories.map(category => ({
        label: getCategoryName(category),
        to: `/blog/${category}`,
        description: getCategoryDescription(category),
      })),
    ],
  },
  {
    label: 'Showcase',
    icon: 'i-lucide-layout-template',
    to: '/showcase',
    children: [
      {
        label: 'Overview',
        to: '/showcase',
        description: 'Template system overview',
        icon: 'i-lucide-eye',
      },
      {
        label: 'Hero Sections',
        to: '/showcase/hero',
        description: 'Hero section variants',
        icon: 'i-lucide-zap',
      },
      {
        label: 'About Sections',
        to: '/showcase/about',
        description: 'About section layouts',
        icon: 'i-lucide-user',
      },
      {
        label: 'Work Sections',
        to: '/showcase/work',
        description: 'Portfolio and work displays',
        icon: 'i-lucide-briefcase',
      },
      {
        label: 'Results Sections',
        to: '/showcase/results',
        description: 'Achievement showcases',
        icon: 'i-lucide-trending-up',
      },
      {
        label: 'CTA Sections',
        to: '/showcase/cta',
        description: 'Call-to-action variants',
        icon: 'i-lucide-mouse-pointer-click',
      },
      {
        label: 'FAQ Sections',
        to: '/showcase/faq',
        description: 'Frequently asked questions',
        icon: 'i-lucide-help-circle',
      },
      {
        label: 'Layout Components',
        to: '/showcase/center',
        description: 'Layout system demos',
        icon: 'i-lucide-layout',
      },
      {
        label: 'Grid System',
        to: '/showcase/grid',
        description: 'Grid layout examples',
        icon: 'i-lucide-grid-3x3',
      },
      {
        label: 'Split Layouts',
        to: '/showcase/split',
        description: 'Split section demos',
        icon: 'i-lucide-columns',
      },
      {
        label: 'Stack Layouts',
        to: '/showcase/stack',
        description: 'Vertical stacking demos',
        icon: 'i-lucide-layers',
      },
    ],
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
            class="flex flex-grow mx-auto max-w-xl justify-center items-center"
            :items="navigationItems"
            color="neutral"
            content-orientation="horizontal"
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
