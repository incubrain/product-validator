<!-- components/ConvertButton.vue -->
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import NAVIGATION from '#shared/config/navigation';

interface Props {
  ctaType?: 'hero' | 'banner' | 'footer' | 'conversion' | 'secondary';
  location: string;
  size?: ButtonProps['size'];
  block?: boolean;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
}

const props = withDefaults(defineProps<Props>(), {
  ctaType: 'conversion',
  color: 'primary',
  variant: 'solid',
});

const { trackEvent } = useEvents();

const cta = computed(() => NAVIGATION.ctas[props.ctaType]);

const handleClick = async () => {
  await trackEvent({
    id: `cta_${props.ctaType}_click`,
    type: 'element_viewed',
    location: props.location,
    action: 'click',
    target: cta.value.to,
    data: {
      ctaType: props.ctaType,
      ctaLabel: cta.value.label,
    },
  });
};
</script>

<template>
  <UButton
    v-if="cta"
    :label="cta.label"
    :leading-icon="cta.icon"
    :color="color"
    :variant="variant"
    :size="size"
    :block="block"
    :class="$attrs.class"
    :to="cta.to"
    :target="cta.to.startsWith('http') ? '_blank' : undefined"
    @click="handleClick"
  />
</template>
