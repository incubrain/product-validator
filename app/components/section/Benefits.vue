<!-- ~/components/section/benefits.vue -->
<script setup lang="ts">
const props = defineProps<{
  data?: {
    intro?: any;
    cta?: any;
    statement?: string;
    items?: any[];
  };
}>();

const cards = computed(() => props.data?.items || []);

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper
    v-if="showSection('benefits')"
    id="#benefits"
    :intro="data.intro"
    :cta="data.cta"
    has-bottom
  >
    <UPageGrid>
      <UPageCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        variant="outline"
        :ui="{
          description: 'text-pretty leading-relaxed',
        }"
      >
        <template #leading>
          <UIcon :name="card.icon" class="size-5 text-secondary" />
        </template>
      </UPageCard>
    </UPageGrid>
  </ISectionWrapper>
</template>
