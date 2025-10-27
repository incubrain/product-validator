<!-- ~/components/section/ProblemSolution.vue -->
<script setup lang="ts">
const data = useFlowSection('problemSolution');

const cards = computed(() => data?.value.cards ?? []);
</script>

<template>
  <ISectionWrapper
    id="#problem-solution"
    :intro="data.intro"
    :bridge="data.bridge"
  >
    <!-- Problem-Solution Cards Grid -->
    <UPageGrid>
      <UPageCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        spotlight
        spotlight-color="secondary"
        :ui="{ body: 'space-y-3' }"
      >
        <template #leading>
          <UIcon :name="card.icon" class="size-5 text-secondary" />
        </template>

        <template #description>
          <div class="space-y-3">
            <!-- PROBLEM Section -->
            <p class="text-sm text-dimmed leading-relaxed">
              {{ card.problem }}
            </p>

            <!-- SOLUTION Section -->
            <p class="text-sm text-toned leading-relaxed">
              {{ card.solution }}
            </p>
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </ISectionWrapper>
</template>
