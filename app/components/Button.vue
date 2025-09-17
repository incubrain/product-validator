<!-- components/IButton.vue -->
<script setup lang="ts">
import { actionConfig } from '#shared/config/actions'
import type { ActionKey } from '#shared/config/actions'

interface Props {
  action: ActionKey
  location: string
  disabled?: boolean
}

const props = defineProps<Props>()
const { executeAction } = useAction()
const { selectVariant } = useABVariant()

const baseAction = computed(() => actionConfig[props.action])
const selectedVariant = computed(() => 
  selectVariant(baseAction.value.id, baseAction.value.variants)
)

const handleClick = async () => {
  if (props.disabled) return
  await executeAction(props.action, props.location)
}

</script>

<template>
  <UButton
    :variant="selectedVariant.variant"
    :color="selectedVariant.color"
    :icon="selectedVariant.icon"
    :to="baseAction.target"
    :target="baseAction.target.startsWith('http') ? '_blank' : undefined"
    :disabled="disabled || baseAction.disabled"
    @click="handleClick"
  >
    {{ selectedVariant.label }}
  </UButton>
</template>