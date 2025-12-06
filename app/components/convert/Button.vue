<!-- components/ConvertButton.vue -->
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import NAVIGATION from '#shared/config/navigation';

interface Props {
  ctaType?: 'hero' | 'banner' | 'footer' | 'conversion' | 'secondary';
  to?: ButtonProps['to'];
  label?: ButtonProps['label'];
  icon?: ButtonProps['icon'];
  note?: string;
  location: string;
  size?: ButtonProps['size'];
  block?: boolean;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
}

const props = withDefaults(defineProps<Props>(), {
  ctaType: undefined,
  color: 'primary',
  variant: 'solid',
});

const { trackEvent } = useEvents();

const cta = computed(() => {
  if (props.to)
    return {
      to: props.to,
      label: props.label,
      icon: props.icon,
      note: props.note,
    };
  if (props.ctaType) return NAVIGATION.ctas[props.ctaType];
  return null;
});

const handleClick = async () => {
  if (!cta.value) return;

  await trackEvent({
    id: `cta_${props.ctaType || 'custom'}_click`,
    type: 'cta_click',
    location: props.location,
    action: 'click',
    target: cta.value.to,
    data: {
      ctaType: props.ctaType || 'custom',
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
