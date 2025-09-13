<script setup lang="ts">
interface Props {
  content: {
    headline?: string;
    quote: string;
    user: {
      name: string;
      description: string;
      avatar: { src: string; alt: string };
    };
  };
}

const { content } = defineProps<Props>();
</script>

<template>
  <UPageSection
    orientation="vertical"
    class="bg-muted"
    :ui="{
      container: 'py-16 sm:py-24 lg:py-32 max-w-4xl mx-auto text-center',
    }"
  >
    <div class="font-family-written text-3xl -rotate-4">
      {{ content.headline }}
    </div>
    <blockquote
      class="relative border-2 border-dashed border-primary-500/30 rounded-lg p-8 mb-8"
    >
      <p class="text-lg sm:text-xl leading-relaxed text-gray-200">
        "{{ content.quote }}"
      </p>
    </blockquote>

    <UUser
      :name="content.user.name"
      :description="content.user.description"
      :avatar="content.user.avatar"
      size="xl"
      class="justify-center"
    />
  </UPageSection>
</template>
