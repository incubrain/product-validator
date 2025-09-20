<!-- components/ExitIntentModal.vue -->
<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>();

// Get founder info for social proof
const founder = useFlowSection('founder');

// Create social offer data
const socialOffer = {
  id: 'social_youtube',
  name: 'YouTube Validator Reviews',
  description: 'Learn from real validation examples',
  media: {
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    alt: 'YouTube critique example',
  },
  features: [
    'Public landing page critiques',
    'Real validation examples', 
    'Community learning',
    'Free feedback'
  ],
  cta: {
    label: 'Watch Critiques',
    href: 'https://www.youtube.com/@Incubrain',
    icon: 'i-lucide-youtube',
    variant: 'solid',
    color: 'error',
  }
};
</script>

<template>
  <UModal
    fullscreen
    :close="{ onClick: () => emit('close', false) }"
    title="Wait! Don't leave empty-handed"
    description="Exit intent modal"
    :ui="{
      overlay: 'bg-default',
      content:
        'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/80 dark:to-secondary-950/90',
      body: 'flex flex-col items-center justify-center text-center p-8',
    }"
  >
    <template #body>
      <div class="max-w-sm md:max-w-2xl lg:max-w-lg space-y-3 md:space-y-6 w-full">
        <div class="space-y-3 md:space-y-4">
          <h2 class="text-3xl font-bold text-primary relative">
            {{ socialOffer.name }}
          </h2>
          <p class="text-lg md:text-xl text-toned">
            {{ socialOffer.description }}
          </p>
        </div>

        <!-- Video -->
        <div
          v-if="socialOffer.media?.type === 'video'"
          class="w-full max-w-sm md:max-w-2xl mx-auto mb-6 md:mb-8"
        >
          <div class="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              :src="socialOffer.media.src"
              :title="socialOffer.media.alt"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Features -->
        <div class="bg-white/80 dark:bg-default/50 rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 max-w-sm md:max-w-md mx-auto">
          <ul class="text-left space-y-1.5 text-sm">
            <li
              v-for="feature in socialOffer.features"
              :key="feature"
              class="flex items-center gap-2 text-toned font-medium"
            >
              <UIcon name="i-lucide-check" class="text-success flex-shrink-0" />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-4 justify-between items-center w-full">
        <UButton variant="ghost" color="neutral" @click="emit('close', false)">
          Maybe later
        </UButton>

        <IButton
          offer="social"
          location="exit-modal"
          :show-guarantee="true"
          guarantee-position="right"
          class="transform hover:scale-105"
        />
      </div>
    </template>
  </UModal>
</template>