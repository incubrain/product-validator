<script setup lang="ts">
const data = useFlowSection('solution');
const methodology = useFlowSection('methodology');
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
    <ISeparator v-if="data.separators?.[0]" v-bind="data.separators[0]" />

    <!-- Validation Examples (from methodology config) -->
    <div v-if="methodology?.examples?.length" class="space-y-6">
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="example in methodology.examples"
          :key="example.company"
          class="rounded-lg border border-default p-4 space-y-3 bg-muted/20"
        >
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-highlighted text-base">
              {{ example.company }}
            </h4>
            <UBadge
              :label="String(example.year)"
              size="xs"
              variant="subtle"
              color="neutral"
            />
          </div>
          <ul class="space-y-2 text-sm text-muted">
            <li
              v-for="(step, i) in example.approach"
              :key="i"
              class="flex items-start gap-2"
            >
              <span class="text-primary shrink-0">→</span>
              <span>{{ step }}</span>
            </li>
          </ul>
          <div class="pt-2 border-t border-default">
            <p class="text-sm font-semibold text-success">
              Result: {{ example.result }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Separator -->
    <ISeparator v-if="data.separators?.[1]" v-bind="data.separators[1]" />

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
            <p><strong>Problem:</strong> {{ alt.problem }}</p>
            <p><strong>Cost:</strong> {{ alt.cost }}</p>
            <p class="font-bold">{{ alt.why_fails }}</p>
          </div>
        </template>

        <template #footer>
          <div v-if="alt.examples?.length" class="pt-2 border-t border-default">
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
