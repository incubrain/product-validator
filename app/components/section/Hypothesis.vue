<script setup lang="ts">
const hypothesis = useFlowSection('hypothesis');

// primary profile
const primary = computed(
  () =>
    hypothesis?.customerProfiles?.find((p) => p.primary) ||
    hypothesis?.customerProfiles?.[0],
);

// core problem bits
const prob = computed(() => hypothesis?.problem ?? {});
const sol = computed(() => prob.value.solution ?? {});

// chips
const chips = computed(() => {
  const list: {
    icon: string;
    label: string;
    color?: 'info' | 'warning' | 'success' | 'error' | 'neutral';
  }[] = [];
  if (prob.value.frequency)
    list.push({
      icon: 'i-lucide-repeat',
      label: prob.value.frequency,
      color: 'info',
    });
  if (prob.value.severity)
    list.push({
      icon: 'i-lucide-zap',
      label: prob.value.severity,
      color: 'warning',
    });
  if (sol.value.promise)
    list.push({
      icon: 'i-lucide-bolt',
      label: sol.value.promise,
      color: 'success',
    });
  if (prob.value.cost)
    list.push({
      icon: 'i-lucide-siren',
      label: String(prob.value.cost),
      color: 'error',
    });
  return list;
});

// milestones (from primary outcomes)
const milestones = computed(() =>
  (primary.value?.outcomes ?? [])
    .map((o: any) => ({
      label: o.label,
      target: o.target, // days per your example data
    }))
    // keep the first 3 only for the hero-adjacent block
    .slice(0, 3),
);

// top triggers (limit to 4)
const triggers = computed(() => (prob.value.triggers ?? []).slice(0, 4));

// evidence (take strongest 2)
const evidence = computed(() =>
  (prob.value.evidence ?? [])
    .sort((a: any, b: any) => (b.strength ?? 0) - (a.strength ?? 0))
    .slice(0, 2)
    .map((e: any) => ({
      type: e.type,
      summary: e.summary,
      strength: e.strength ?? 3,
      icon:
        e.type === 'interview'
          ? 'i-lucide-users'
          : e.type === 'personal_experience'
          ? 'i-lucide-user'
          : e.type === 'survey'
          ? 'i-lucide-bar-chart-3'
          : e.type === 'usage_log'
          ? 'i-lucide-activity'
          : 'i-lucide-info',
    })),
);

// warnings / mitigations
const warnings = computed(() =>
  (sol.value.risks ?? []).map((r: any) => ({
    label: r.label,
    mitigation: r.mitigation,
  })),
);
</script>

<template>
  <UPageSection
    title="Why this works (fast)"
    description="Proof, timelines, and caveats for technical founders"
    icon="i-lucide-sparkles"
    orientation="vertical"
  >
    <!-- Key chips -->
    <div class="flex flex-wrap gap-2 mb-6 mx-auto justify-center">
      <UBadge
        v-for="(c, i) in chips"
        :key="i"
        :color="c.color || 'neutral'"
        variant="soft"
        class="px-3 py-1.5 rounded-full"
      >
        <UIcon :name="c.icon" class="size-4 mr-1.5" /> {{ c.label }}
      </UBadge>
    </div>

    <!-- 3-up grid: Milestones / Triggers / Evidence -->
    <UPageGrid>
      <!-- Milestones -->
      <UCard :ui="{ header: 'pb-2', body: 'pt-2' }">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-flag" class="size-4 text-success" />
            <span class="font-semibold">Fast-track milestones</span>
          </div>
        </template>
        <ul class="space-y-2">
          <li
            v-for="m in milestones"
            :key="m.label"
            class="flex items-start gap-3"
          >
            <div
              class="flex-none rounded-md border border-success/30 px-2 py-1 text-xs text-success"
            >
              {{ m.target }}d
            </div>
            <div class="text-sm text-default">{{ m.label }}</div>
          </li>
        </ul>
      </UCard>

      <!-- Triggers -->
      <UCard :ui="{ header: 'pb-2', body: 'pt-2' }">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-rss" class="size-4 text-warning" />
            <span class="font-semibold">You’ll recognize this if…</span>
          </div>
        </template>
        <ul class="grid grid-cols-1 gap-2">
          <li
            v-for="t in triggers"
            :key="t"
            class="text-sm px-3 py-2 rounded-md border border-warning/20 bg-muted/30"
          >
            {{ t }}
          </li>
        </ul>
      </UCard>

      <!-- Evidence -->
      <UCard :ui="{ header: 'pb-2', body: 'pt-2' }">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-badge-check" class="size-4 text-info" />
            <span class="font-semibold">Proof we’ve seen</span>
          </div>
        </template>
        <div class="space-y-3">
          <div
            v-for="e in evidence"
            :key="e.summary"
            class="flex items-start gap-3"
          >
            <UIcon :name="e.icon" class="size-4 mt-0.5 text-info" />
            <div class="flex-1">
              <div class="text-sm text-default">{{ e.summary }}</div>
              <div class="text-xs text-muted">
                Strength:
                <span v-for="n in 5" :key="n" class="inline-block">
                  <UIcon
                    :name="
                      n <= e.strength ? 'i-lucide-star' : 'i-lucide-star-half'
                    "
                    class="size-3 align-[-1px]"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UPageGrid>

    <!-- Warnings & mitigations -->
    <UCard
      v-if="warnings.length"
      class="mt-4"
      variant="outline"
      :ui="{ body: 'py-4' }"
    >
      <div class="flex items-center gap-2 mb-3">
        <UIcon name="i-lucide-triangle-alert" class="size-4 text-error" />
        <span class="font-semibold">Warnings & mitigations</span>
      </div>
      <ul class="space-y-2">
        <li v-for="w in warnings" :key="w.label" class="text-sm space-x-2">
          <span class="font-medium text-error">{{ w.label }}:</span>
          <span class="text-muted"> {{ w.mitigation }}</span>
        </li>
      </ul>
    </UCard>
  </UPageSection>
</template>
