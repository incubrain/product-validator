<!-- app/components/section/Problem.vue -->
<script setup lang="ts">
const data = await useFlowSection('problem');

const profile = computed(() => data?.customerProfile);
</script>

<template>
  <ISectionWrapper
    id="#problem"
    :intro="data.intro"
    :bridge="data.bridge"
    class="bg-muted/20"
  >
    <!-- Two-column layout: Profile + Pains -->
    <div class="grid lg:grid-cols-2 gap-8 items-start">
      <!-- LEFT: Customer Profile Identity -->
      <UCard variant="ghost" class="lg:sticky lg:top-24">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-target" class="size-5 text-primary" />
            <h3 class="text-lg font-semibold">{{ profile?.label }}</h3>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-muted leading-relaxed">
            {{ profile?.description }}
          </p>

          <!-- Context chips -->
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(value, key) in profile?.context"
              :key="key"
              size="sm"
              variant="soft"
              color="neutral"
            >
              {{ value }}
            </UBadge>
          </div>
        </div>
      </UCard>

      <!-- RIGHT: Pain Points -->
      <div class="space-y-4 lg:space-y-12">
        <div class="flex items-center gap-3 mb-6">
          <UIcon name="i-lucide-alert-triangle" class="size-6 text-error" />
          <!-- {EXTRACT} -->
          <h3 class="text-xl font-semibold">Identify Your Blockers</h3>
        </div>

        <div
          v-for="(pain, index) in profile?.pains"
          :key="pain.label"
          class="p-5 border-b-4 border-error/20 space-y-2"
        >
          <div class="flex items-start justify-between gap-3">
            <h4 class="font-semibold text-base">{{ pain.label }}</h4>
            <UBadge
              :label="`#${index + 1}`"
              size="xs"
              color="error"
              variant="subtle"
            />
          </div>

          <p class="text-sm text-muted">
            <strong>Impact:</strong> {{ pain.impact }}
          </p>

          <p class="text-sm text-error">
            <strong>Cost:</strong> {{ pain.cost }}
          </p>

          <p class="text-sm text-success">
            <strong>Reality:</strong> {{ pain.reality }}
          </p>
        </div>
      </div>
    </div>
  </ISectionWrapper>
</template>
