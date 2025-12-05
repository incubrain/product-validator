<!-- components/ConvertButton.vue -->
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { CtaName } from '#types';

interface Props {
  productId: ProductId;
  location: string;
  ctaName?: CtaName;
  size?: ButtonProps['size'];
  block?: boolean;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
}

const props = withDefaults(defineProps<Props>(), {
  ctaName: 'funnel',
  color: 'primary',
  variant: 'solid',
});

const { trackEvent } = useEvents();
const { getProduct } = useContentCache();
const { data: product } = await getProduct(props.productId);

const cta = computed(() => {
  if (!product.value?.ctas) return null;
  return product.value.ctas[props.ctaName];
});

const handleClick = async () => {
  await trackEvent({
    id: `product_${product.value.slug}_view`,
    type: 'element_viewed',
    location: `product-page-${product.value.slug}`,
    action: 'click',
    target: `/products/${product.value.slug}`,
    data: {
      productId: product.value.slug,
      metadata: {
        product_slug: product.value.slug,
        product_type: product.value.type,
        product_price: product.value.price,
        is_primary: product.value.primary,
      },
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
    :target="cta.strategy === 'external' ? '_blank' : undefined"
    @click="handleClick"
  />
</template>