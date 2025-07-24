<script setup lang="ts">
interface Props {
  title: string
  description?: string
  alignment?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  alignment: 'center',
  size: 'md',
})

const titleClasses = computed(() => {
  const base = 'font-bold text-highlighted'
  const sizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
  }
  const alignment = props.alignment === 'center' ? 'text-center' : 'text-left'

  return `${base} ${sizes[props.size]} ${alignment} mb-6`
})

const descriptionClasses = computed(() => {
  const base = 'text-xl text-muted'
  const alignment = props.alignment === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left'

  return `${base} ${alignment}`
})

const containerClasses = computed(() => {
  return props.alignment === 'center' ? 'text-center mb-12 lg:mb-16' : 'mb-8 lg:mb-12'
})
</script>

<template>
  <div :class="containerClasses">
    <h2 :class="titleClasses">
      {{ title }}
    </h2>
    <p
      v-if="description"
      :class="descriptionClasses"
    >
      {{ description }}
    </p>
  </div>
</template>
