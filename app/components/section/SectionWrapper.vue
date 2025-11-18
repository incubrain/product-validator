<!-- app/components/section/SectionWrapper.vue -->
<script setup lang="ts">
interface Props {
  id: SectionAnchor;
  intro: SectionIntro;
  bridge?: SectionBridge;
  orientation?: 'vertical' | 'horizontal';
  class?: string;
}

const { showFeature } = useSectionVisibility();

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  class: '',
  bridge: null,
});
</script>

<template>
  <UPageSection
    :description="intro.description"
    :orientation="orientation"
    :class="props.class"
    :ui="{
      root: 'isolate',
      container:
        'flex flex-col lg:grid py-12 sm:py-16 lg:pb-32 lg:pt-0 gap-8 sm:gap-12 border-neutral/20 border-x lg:px-0',
      header: 'space-y-3 mx-auto text-center relative z-100',
      leading: 'border-t w-full lg:px-0 relative pb-4 z-100',
      headline: 'hidden',
      title: 'max-w-4xl mx-auto',
      description: 'text-sm sm:text-base text-muted/80 max-w-2xl mx-auto',
    }"
  >
    <template #top>
      <INavAnchor :id="id" />
    </template>

    <template #leading>
      <div
        class="absolute -left-4.5 -top-4.5 border bg-default p-2 justify-center items-center hidden lg:flex"
      >
        <UIcon :name="intro.icon" class="text-secondary" />
      </div>
      <div
        class="absolute -right-4.5 -top-4.5 border bg-default p-2 justify-center items-center hidden lg:flex"
      >
        <UIcon :name="intro.icon" class="text-secondary" />
      </div>
      <span
        class="absolute -top-4.5 mx-auto font-family-heading uppercase text-success font-bold px-6 py-2 bg-default rounded-md text-xs sm:text-sm tracking-[0.15em]"
      >
        {{ intro.headline }}
      </span>
    </template>

    <template #title>
      <div class="space-y-3">
        <!-- Main title with gradient underline -->
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
      </div>
    </template>

    <slot />

    <INavBridge
      v-if="bridge && showFeature('sectionBridge')"
      :bridge="bridge"
    />
  </UPageSection>
</template>
