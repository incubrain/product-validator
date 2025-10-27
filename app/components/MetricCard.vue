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

        <!-- Thresholds -->
        <div class="space-y-3">
          <!-- Weak -->
          <div class="space-y-1.5">
            <div
              class="flex items-center justify-between p-2 rounded bg-error/10 border border-error/30"
            >
              <span class="text-xs font-medium text-error">Weak</span>
              <span class="text-xs font-bold text-error">
                {{ card.thresholds.weak.range }}
              </span>
            </div>
            <p class="text-xs text-dimmed leading-snug">
              {{ card.thresholds.weak.meaning }}
            </p>
          </div>

          <!-- Average -->
          <div class="space-y-1.5">
            <div
              class="flex items-center justify-between p-2 rounded bg-warning/10 border border-warning/30"
            >
              <span class="text-xs font-medium text-warning">Average</span>
              <span class="text-xs font-bold text-warning">
                {{ card.thresholds.average.range }}
              </span>
            </div>
            <p class="text-xs text-dimmed leading-snug">
              {{ card.thresholds.average.meaning }}
            </p>
          </div>

          <!-- Strong -->
          <div class="space-y-1.5">
            <div
              class="flex items-center justify-between p-2 rounded bg-success/10 border border-success/30"
            >
              <span class="text-xs font-medium text-success">Strong</span>
              <span class="text-xs font-bold text-success">
                {{ card.thresholds.strong.range }}
              </span>
            </div>
            <p class="text-xs text-dimmed leading-snug">
              {{ card.thresholds.strong.meaning }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </UPageCard>
</template>
