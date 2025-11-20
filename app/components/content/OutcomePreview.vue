<script setup lang="ts">
interface Props {
  title?: string;
  items?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "What you'll achieve",
  items: () => [],
});
</script>

<template>
  <div class="my-8 rounded-xl border border-primary/10 bg-primary/5 p-6">
    <div class="flex items-center gap-3 mb-4">
      <div class="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
        <UIcon name="i-lucide-target" class="size-5" />
      </div>
      <h3 class="text-lg font-semibold text-foreground">
        {{ title }}
      </h3>
    </div>

    <ul class="space-y-3">
      <li v-for="(item, index) in items" :key="index" class="flex items-start gap-3">
        <UIcon name="i-lucide-check" class="size-5 text-primary mt-0.5 shrink-0" />
        <span class="text-foreground/80">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
