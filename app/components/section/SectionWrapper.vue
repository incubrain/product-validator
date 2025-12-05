<!-- app/components/section/SectionWrapper.vue -->
<script setup lang="ts">
interface Props {
  id: SectionAnchor;
  intro: SectionIntro;
  cta?: SectionCta;
  orientation?: 'vertical' | 'horizontal';
  class?: string;
  hasBottom?: boolean;
}

const { showFeature } = useSectionVisibility();

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  class: '',
  cta: null,
  hasBottom: false,
});
</script>

<template>
  <UPageSection
    :orientation="orientation"
    :class="props.class"
    :ui="{
      root: 'isolate',
      container: [
        'flex flex-col lg:grid py-16 sm:py-16 gap-12 sm:gap-16 lg:px-0',
        props.hasBottom ? 'lg:pb-0 pb-0' : 'lg:pb-32',
      ],
      header: 'space-y-3 mx-auto text-center relative z-100',
      leading: 'w-full lg:px-0 relative pb-4 z-100',
      headline: 'hidden',
      title: 'max-w-4xl mx-auto',
      description: 'text-sm sm:text-base text-muted/80 max-w-2xl mx-auto',
    }"
  >
    <template #top>
      <INavAnchor :id="id" />
    </template>

    <template #title>
      <div class="space-y-3 pt-6">
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight"
        >
          {{ intro.title }}
        </h2>

        <div class="flex justify-center">
          <div
            class="h-1 w-20 bg-linear-to-r from-transparent via-success to-transparent"
          />
        </div>

        <p
          class="text-base text-muted/90 font-family-body tracking-normal max-w-xl mx-auto pt-3"
        >
          {{ intro.description }}
        </p>
      </div>
    </template>

    <slot />

    <template #bottom>
      <div class="pt-12 lg:pt-16 space-y-12 lg:space-y-16">
        <slot name="bottom" />
        <UContainer class="lg:px-0">
          <INavCta v-if="cta && showFeature('sectionCta')" :cta="cta" />
        </UContainer>
      </div>
    </template>
  </UPageSection>
</template>
