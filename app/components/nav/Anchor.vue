<!-- app/components/layout/Anchor.vue - SIMPLIFIED -->
<script setup lang="ts">
import anchorStyles from '~~/theme/anchor'

interface Props {
  id: string    // Required - the anchor ID
  as?: string
  showIcon?: boolean
  iconPosition?: 'left' | 'right'
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  showIcon: true,
  iconPosition: 'left'
})

const route = useRoute()
const styles = computed(() => anchorStyles(props))

// Check if this anchor is currently active
const isActive = computed(() => {
  const currentHash = route.hash.replace('#', '')
  return currentHash === props.id
})
</script>

<template>
  <component
    :is="as"
    :id="id"
    :class="[styles.root(), $attrs.class]"
    v-bind="$attrs"
  >
    <ULink 
      :to="`#${id}`"
      :class="styles.link()"
      :aria-label="`Link to ${id} section`"
      :aria-current="isActive ? 'location' : undefined"
      raw
      active-class="text-primary"
      inactive-class="text-inherit"
    >
      <slot />
      
      <UIcon 
        v-if="showIcon && iconPosition === 'left'" 
        name="i-lucide-hash" 
        :class="[styles.icon(), isActive && 'opacity-100']" 
      />
    </ULink>
  </component>
</template>