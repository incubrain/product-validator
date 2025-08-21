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
  sm: { image: '20px', text: 'text-sm' },
  md: { image: '24px', text: 'text-lg' },
  lg: { image: '28px', text: 'text-xl' },
}

const currentSize = computed(() => sizes[props.size])
</script>

<template>
  <ULink
    to="/"
    class="flex items-center space-x-2 font-bold underline underline-offset-4 decoration-secondary-600"
  >
    <NuxtImg
      src="/images/nuxt-icon.png"
      width="36px"
      height="auto"
    />
    <h6
      v-if="showText"
      class="text-highlighted font-semibold uppercase tracking-wide"
      :class="currentSize.text"
    >
      LAUNCH KIT
    </h6>
  </ULink>
</template>
