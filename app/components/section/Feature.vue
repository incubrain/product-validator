<script setup lang="ts">
interface Props {
  content: Array<{
    headline: string;
    title: string;
    description: string;
    features: Array<{ title: string; description: string; icon: string }>;
    image: string;
    orientation: string;
    reverse?: boolean;
  }>;
}

const { content } = defineProps<Props>();
</script>

<template>
  <template v-for="(section, index) in content" :key="index">
    <UPageSection
      :headline="section.headline"
      :title="section.title"
      :description="section.description"
      :features="section.features"
      :orientation="section.orientation"
      :reverse="section.reverse"
    >
      <NuxtImg
        :src="section.image"
        :alt="`${section.title} Example`"
        width="600"
        height="400"
        class="w-full rounded-lg shadow-lg"
        loading="lazy"
      />
    </UPageSection>
  </template>
</template>
