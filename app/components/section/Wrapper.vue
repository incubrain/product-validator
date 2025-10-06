<!-- app/components/section/Wrapper.vue -->
<script setup lang="ts">
interface Props {
  id: SectionAnchor;
  intro: SectionIntro;
  bridge?: SectionBridge;
  orientation?: 'vertical' | 'horizontal';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  class: '',
  bridge: null,
});
</script>

<template>
  <UPageSection v-bind="intro" :orientation="orientation" :class="props.class">
    <template #top>
      <INavAnchor :id="id" />
    </template>

    <!-- 
      Pass through all content as default slot.
      Sections handle their own separators inline.
    -->
    <slot />

    <!-- Bridge always at the end -->
    <INavBridge v-if="bridge" :bridge="bridge" />
  </UPageSection>
</template>
