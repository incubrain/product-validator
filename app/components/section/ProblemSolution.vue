<!-- ~/components/section/ProblemSolution.vue -->
<script setup lang="ts">
const props = defineProps<{
  data?: any;
}>();

// Fetch cards from features collection (process.yml)
const { data: processFile } = await useAsyncData('benefits-cards', () => 
  queryCollection('features').where('stem', '=', 'features/benefits').first()
);

const cards = computed(() => processFile.value?.items || []);

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper
    v-if="showSection('problemSolution')"
    id="#problem-solution"
    :intro="data.intro"
    :bridge="data.bridge"
    class="bg-muted/50"
  >
    <UPageGrid class="border-y py-4">
      <UPageCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        variant="ghost"
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
