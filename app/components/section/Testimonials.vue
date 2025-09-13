<script setup lang="ts">
interface Props {
  content: {
    headline: string;
    title: string;
    highlightCard: {
      title: string;
      description: string;
      icon: string;
      to: string;
    };
    testimonials: Array<{
      quote: string;
      user: {
        name: string;
        description: string;
        avatar: { src: string; alt: string };
      };
    }>;
  };
}

const { content } = defineProps<Props>();
</script>

<template>
  <UPageSection
    :headline="content.headline"
    :title="content.title"
    orientation="vertical"
  >
    <UPageColumns>
      <UPageCard
        :title="content.highlightCard.title"
        :description="content.highlightCard.description"
        :icon="content.highlightCard.icon"
        :to="content.highlightCard.to"
        variant="solid"
        :ui="{ leadingIcon: 'size-10' }"
      />

      <UPageCard
        v-for="(testimonial, index) in content.testimonials"
        :key="index"
        :description="testimonial.quote"
        variant="subtle"
        :ui="{
          description:
            'before:content-[open-quote] after:content-[close-quote]',
        }"
      >
        <template #footer>
          <UUser v-bind="testimonial.user" size="xl" />
        </template>
      </UPageCard>
    </UPageColumns>
  </UPageSection>
</template>
