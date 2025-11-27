<!-- components/ButtonCTA.vue -->
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { CtaName } from '#types';

interface Props {
  offerId: OfferID;
  location: string;
  ctaName?: CtaName;
  class?: string;
  size?: ButtonProps['size'];
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  ctaName: 'funnel',
});

const { executeAction } = useEvents();
const { getOffer } = useContentCache();
const { data: offer } = await getOffer(props.offerId);

const cta = computed(() => {
  if (!offer.value?.ctas) return null;
  return offer.value.ctas[props.ctaName];
});

const to = computed(() => 
  cta.value?.to
);

const target = computed(() => 
  cta.value?.to?.startsWith('http') ? '_blank' : undefined
);

// ✅ Handle click
const handleClick = async () => {
  await executeAction(props.location, offer.value);
};
</script>

<template>
  <UButton
    v-if="cta"
    :label="cta.label"
    :leading-icon="cta.icon"
    :color="(cta.color || 'primary') as any"
    :variant="cta.variant || 'solid'"
    :size="size"
    :block="block"
    :class="props.class"
    :to="to"
    :target="target"
    @click="handleClick"
  />
</template>