<!-- ~/components/MetricCard.vue -->
<script setup lang="ts">

type ProcessStep = {
  id: string;
  title: string;
  icon: string;
  description: string;
  result: string;
  index: number
};

defineProps<ProcessStep>();
</script>

<template>
  <UPageCard
    :title="title"
    variant="ghost"
    :ui="{
      root: 'relative flex rounded-none',
      body: 'space-y-4 flex flex-col',
      title: 'text-lg font-bold',
    }"
  >
    <template #leading>
      <UBadge variant="subtle" class="rounded-full mr-2"> {{ index }} </UBadge>
      <UIcon :name="icon" class="text-secondary size-5" />
    </template>

    <template #title>
      {{ title }}
    </template>

    <template #description>
      <div class="space-y-4 flex-1">
        <!-- Step Header -->
        <div class="space-y-2">
          <p class="text-sm text-muted leading-relaxed">
            {{ description }}
          </p>
        </div>

        <!-- Metric Description -->
        <div class="pt-3 border-t border-default">
          <p class="text-sm text-dimmed font-medium">
            {{ result }}
          </p>
        </div>
      </div>
    </template>
  </UPageCard>
</template>
