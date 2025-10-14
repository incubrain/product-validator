<script setup lang="ts">
const methodology = useFlowSection('methodology');
</script>

<template>
  <ISectionWrapper
    v-if="methodology"
    id="#methodology"
    :intro="methodology.intro"
  >
    <!-- Conversion Benchmarks Grid -->
    <div class="space-y-4">
      <UPageGrid>
        <UPageCard
          v-for="metric in methodology.framework.metrics"
          :key="metric.id"
          :title="metric.name"
          spotlight
          :ui="{ body: 'space-y-4' }"
        >
          <template #leading>
            <UIcon :name="metric.icon" class="text-info size-5" />
          </template>

          <template #description>
            <div class="space-y-3">
              <p class="text-sm text-muted">{{ metric.description }}</p>

              <!-- Weak -->
              <div class="space-y-2">
                <div
                  class="flex items-center justify-between p-2 rounded bg-error/10 border border-error/30"
                >
                  <span class="text-sm font-medium text-error">Weak</span>
                  <span class="text-sm font-bold text-error">
                    {{ metric.thresholds.weak.range }}
                  </span>
                </div>
                <p class="text-xs text-dimmed">
                  {{ metric.thresholds.weak.meaning }}
                </p>
              </div>

              <!-- Average -->
              <div class="space-y-2">
                <div
                  class="flex items-center justify-between p-2 rounded bg-warning/10 border border-warning/30"
                >
                  <span class="text-sm font-medium text-warning">Average</span>
                  <span class="text-sm font-bold text-warning">
                    {{ metric.thresholds.average.range }}
                  </span>
                </div>
                <p class="text-xs text-dimmed">
                  {{ metric.thresholds.average.meaning }}
                </p>
              </div>

              <!-- Strong -->
              <div class="space-y-2">
                <div
                  class="flex items-center justify-between p-2 rounded bg-success/10 border border-success/30"
                >
                  <span class="text-sm font-medium text-success">Strong</span>
                  <span class="text-sm font-bold text-success">
                    {{ metric.thresholds.strong.range }}
                  </span>
                </div>
                <p class="text-xs text-dimmed">
                  {{ metric.thresholds.strong.meaning }}
                </p>
              </div>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>

    <!-- Decision Framework -->
    <div class="space-y-4">
      <UPageFeature
        title="Your Validation Decision Framework"
        icon="i-lucide-git-branch"
      />

      <div class="space-y-4">
        <div class="grid md:grid-cols-3 gap-4">
          <!-- Build -->
          <div
            :class="[
              'rounded-lg border p-4 space-y-2',
              `border-${methodology.framework.decisions.build.color}/30`,
              `bg-${methodology.framework.decisions.build.color}/5`,
            ]"
          >
            <div class="flex items-center gap-2">
              <UIcon
                :name="methodology.framework.decisions.build.icon"
                :class="`text-${methodology.framework.decisions.build.color} size-5`"
              />
              <h4
                :class="[
                  'font-semibold',
                  `text-${methodology.framework.decisions.build.color}`,
                ]"
              >
                {{ methodology.framework.decisions.build.label }}
              </h4>
            </div>
            <p class="text-sm text-toned">
              {{ methodology.framework.decisions.build.threshold }} →
              {{ methodology.framework.decisions.build.action }}
            </p>
            <p class="text-xs text-dimmed">
              {{ methodology.framework.decisions.build.description }}
            </p>
          </div>

          <!-- Refine -->
          <div
            :class="[
              'rounded-lg border p-4 space-y-2',
              `border-${methodology.framework.decisions.refine.color}/30`,
              `bg-${methodology.framework.decisions.refine.color}/5`,
            ]"
          >
            <div class="flex items-center gap-2">
              <UIcon
                :name="methodology.framework.decisions.refine.icon"
                :class="`text-${methodology.framework.decisions.refine.color} size-5`"
              />
              <h4
                :class="[
                  'font-semibold',
                  `text-${methodology.framework.decisions.refine.color}`,
                ]"
              >
                {{ methodology.framework.decisions.refine.label }}
              </h4>
            </div>
            <p class="text-sm text-toned">
              {{ methodology.framework.decisions.refine.threshold }} →
              {{ methodology.framework.decisions.refine.action }}
            </p>
            <p class="text-xs text-dimmed">
              {{ methodology.framework.decisions.refine.description }}
            </p>
          </div>

          <!-- Pivot -->
          <div
            :class="[
              'rounded-lg border p-4 space-y-2',
              `border-${methodology.framework.decisions.pivot.color}/30`,
              `bg-${methodology.framework.decisions.pivot.color}/5`,
            ]"
          >
            <div class="flex items-center gap-2">
              <UIcon
                :name="methodology.framework.decisions.pivot.icon"
                :class="`text-${methodology.framework.decisions.pivot.color} size-5`"
              />
              <h4
                :class="[
                  'font-semibold',
                  `text-${methodology.framework.decisions.pivot.color}`,
                ]"
              >
                {{ methodology.framework.decisions.pivot.label }}
              </h4>
            </div>
            <p class="text-sm text-toned">
              {{ methodology.framework.decisions.pivot.threshold }} →
              {{ methodology.framework.decisions.pivot.action }}
            </p>
            <p class="text-xs text-dimmed">
              {{ methodology.framework.decisions.pivot.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </ISectionWrapper>
</template>
