<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';
import type { FaqItem } from '#shared/config/overview';

type FAQType = 'warning' | 'objection' | 'support' | 'general';

const sections = useFlowSection('questions').sections;
const questions = useFlowSection('questions').items;

// Priority order
const ORDER: FAQType[] = ['warning', 'objection', 'support', 'general'];

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
const items = computed<AccordionItem[]>(() =>
  questions
    ?.map((it: FaqItem, i: number) => {
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
        ORDER.indexOf(questions[+a.value].type) -
        ORDER.indexOf(questions[+b.value].type),
    ),
);
</script>

<template>
  <UPageSection
    :icon="sections?.intro?.icon"
    :headline="sections?.intro?.headline"
    :title="sections?.intro?.title"
    :description="sections?.intro?.description"
    orientation="vertical"
  >
    <!-- Legend -->
    <div class="mb-5 flex justify-center flex-wrap gap-2">
      <span
        class="inline-flex items-center gap-1.5 rounded-full border border-error/40 px-2 py-1 text-xs"
      >
        <UIcon name="i-lucide-triangle-alert" class="size-3.5 text-error" />
        Warnings
      </span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full border border-warning/40 px-2 py-1 text-xs"
      >
        <UIcon name="i-lucide-message-square" class="size-3.5 text-warning" />
        OBJECTIONS
      </span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full border border-success/40 px-2 py-1 text-xs"
      >
        <UIcon name="i-lucide-headphones" class="size-3.5 text-success" />
        SUPPORT
      </span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full border border-info/30 px-2 py-1 text-xs"
      >
        <UIcon name="i-lucide-info" class="size-3.5 text-info" /> GENERAL
      </span>
    </div>

    <!-- Official API usage: items + (optional) multiple/unmount -->
    <UAccordion
      :items="items"
      type="multiple"
      :unmount-on-hide="false"
      :ui="{
        // keep default row chrome; item-level `ui.item` overrides the border color
        item: 'border-b border-default last:border-b-0',
        trigger:
          'group flex-1 flex items-center gap-2 font-medium text-sm py-3.5',
        body: 'text-sm pb-3.5',
      }"
    />
  </UPageSection>
</template>
