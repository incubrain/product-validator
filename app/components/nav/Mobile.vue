<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface Props {
  navigationItems: NavigationMenuItem[]
  blogCategories?: string[]
}

defineProps<Props>()

const isOpen = defineModel<boolean>('open', { default: false })
const { public: config } = useRuntimeConfig()

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    side="right"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <Logo size="sm" />
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          square
          aria-label="Close mobile menu"
          @click="closeMenu"
        >
          <UIcon
            name="i-lucide-x"
            class="size-4"
          />
        </UButton>
      </div>
    </template>

    <template #body>
      <nav class="flex flex-col space-y-1">
        <!-- Main Navigation Items -->
        <ULink
          v-for="item in navigationItems"
          :key="item.label"
          :to="item.to"
          class="flex items-center space-x-3 px-3 py-3 rounded-lg text-toned hover:text-primary hover:bg-elevated transition-colors"
          @click="closeMenu"
        >
          <UIcon
            :name="item.icon"
            class="size-4"
          />
          <span class="font-medium">{{ item.label }}</span>
        </ULink>

        <!-- Blog Categories Section -->
        <div
          v-if="blogCategories?.length"
          class="pt-4 border-t border-default"
        >
          <p class="px-3 text-xs font-semibold text-dimmed uppercase tracking-wider mb-3">
            Blog Categories
          </p>

          <!-- All Posts - Same styling as categories -->
          <ULink
            to="/blog"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted hover:text-primary hover:bg-elevated transition-colors"
            @click="closeMenu"
          >
            <UIcon
              name="i-lucide-list"
              class="size-4"
            />
            <span class="text-sm">All Posts</span>
          </ULink>

          <!-- Category Links -->
          <ULink
            v-for="category in blogCategories"
            :key="category"
            :to="`/blog/${category}`"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted hover:text-primary hover:bg-elevated transition-colors"
            @click="closeMenu"
          >
            <UIcon
              name="i-lucide-folder"
              class="size-4"
            />
            <span class="text-sm">{{ getCategoryName(category) }}</span>
          </ULink>
        </div>
      </nav>
    </template>

    <template #footer>
      <div class="space-y-4 text-center">
        <UButton
          label="Free Consultation"
          color="primary"
          variant="solid"
          size="lg"
          block
          :to="`https://wa.me/${config.whatsappNumber}?text=Hi! I'm interested in AI automation consultation.`"
          target="_blank"
          trailing-icon="i-lucide-external-link"
          @click="closeMenu"
        />

        <div class="text-sm text-dimmed space-y-1">
          <p>Pune, Maharashtra</p>
          <p>{{ config.contactEmail }}</p>
        </div>
      </div>
    </template>
  </USlideover>
</template>
