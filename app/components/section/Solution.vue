<script setup lang="ts">
const data = useFlowSection('solution');
</script>

<template>
  <ISectionWrapper id="#solution" :intro="data.intro" :bridge="data.bridge">
    <!-- Outcomes Features Grid -->
    <UPageGrid v-if="data?.outcomes?.length">
      <UPageFeature
        v-for="(outcome, i) in data.outcomes"
        :key="i"
        :title="outcome.title"
        :description="outcome.description"
        :icon="outcome.icon"
        orientation="vertical"
      />
    </UPageGrid>

    <!-- Separator -->
    <ISeparator
      v-if="data.separators?.[0]"
      v-bind="data.separators[0]"
    />

    <!-- Alternatives Grid -->
    <UPageGrid v-if="data?.alternatives?.length" class="lg:grid-cols-3">
      <UPageCard
        v-for="alt in data.alternatives"
        :key="alt.id"
        :title="alt.title"
        variant="outline"
        spotlight
        spotlight-color="error"
        :ui="{
          footer: 'w-full',
        }"
      >
        <template #leading>
          <UIcon name="i-lucide-x-circle" class="text-error size-6" />
        </template>

        <template #description>
          <div class="space-y-3 text-sm">
            <!-- {EXTRACT} -->
            <p><strong>Problem:</strong> {{ alt.problem }}</p>
            <p><strong>Cost:</strong> {{ alt.cost }}</p>
            <p class="italic text-error font-medium">{{ alt.why_fails }}</p>
          </div>
        </template>

        <template #footer>
          <div v-if="alt.examples?.length" class="pt-2 border-t border-default">
            <!-- {EXTRACT} -->
            <p class="text-xs text-dimmed mb-1">Examples:</p>
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="example in alt.examples"
                :key="example"
                :label="example"
                size="xs"
                variant="soft"
                color="neutral"
              />
            </div>
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </ISectionWrapper>
</template>
