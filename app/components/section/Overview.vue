<script setup lang="ts">
interface Props {
  content: {
    title: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
      icon: string;
      status?: 'available' | 'coming-soon';
    }>;
  };
}

const { content } = defineProps<Props>();
</script>

<template>
  <UPageSection
    :title="content.title"
    :description="content.description"
    orientation="vertical"
    :ui="{
      container: 'py-16 sm:py-24 lg:py-32',
    }"
  >
    <!-- Custom features slot to add status indicators -->
    <template #features>
      <div
        v-for="(feature, index) in content.features"
        :key="index"
        class="relative"
      >
        <!-- Feature Card -->
        <UPageFeature
          :description="feature.description"
          :icon="feature.icon"
          :class="{
            'opacity-75': feature.status === 'coming-soon',
          }"
        >
          <template #title>
            {{ feature.title }}
            <UBadge
              v-if="feature.status === 'coming-soon'"
              variant="soft"
              color="warning"
              size="sm"
              class="ml-2"
            >
              Coming Soon
            </UBadge>
          </template>
        </UPageFeature>
      </div>
    </template>
  </UPageSection>
</template>
