<!-- components/blog/BlogPostCardSkeleton.vue -->
<template>
  <UCard
    variant="outline"
    class="h-full"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <USkeleton class="h-5 w-24" />
        <USkeleton class="h-4 w-16" />
      </div>
    </template>

    <div class="space-y-4">
      <!-- Title skeleton -->
      <div class="space-y-2">
        <USkeleton class="h-6 w-full" />
        <USkeleton class="h-6 w-3/4" />
      </div>

      <!-- Description skeleton -->
      <div class="space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-2/3" />
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <USkeleton class="h-4 w-20" />
          <USkeleton class="h-4 w-16" />
        </div>
        <USkeleton class="h-4 w-12" />
      </div>
    </template>
  </UCard>
</template>
