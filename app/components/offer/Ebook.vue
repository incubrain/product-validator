```vue
<script setup lang="ts">
import type { Offer } from '#types';
import { STATUS_ICONS } from '#constants';

const props = defineProps<{
  offer: Offer;
}>();

const { offer } = toRefs(props);

const features = computed(() => {
  if (!offer.value?.features) return [];
  return offer.value.features.map((f) => ({
    ...f,
    icon: STATUS_ICONS[f.icon] || f.icon,
  }));
});

// ✅ CHANGED: Use composable instead of inline logic
const {
  isSoldOut,
  percentClaimed,
  urgencyColor,
  label,
  useLiveCount,
} = useOfferStock(offer.value.stock, offer.value.slug);
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden py-12 sm:py-24">
    <!-- Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </div>

    <UContainer class="w-full relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <!-- Left Column: Content -->
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              {{ offer.title }}
            </h1>
            <p class="text-lg sm:text-xl text-muted/90 max-w-xl leading-relaxed">
              {{ offer.description }}
            </p>
          </div>

          <!-- Benefits List -->
          <ul v-if="features.length" class="space-y-3">
            <li v-for="feature in features" :key="feature.title" class="flex items-start gap-3">
              <UIcon :name="feature.icon" class="w-6 h-6 text-success shrink-0 mt-0.5" />
              <span class="text-base text-toned">{{ feature.title }}</span>
            </li>
          </ul>

          <!-- Form / CTA -->
        <div class="max-w-md pt-4">
           <!-- ✅ CHANGED: Waitlist form replaces regular form when sold out -->
           <template v-if="isSoldOut">
             <IFormWaitlist :location="`offer-solo-${offer.slug}`" :offer="offer" />
           </template>
           <template v-else>
             <IFormValidation :location="`offer-solo-${offer.slug}`" :offer="offer" />
             <p v-if="offer.cta.note" class="text-xs text-muted text-center mt-3">
               {{ offer.cta.note }}
             </p>
             
             <!-- Stock Progress -->
             <div v-if="offer.stock" class="mt-6 pt-6 border-t border-white/5">
                <div class="space-y-3 w-full flex flex-col">
                  <UProgress
                    :model-value="percentClaimed"
                    :color="urgencyColor"
                    size="2xl"
                    class="w-full"
                  />
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-muted">{{ label }}</span>
                    <span v-if="useLiveCount" class="text-dimmed flex items-center gap-1 pl-2">
                      <span class="size-1.5 rounded-full bg-success animate-pulse" />
                      Live
                    </span>
                  </div>
                </div>
             </div>
           </template>
        </div>
      </div>

      <!-- Right Column: Visual -->
      <div class="relative hidden lg:block">
        <!-- Book/Product Visual Container -->
        <div class="relative aspect-3/4 max-w-md mx-auto perspective-1000">
             <div class="relative w-full h-full transition-transform duration-500 hover:scale-[1.02]">
                <!-- Glow effect behind -->
                <div class="absolute inset-0 bg-primary/20 blur-2xl -z-10 transform translate-y-4 scale-95" />
                
                <!-- ✅ CHANGED: Sold out overlay styling -->
                <div v-if="isSoldOut" class="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-lg border border-white/10">
                  <div class="bg-black/80 border border-white/10 px-6 py-3 rounded-full transform -rotate-12 shadow-2xl">
                    <span class="text-2xl font-bold text-white tracking-widest uppercase">Sold Out</span>
                  </div>
                </div>

                <!-- Media: Video -->
                  <template v-if="offer.media?.type === 'video'">
                    <video
                      :src="offer.media.src"
                      autoplay
                      muted
                      loop
                      playsinline
                      class="w-full h-full object-cover rounded-lg shadow-2xl border border-white/10"
                    />
                  </template>

                  <!-- Media: Image -->
                  <NuxtImg 
                    v-else-if="offer.media?.src" 
                    :src="offer.media.src" 
                    :alt="offer.media.alt || offer.title"
                    class="w-full h-full object-cover rounded-lg shadow-2xl border border-white/10"
                  />

                  <!-- Fallback if no media -->
                  <div v-else class="w-full h-full bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center p-8 text-center shadow-2xl bg-linear-to-br from-neutral-800 to-neutral-950">
                      <div class="space-y-4">
                          <UIcon name="i-lucide-book" class="w-16 h-16 text-primary/50" />
                          <h3 class="text-2xl font-bold text-white font-family-heading">{{ offer.title }}</h3>
                          <p class="text-sm text-muted">The Ultimate Guide</p>
                      </div>
                  </div>
               </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
