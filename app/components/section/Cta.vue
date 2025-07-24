<!-- app/components/section/CTA.vue -->
<script setup lang="ts">
interface CTACard {
  title: string
  subtitle?: string
  ctaText: string
  ctaLink: string
}

interface Props {
  title: string
  subtitle: string
  cards?: CTACard[]
}

withDefaults(defineProps<Props>(), {
  cards: () => [],
})
</script>

<template>
  <LayoutBackground
    pattern="circuit"
    intensity="light"
  >
    <UContainer>
      <div class="text-center mb-component">
        <h2 class="text-3xl md:text-4xl font-bold text-highlighted mb-component">
          {{ title }}
        </h2>
        <p class="text-xl text-toned max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 grid-spacing">
          <CardCTA
            v-for="card in cards"
            :key="card.title"
            variant="featured"
            :title="card.title"
            :subtitle="card.subtitle"
            :cta-text="card.ctaText"
            :cta-link="card.ctaLink"
          />
        </div>
      </div>
    </UContainer>
  </LayoutBackground>
</template>
