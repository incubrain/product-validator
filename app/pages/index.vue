<script setup lang="ts">
const { show } = useSectionVisibility();
</script>

<template>
  <UPageBody class="mt-0 p-0 space-y-0">
    <ISectionHero v-if="show('hero')" />
    <ISectionProblemSolution v-if="show('problemSolution')" />
    <ISectionProcess v-if="show('process')" />
    <ISectionOffer v-if="show('offer')" />
    <ISectionFounder v-if="show('founder')" />
    <ISectionResults v-if="show('results')" />
    <ISectionConcerns v-if="show('concerns')" />
  </UPageBody>
</template>
