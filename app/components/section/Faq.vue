<script setup lang="ts">
import type { AccordionItem, TabsItem } from '@nuxt/ui';

defineProps<{
  data?: any;
}>();

const { data: faqFiles } = await useAsyncData('faqs', () =>
  queryCollection('faq').all(),
);

// Build tab items from file metadata
const tabItems = computed<TabsItem[]>(() => {
  if (!faqFiles.value) return [];

  return faqFiles.value.map((file, index) => ({
    label: file.label,
    icon: file.icon,
    value: file.type,
    badge: {
      label: String(file.items.length),
      color: 'neutral',
      variant: 'solid',
      size: 'xs',
    },
    slot: file.type,
  }));
});

const activeTab = ref(faqFiles.value?.[0]?.type || '');

const activeFaqs = computed(() => {
  const file = faqFiles.value?.find((f) => f.type === activeTab.value);
  if (!file) return [];

  return file.items.map((item) => ({
    label: item.label,
    content: item.content,
    icon: file.icon,
    color: file.color,
  }));
});

// Build accordion items for active tab
const accordionItems = computed<AccordionItem[]>(() =>
  activeFaqs.value.map((faq, i) => ({
    value: String(i),
    label: faq.label,
    content: faq.content,
    icon: faq.icon,
    ui: {
      leadingIcon: `text-${faq.color}`,
      trigger: 'text-base font-medium py-4',
      body: 'text-muted pb-4 pl-7',
    },
  })),
);

const { showSection } = useSectionVisibility();
</script>

<template>
  <SectionWrapper
    v-if="showSection('faq')"
    id="#faq"
    :intro="data.intro"
    :cta="data.cta"
    has-bottom
  >
    <UTabs
      v-model="activeTab"
      :items="tabItems"
      :content="false"
      color="neutral"
      variant="link"
      size="md"
      class="w-full max-w-2xl mx-auto mb-8"
      :ui="{
        list: 'justify-center gap-2 border-0',
        trigger: [
          'inline-flex items-center gap-1.5 rounded-full border px-4 py-2',
          'border-neutral-700/40 bg-neutral-900/30',
          'data-[state=active]:border-primary data-[state=active]:bg-primary/10',
          'hover:border-neutral-600 hover:bg-neutral-900/50',
          'transition-all duration-200',
        ].join(' '),
        indicator: 'hidden',
      }"
    />

    <div class="w-full mx-auto" v-if="accordionItems.length">
      <UAccordion
        :items="accordionItems"
        :unmount-on-hide="false"
        :ui="{
          item: 'border-b border-default/50 first:border-t last:mb-0 overflow-hidden last:border-b',
          trigger:
            'group flex-1 flex items-center gap-3 font-medium text-sm p-4 hover:bg-muted/30 transition-colors',
          body: 'text-sm p-4 leading-relaxed',
          leadingIcon: 'size-4',
          content: 'data-[state=open]:bg-muted/30',
        }"
      />
    </div>
  </SectionWrapper>
</template>
