<!-- app/components/showcase/DemoBox.vue -->
<script setup lang="ts">
interface Props {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  variant?: 'dashed' | 'solid' | 'dotted'
  minHeight?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  index?: number
  label?: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'dashed',
  minHeight: '120px',
  padding: 'md',
  labelPosition: 'top',
})

const colorClasses = {
  primary: 'border-primary-800/30 bg-primary/5 text-primary',
  secondary: 'border-secondary-800/30 bg-secondary/5 text-secondary',
  success: 'border-success-800/30 bg-success/5 text-success',
  warning: 'border-warning-800/30 bg-warning/5 text-warning',
  error: 'border-error-800/30 bg-error/5 text-error',
  info: 'border-info-800/30 bg-info/5 text-info',
  neutral: 'border-default bg-neutral/5 text-neutral',
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

const borderVariant = computed(() => {
  switch (props.variant) {
    case 'dashed': return 'border-dashed'
    case 'dotted': return 'border-dotted'
    default: return ''
  }
})

// ✅ Single label positioning system
const labelClasses = computed(() => {
  const base = 'absolute text-xs font-light z-10 bg-default/80 backdrop-blur px-2 py-1 rounded text-muted-foreground'

  switch (props.labelPosition) {
    case 'top':
      return `${base} -top-3 left-1/2 -translate-x-1/2`
    case 'bottom':
      return `${base} -bottom-3 left-1/2 -translate-x-1/2`
    case 'left':
      return `${base} top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap`
    case 'right':
      return `${base} top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap`
    default:
      return base
  }
})
</script>

<template>
  <!-- ✅ NO wrapper padding - direct positioning -->
  <div class="relative">
    <!-- ✅ Single label slot or prop -->
    <div
      v-if="label || $slots.label"
      :class="labelClasses"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>

    <!-- Main Box -->
    <div
      :class="[
        'relative border-2 rounded-lg flex items-center justify-center',
        colorClasses[color],
        borderVariant,
        paddingClasses[padding],
      ]"
      :style="{ minHeight }"
    >
      <!-- ✅ Index chip positioned relative to box -->
      <div
        v-if="typeof index === 'number'"
        class="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-secondary-800 text-white text-xs font-bold flex items-center justify-center z-10"
      >
        {{ index + 1 }}
      </div>

      <!-- Content -->
      <div class="w-full h-full flex items-center justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>
