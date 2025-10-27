<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

type FAQType = 'warning' | 'objection' | 'support' | 'general';

const concernsData = useFlowSection('concerns');

// Priority order
// {EXTRACT}
const ORDER: FAQType[] = ['warning', 'objection', 'support', 'general'];

// {EXTRACT}
const TYPE_META: Record<
  FAQType,
  {
    label: string;
    icon: string;
    color: string;
  }
> = {
  warning: {
    label: 'Warnings',
    icon: 'i-lucide-triangle-alert',
    color: 'error',
  },
  objection: {
    label: 'Objections',
    icon: 'i-lucide-message-square',
    color: 'warning',
  },
  support: {
    label: 'Support',
    icon: 'i-lucide-headphones',
    color: 'success',
  },
  general: {
    label: 'General',
    icon: 'i-lucide-info',
    color: 'info',
  },
};

// Build and sort
const items = computed<AccordionItem[]>(
  () =>
    concernsData?.value.items
      ?.map((it, i: number) => {
        const meta = TYPE_META[it.type];
        return {
          value: String(i),
          label: it.q,
          content: it.a,
          icon: meta.icon,
          ui: {
            leadingIcon: `text-${meta.color}`,
            trigger: 'text-base font-medium py-4',
            body: 'text-muted pb-4 pl-7',
          },
        };
      })
      .sort(
        (a, b) =>
          ORDER.indexOf(concernsData.value.items[+a.value].type) -
          ORDER.indexOf(concernsData.value.items[+b.value].type),
      ) ?? [],
);

// Count items by type for legend
const typeCounts = computed(() => {
  const counts = { warning: 0, objection: 0, support: 0, general: 0 };
  concernsData?.value.items?.forEach((item) => {
    counts[item.type]++;
  });
  return counts;
});
</script>

<template>
  <ISectionWrapper
    id="#concerns"
    :intro="concernsData.intro"
    :bridge="concernsData.bridge"
  >
    <!-- Enhanced Legend with counts -->
    <div class="space-y-4">
      <div class="flex justify-center flex-wrap gap-2">
        <span
          v-for="(meta, type) in TYPE_META"
          :key="type"
          :class="[
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium',
            `border-${meta.color}/40`,
          ]"
        >
          <UIcon :name="meta.icon" :class="`size-3.5 text-${meta.color}`" />
          {{ meta.label }}
          <UBadge
            :label="String(typeCounts[type as keyof typeof typeCounts])"
            size="xs"
            variant="soft"
          />
        </span>
      </div>
    </div>

    <!-- Accordion -->
    <div class="w-full mx-auto">
      <UAccordion
        :items="items"
        type="multiple"
        :unmount-on-hide="false"
        :ui="{
          item: 'border-b border-default/50 first:border-t last:mb-0 overflow-hidden last:border-b',
          trigger:
            'group flex-1 flex items-center gap-3 font-medium text-sm p-4 hover:bg-muted/30 transition-colors',
          body: 'text-sm p-4 pt-0 leading-relaxed',
          content: 'pt-0 data-[state=open]:pt-4',
        }"
      />
    </div>
  </ISectionWrapper>
</template>
