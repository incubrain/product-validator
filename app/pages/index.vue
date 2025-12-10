<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('pages').path(route.path).first(),
);
</script>

<template>
  <UPageBody class="mt-0 p-0">
    <ContentRenderer v-if="page" :value="page" />
  </UPageBody>
</template>
