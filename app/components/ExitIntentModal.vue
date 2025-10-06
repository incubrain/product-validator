<!-- components/ExitIntentModal.vue -->
<script setup lang="ts">
const props = defineProps<{
  offerId: OfferID;
}>();

const emit = defineEmits<{ close: [boolean] }>();

const offer = useFlowOffer(props.offerId);
</script>

<template>
  <!-- {EXTRACT} -->
  <UModal
    fullscreen
    :close="{ onClick: () => emit('close', false) }"
    title="Wait! Don't leave empty-handed"
    description="Exit intent modal"
    :ui="{
      overlay: 'bg-default',
      content:
        'bg-gradient-to-br from-neutral-950/95 via-primary-900/50 to-neutral-950/95 dark:from-neutral-950/98 dark:via-primary-900/40 dark:to-neutral-950/90 backdrop-blur-4xl backdrop-brightness-0 ',
      body: 'flex flex-col items-center justify-center text-center p-8',
    }"
  >
    <template #body>
      <div
        class="max-w-sm md:max-w-2xl lg:max-w-lg space-y-3 md:space-y-6 w-full"
      >
        <div class="space-y-3 md:space-y-4">
          <h2 class="text-3xl font-bold text-primary relative">
            {{ offer.name }}
          </h2>
          <p class="text-lg md:text-xl text-toned">
            {{ offer.description }}
          </p>
        </div>

        <!-- Video -->
        <div
          v-if="offer.media?.type === 'video'"
          class="w-full max-w-sm md:max-w-2xl mx-auto mb-6 md:mb-8"
        >
          <div class="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              :src="offer.media.src"
              :title="offer.media.alt"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Features -->
        <div
          class="bg-white/80 dark:bg-default/50 rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 max-w-sm md:max-w-md mx-auto"
        >
          <ul class="text-left space-y-1.5 text-sm">
            <li
              v-for="feature in offer.benefits"
              :key="feature.text"
              class="flex items-center gap-2 text-toned font-medium"
            >
              <UIcon name="i-lucide-check" class="text-success flex-shrink-0" />
              {{ feature.text }}
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-4 justify-between items-center w-full">
        <!-- {EXTRACT} -->
        <UButton variant="ghost" color="neutral" @click="emit('close', false)">
          Maybe later
        </UButton>

        <IButton
          :offer="offerId"
          location="exit-modal"
          class="transform hover:scale-105"
        />
      </div>
    </template>
  </UModal>
</template>
