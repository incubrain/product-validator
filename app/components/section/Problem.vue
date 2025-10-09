<!-- app/components/section/Problem.vue -->
<script setup lang="ts">
const data = useFlowSection('problem');

const profile = computed(() => data?.value.customerProfile);
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
      <UPageCard variant="naked" class="lg:sticky lg:top-24 px-4">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-target" class="size-5 text-primary" />
            <h3 class="text-lg font-semibold">{{ profile?.label }}</h3>
          </div>
        </template>

        <div class="space-y-4">
          <p class="text-dimmed leading-relaxed">
            {{ profile?.description }}
          </p>

          <!-- Context chips -->
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(value, key) in profile?.context"
              :key="key"
              size="md"
              variant="soft"
              color="neutral"
            >
              {{ value }}
            </UBadge>
          </div>
        </div>
      </UPageCard>

      <!-- RIGHT: Pain Points -->
      <div class="space-y-8">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-alert-triangle" class="size-6 text-error" />
          <!-- {EXTRACT} -->
          <h3 class="text-xl font-bold">Identify Your Blockers</h3>
        </div>

        <div
          v-for="(pain, index) in profile?.pains"
          :key="pain.label"
          class="border-b-4 border-error/20 space-y-2 pb-8"
        >
          <div class="flex items-start justify-between gap-3 pb-2">
            <h4 class="font-semibold text-base">{{ pain.label }}</h4>
            <UBadge
              :label="`#${index + 1}`"
              size="xs"
              color="error"
              variant="subtle"
            />
          </div>

          <p class="text-sm text-dimmed">
            <UBadge color="warning" variant="soft">IMPACT</UBadge>
            {{ pain.impact }}
          </p>

          <p class="text-sm text-dimmed">
            <UBadge color="error" variant="soft">COST</UBadge>
            {{ pain.cost }}
          </p>

          <p class="text-sm">
            <UBadge color="success" variant="soft">REALITY</UBadge>
            {{ pain.reality }}
          </p>
        </div>
      </div>
    </div>
  </ISectionWrapper>
</template>
