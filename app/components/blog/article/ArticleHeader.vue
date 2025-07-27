<script setup lang="ts">
interface Props {
  title: string
  description: string
  author: string
  date: string
  readTime?: string
  category: string
  tags?: string[]
  image?: string
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <header class="my-12">
    <!-- Breadcrumb -->
    <nav
      class="mb-6"
      aria-label="Breadcrumb"
    >
      <ol class="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
        <li>
          <ULink
            to="/blog"
            class="hover:text-primary transition-colors"
          >
            Blog
          </ULink>
        </li>
        <li class="flex">
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4"
          />
        </li>
        <li>
          <ULink
            :to="`/blog/${category}`"
            class="hover:text-primary transition-colors"
          >
            {{ getCategoryName(category) }}
          </ULink>
        </li>
      </ol>
    </nav>

    <!-- Category Badge -->
    <div class="mb-6">
      <UBadge
        :label="getCategoryName(category)"
        variant="soft"
        color="primary"
        size="lg"
      />
    </div>

    <!-- Title (Always full width) -->
    <h1
      class="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight"
    >
      {{ title }}
    </h1>

    <!-- Two Column Layout (XL only) / Single Column (everything else) -->
    <div class="grid grid-cols-1 xl:grid-cols-6 gap-8 xl:gap-16 items-start">
      <!-- Content Column -->
      <div class="space-y-8 col-span-2">
        <!-- Tags -->
        <div
          v-if="tags?.length"
          class="flex flex-wrap gap-2"
        >
          <UBadge
            v-for="tag in tags"
            :key="tag"
            :label="tag"
            variant="outline"
            size="sm"
          />
        </div>

        <!-- Description -->
        <p class="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {{ description }}
        </p>

        <!-- Metadata -->
        <div class="flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div class="flex items-center space-x-2">
            <UIcon
              name="i-lucide-user"
              class="size-4"
            />
            <span>{{ author }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <UIcon
              name="i-lucide-calendar"
              class="size-4"
            />
            <span>{{ formatDate(date) }}</span>
          </div>
          <div
            v-if="readTime"
            class="flex items-center space-x-2"
          >
            <UIcon
              name="i-lucide-clock"
              class="size-4"
            />
            <span>{{ readTime }} read</span>
          </div>
        </div>

        <!-- Image for smaller screens (single column) -->
        <div
          v-if="image"
          class="xl:hidden"
        >
          <NuxtImg
            :src="`images/blog/${category}/${image}`"
            :alt="title"
            class="w-full aspect-[3/2] object-cover rounded-lg shadow-lg"
            loading="eager"
            format="webp"
          />
        </div>
      </div>

      <!-- Image Column (XL screens only) -->
      <div
        v-if="image"
        class="hidden xl:block w-full col-span-4"
      >
        <NuxtImg
          :src="`images/blog/${category}/${image}`"
          :alt="title"
          class="w-full aspect-[3/2] object-cover rounded-lg shadow-lg"
          loading="eager"
          format="webp"
          width="100%"
        />
      </div>
    </div>
    <Header
      class="pt-8"
      title="ROUND 1, FIGHT!"
      badge="Latest"
    />
  </header>
</template>
