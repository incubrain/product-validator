<!-- app/components/section/Trust.vue -->
<script setup lang="ts">
interface Testimonial {
  quote: string
  author: string
  title: string
  company: string
  avatar?: string
}

interface Props {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

defineProps<Props>()
</script>

<template>
  <section>
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-component max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-highlighted mb-4">
          {{ title }}
        </h2>
        <p class="text-xl text-muted">
          {{ subtitle }}
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 grid-spacing">
        <CardTestimonial
          v-for="testimonial in testimonials"
          :key="testimonial.author"
          :items="[testimonial]"
          variant="card"
        />
      </div>
    </UContainer>
  </section>
</template>
