<!-- ~/components/section/ProblemSolution.vue -->
<script setup lang="ts">
const data = useSectionConfig('problemSolution');
const cards = computed(() => data?.value.cards ?? []);
</script>

<template>
  <ISectionWrapper
    id="#problem-solution"
    :intro="data.intro"
    :bridge="data.bridge"
  >
    <UPageGrid>
      <UPageCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        spotlight
        spotlight-color="secondary"
        :ui="{
          description: 'text-pretty leading-relaxed',
        }"
      >
        <template #leading>
          <UIcon :name="card.icon" class="size-5 text-secondary" />
        </template>
      </UPageCard>
    </UPageGrid>
    <IMarqueeText v-if="data.statement" :text="data.statement" />
  </ISectionWrapper>
</template>
