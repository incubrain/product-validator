<script setup lang="ts">
import ctaStyles from '~~/theme/cta'

interface Props {
  variant?: 'inline' | 'featured' | 'compact'
  title: string
  subtitle?: string
  ctaText: string
  ctaLink: string
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'inline',
})

const styles = computed(() => ctaStyles(props))
</script>

<template>
  <div :class="[styles.root(), $attrs.class]">
    <div :class="styles.content()">
      <h3 :class="styles.title()">
        {{ title }}
      </h3>
      <p
        v-if="subtitle"
        :class="styles.subtitle()"
      >
        {{ subtitle }}
      </p>
    </div>

    <div :class="styles.actions()">
      <UButton
        :to="ctaLink"
        :target="ctaLink.startsWith('http') ? '_blank' : undefined"
        color="primary"
        variant="solid"
      >
        {{ ctaText }}
      </UButton>
    </div>
  </div>
</template>
