<script setup lang="ts">
/*
PURPOSE
- Target audience fit + competitive differentiation
- Uses cleaned positioning data: category, approach, notFor, compare
*/
const pos = useFlowSection('positioning');
</script>

<template>
  <UPageSection
    :headline="pos.category"
    icon="i-lucide-target"
    title="Who it's for"
    description="Why this approach works"
    orientation="vertical"
  >
    <!-- Approach features grid -->
    <div v-if="pos?.approach?.length">
      <UPageGrid>
        <UPageFeature
          v-for="(approach, i) in pos.approach"
          :key="i"
          :title="approach.title"
          :description="approach.description"
          :icon="approach.icon"
          orientation="vertical"
        />
      </UPageGrid>
    </div>

    <!-- Comparison table -->
    <USeparator label="COMPARISON" />
    <div v-if="pos?.comparison" class="mb-8">
      <UPricingTable
        :tiers="pos.comparison.tiers"
        :sections="pos.comparison.sections"
        :ui="{
          featureTitle: 'text-sm text-default text-center',
          sectionTitle: 'font-semibold text-sm text-highlighted text-center',
          tierTitleWrapper: 'flex items-center justify-center gap-3',
          item: 'p-6 flex flex-col border-default border-none rounded-lg',
          th: 'py-4 font-normal text-center border-b border-default',
          td: 'px-6 py-4 text-center border-b border-default',
          thead: 'text-center',
          tbody:
            'last-of-type:[&_tr:last-child_th]:border-b-0 last-of-type:[&_tr:last-child_td]:border-b-0',
          table:
            'w-full table-fixed border rounded-2xl border-spacing-x-0 hidden md:table',
        }"
      >
        <template #us-title>
          <div class="flex items-center justify-center gap-2">
            <UIcon name="i-lucide-zap" class="size-4 text-primary" />
            <span class="font-semibold text-primary">Us</span>
          </div>
        </template>
      </UPricingTable>
    </div>
  </UPageSection>
</template>
