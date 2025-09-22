<script setup lang="ts">
/*
PURPOSE
- Target audience fit + competitive differentiation
- Uses cleaned positioning data: category, approach, notFor, compare
*/
const pos = useFlowSection('positioning');
const sections = useFlowSection('positioning').sections;
</script>

<template>
  <UPageSection
    :icon="sections?.intro?.icon"
    :headline="sections?.intro?.headline"
    :title="sections?.intro?.title"
    :description="sections?.intro?.description"
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
          orientation="horizontal"
        />
      </UPageGrid>
    </div>

    <!-- Comparison table -->
    <ISeparator
      :label="pos.sections.separators.comparison.label"
      :description="pos.sections.separators.comparison.description"
    />

    <UPageCard
      v-if="pos?.comparison"
      class="mb-8"
      spotlight-color="info"
      spotlight
      variant="naked"
    >
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
            'w-full table-fixed border rounded-lg border-spacing-x-0 hidden md:table',
        }"
      >
        <template #us-title="{ tier }">
          <div class="flex items-center justify-center gap-2">
            <span class="font-semibold text-highlighted">{{ tier.title }}</span>
          </div>
        </template>
      </UPricingTable>
    </UPageCard>
    <INavBridge v-if="pos?.sections?.bridge" :bridge="pos.sections.bridge" />
  </UPageSection>
</template>
