<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showText: true,
})

const sizes = {
  sm: { image: '24px', text: 'text-sm' },
  md: { image: '28px', text: 'text-lg' },
  lg: { image: '32px', text: 'text-xl' },
}

const currentSize = computed(() => sizes[props.size])
</script>

<template>
  <ULink
    to="/"
    class="flex items-center space-x-2 font-bold"
  >
    <NuxtImg
      src="favicon-96x96.png"
      :sizes="currentSize.image"
      alt="Incubrain Logo"
    />
    <h6
      v-if="showText"
      class="text-highlighted font-semibold uppercase tracking-wide"
      :class="currentSize.text"
    >
      INCUBRAIN
    </h6>
  </ULink>
</template>
