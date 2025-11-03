<!-- ~/components/MetricCard.vue -->
<script setup lang="ts">
import type { ProcessStep } from '#shared/types/config';

defineProps<ProcessStep>();
</script>

<template>
  <UPageCard
    :title="card.title"
    spotlight
    spotlight-color="secondary"
    class="h-full"
    :ui="{
      body: 'space-y-4 flex flex-col',
      title: 'text-lg font-bold',
    }"
  >
    <template #leading>
      <UIcon :name="card.icon" class="text-info size-5" />
    </template>

    <template #description>
      <div class="space-y-4 flex-1">
        <!-- Step Header -->
        <div class="space-y-2">
          <h4 class="text-base font-bold text-highlighted">
            {{ title }}
          </h4>
          <p class="text-sm text-muted leading-relaxed">
            {{ description }}
          </p>
        </div>

        <!-- Metric Description -->
        <div class="pt-3 border-t border-default">
          <p class="text-sm text-dimmed font-medium">
            {{ card.description }}
          </p>
        </div>

        <div class="space-y-3">
          <IMetric
            level="weak"
            :range="card.thresholds.weak.range"
            :meaning="card.thresholds.weak.meaning"
          />
          <IMetric
            level="average"
            :range="card.thresholds.average.range"
            :meaning="card.thresholds.average.meaning"
          />
          <IMetric
            level="strong"
            :range="card.thresholds.strong.range"
            :meaning="card.thresholds.strong.meaning"
          />
        </div>
      </div>
    </template>
  </UPageCard>
</template>
