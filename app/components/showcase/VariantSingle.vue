<!-- app/components/showcase/DebugVariants.vue -->
<script setup lang="ts">
interface Props {
  componentName: string
  variants: any[]
  componentData?: any
}

const props = defineProps<Props>()

// Generate all key variant combinations
const generateVariantCombinations = () => {
  const mainVariant = props.variants.find((v) => v.name === 'variant')
  if (!mainVariant) return []

  return mainVariant.options.map((option, index) => {
    const variantProps = {}
    props.variants.forEach((variant) => {
      if (variant.name === 'variant') {
        variantProps[variant.name] = option
      } else {
        variantProps[variant.name] = variant.default
      }
    })

    return {
      id: `variant-${index}`,
      name: option,
      description: `Variant: ${option} with default settings`,
      props: { ...variantProps, trackingId: props.componentName },
    }
  })
}

const allVariants = generateVariantCombinations()
</script>

<template>
  <ShowcaseDemo
    title="All Variants Debug View"
    description="Screenshot-ready view of all component variants"
    :max-cols="1"
  >
    <ShowcaseVariantCard
      v-for="variant in allVariants"
      :key="variant.id"
      :variant-name="variant.name"
      :description="variant.description"
      :badge-number="parseInt(variant.id.split('-')[1]) + 1"
      :code="variant.props"
      language="javascript"
    >
      <slot
        :variant-props="variant.props"
        :variant="variant"
      />
    </ShowcaseVariantCard>
  </ShowcaseDemo>
</template>
