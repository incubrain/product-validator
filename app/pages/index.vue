<script setup lang="ts">
const { show } = useSectionVisibility();
</script>

<template>
  <UPageBody class="mt-0 p-0 space-y-0">
    <ISectionHero v-show="show('hero')" />
    <ISectionProblemSolution v-show="show('problemSolution')" />
    <ISectionProcess v-show="show('process')" />
    <ISectionOffer v-show="show('offer')" />
    <ISectionFounder v-show="show('founder')" />
    <ISectionResults v-show="show('results')" />
    <ISectionConcerns v-show="show('concerns')" />
  </UPageBody>
</template>
