<!-- app/components/section/SectionWrapper.vue -->
<script setup lang="ts">
interface Props {
  id: SectionAnchor;
  intro: SectionIntro;
  bridge?: SectionBridge;
  orientation?: 'vertical' | 'horizontal';
  class?: string;
}
const { reachedStage } = useSectionVisibility();

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  class: '',
  bridge: null,
});
</script>

<template>
  <UPageSection
    v-bind="intro"
    :orientation="orientation"
    :class="props.class"
    :ui="{
      title:
        'text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight leading-snug font-bold text-highlighted',
    }"
  >
    <template #top>
      <INavAnchor :id="id" />
    </template>

    <!-- 
      Pass through all content as default slot.
      Sections handle their own separators inline.
    -->
    <slot />

    <!-- Bridge always at the end -->
    <INavBridge v-if="bridge && reachedStage('build')" :bridge="bridge" />
  </UPageSection>
</template>
