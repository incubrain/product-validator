<script setup lang="ts">
const { showSection } = useSectionVisibility();
</script>

<template>
  <UPageBody class="mt-0 p-0 space-y-0">
    <ISectionHero v-show="showSection('hero')" />
    <ISectionProblemSolution v-show="showSection('problemSolution')" />
    <ISectionProcess v-show="showSection('process')" />
    <ISectionOffer v-show="showSection('offer')" />
    <ISectionFounder v-show="showSection('founder')" />
    <ISectionResults v-show="showSection('results')" />
    <ISectionConcerns v-show="showSection('concerns')" />
  </UPageBody>
</template>
