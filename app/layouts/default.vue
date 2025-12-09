<script lang="ts" setup>
const isDev = import.meta.dev;
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <NavBanner />
    <NavHeader />

    <main class="pb-12 lg:pb-16">
      <slot />
    </main>

    <NavFooter />
  </div>
</template>
