<!-- components/ModalFullscreen.vue -->
<script setup lang="ts">
interface Props {
  offerId: OfferID;
  location: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [] }>();

const { getOffer } = useContentCache();
const { data: offer } = await getOffer(props.offerId);
</script>

<template>
  <UModal
    fullscreen
    :ui="{
      overlay: 'bg-default',
      content:
        'bg-linear-to-br from-neutral-950/95 via-primary-900/50 to-neutral-950/95 backdrop-blur-4xl',
      body: 'flex flex-col items-center justify-center text-center p-8',
    }"
    @close="emit('close')"
  >
    <template #body>
      <div class="max-w-lg space-y-6">
        <div class="space-y-3">
          <h2 class="text-3xl font-bold text-primary">{{ offer?.title }}</h2>
          <p class="text-xl text-toned">{{ offer?.description }}</p>
        </div>

        <div
          v-if="offer?.media?.type === 'video'"
          class="w-full aspect-video rounded-lg overflow-hidden"
        >
          <iframe
            :src="offer.media.src"
            :title="offer.media.alt"
            class="w-full h-full"
            frameborder="0"
            allowfullscreen
          />
        </div>

        <div v-if="offer?.features" class="bg-default/50 rounded-xl p-6">
          <ul class="text-left space-y-2 text-sm">
            <li
              v-for="benefit in offer.features"
              :key="benefit.title"
              class="flex items-center gap-2"
            >
              <UIcon name="i-lucide-check" class="text-success shrink-0" />
              <span class="text-toned font-medium">{{ benefit.title }}</span>
            </li>
          </ul>
        </div>

        <IStockProgress
          v-if="offer?.stock"
          :stock="offer.stock"
          :offer-id="offer.id"
          class="max-w-sm mx-auto"
        />

        <IButtonCTA
          :offer-id="offerId"
          :location="`${location}_modal`"
          size="xl"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex gap-4 justify-between w-full">
        <UButton
          label="Maybe later"
          variant="ghost"
          color="neutral"
          @click="emit('close')"
        />
      </div>
    </template>
  </UModal>
</template>
