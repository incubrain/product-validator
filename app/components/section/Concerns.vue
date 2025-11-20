<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

defineProps<{
  data?: any;
}>();

// Fetch FAQs from faq collection
const { data: faqFiles } = await useAsyncData('faqs', () => 
  queryCollection('faq').all()
);

// Flatten items - files are already sorted by filename (1.warning, 2.objection, etc.)
const allFaqs = computed(() => {
  if (!faqFiles.value) return [];
  
  return faqFiles.value.flatMap(file => 
    file.items.map(item => ({
      q: item.q,
      a: item.a,
      type: file.type,
      label: file.label,
      icon: file.icon,
      color: file.color,
    }))
  );
});

// Build accordion items - simple and clean!
const items = computed<AccordionItem[]>(() =>
  allFaqs.value.map((faq, i) => ({
    value: String(i),
    label: faq.q,
    content: faq.a,
    icon: faq.icon,
    ui: {
      leadingIcon: `text-${faq.color}`,
      trigger: 'text-base font-medium py-4',
      body: 'text-muted pb-4 pl-7',
    },
  }))
);

// Count items by type for legend
const typeCounts = computed(() => {
  const counts: Record<string, number> = {};
  faqFiles.value?.forEach(file => {
    counts[file.type] = file.items.length;
  });
  return counts;
});

// Legend metadata - just for display
const legendMeta = computed(() => {
  const meta: Record<string, { label: string; icon: string; color: string }> = {};
  faqFiles.value?.forEach(file => {
    meta[file.type] = {
      label: file.label,
      icon: file.icon,
      color: file.color,
    };
  });
  return meta;
});

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper
    v-if="showSection('concerns')"
    id="#concerns"
    :intro="data.intro"
    :bridge="{ ...data.bridge, primary: true }"
  >
    <!-- Enhanced Legend with counts -->
    <div class="space-y-4">
      <div class="flex justify-center flex-wrap gap-2">
        <span
          v-for="(meta, type) in legendMeta"
          :key="type"
          :class="[
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium',
            `border-${meta.color}/40`,
          ]"
        >
          <UIcon :name="meta.icon" :class="`size-3.5 text-${meta.color}`" />
          {{ meta.label }}
          <UBadge
            :label="String(typeCounts[type as string])"
            size="xs"
            variant="soft"
          />
        </span>
      </div>
    </div>

    <!-- Accordion -->
    <div class="w-full mx-auto" v-if="items.length">
      <UAccordion
        :items="items"
        type="multiple"
        :unmount-on-hide="false"
        :ui="{
          item: 'border-b border-default/50 first:border-t last:mb-0 overflow-hidden last:border-b',
          trigger:
            'group flex-1 flex items-center gap-3 font-medium text-sm p-4 hover:bg-muted/30 transition-colors',
          body: 'text-sm p-4 pt-0 leading-relaxed',
          leadingIcon: 'size-4',
          content: 'pt-0 data-[state=open]:pt-4',
        }"
      />
    </div>
  </ISectionWrapper>
</template>
