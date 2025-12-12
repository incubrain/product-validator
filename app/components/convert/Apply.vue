<!-- app/components/convert/Apply.vue -->
<script setup lang="ts">
interface Props {
  email?: string;
  formUrl?: string;
  label?: string;
  location: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'soft' | 'subtle';
  color?: 'primary' | 'secondary' | 'neutral';
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Apply Now',
  size: 'xl',
  variant: 'solid',
  color: 'primary',
  block: false,
});

const { trackEvent } = useEvents();

const targetUrl = computed(() => {
  if (props.formUrl) return props.formUrl;
  if (props.email) return `mailto:${props.email}`;
  return '#';
});

const handleClick = () => {
  trackEvent({
    id: `apply_click_${props.location}`,
    type: 'cta_click',
    location: props.location,
    action: 'click',
    target: targetUrl.value,
    data: {
      ctaType: 'apply',
    },
  });
};
</script>

<template>
  <UButton
    :to="targetUrl"
    :label="label"
    :size="size"
    :variant="variant"
    :color="color"
    :block="block"
    leading-icon="i-lucide-send"
    :target="formUrl ? '_blank' : undefined"
    :rel="formUrl ? 'noopener noreferrer' : undefined"
    @click="handleClick"
  />
</template>
