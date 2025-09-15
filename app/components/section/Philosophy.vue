<script setup lang="ts">
interface Props {
  content: {
    headline: string;
    title: string;
    description: string;
    principles: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}
const { content } = defineProps<Props>();
</script>

<template>
  <UPageSection
    :headline="content.headline"
    :title="content.title"
    :description="content.description"
    orientation="vertical"
    :ui="{ container: 'py-16 sm:py-24 lg:py-32' }"
  >
    <!-- Philosophy Cards Grid -->
    <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
      <UPageCard
        v-for="(principle, index) in content.principles"
        :key="index"
        :title="principle.title"
        :description="principle.description"
        :icon="principle.icon"
        variant="subtle"
        class="relative"
      >
        <template #leading>
          <div
            class="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg ring-1 ring-primary/20"
          >
            <UIcon :name="principle.icon" class="text-primary text-lg" />
          </div>
        </template>
      </UPageCard>
    </div>
  </UPageSection>
</template>
