<!-- app/components/offer/Page.vue -->
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

const { isAvailable } = useOfferStock(offer.value.stock, offer.value.slug);
const hasMedia = computed(() => !!offer.value.media?.src);
const mediaType = computed(() => offer.value.media?.type || null);

// Determine CTA type based on offer configuration
const ctaType = computed(() => {
  // External link (booking, payment, etc.)
  if (offer.value.cta.to) {
    return 'external';
  }
  // Form submission (email capture)
  return 'form';
});

// Pricing display
const hasPricing = computed(() => !!offer.value.price);
const displayPrice = computed(() => {
  if (!offer.value.price) return null;
  
  const parts = {
    amount: offer.value.price,
    cycle: offer.value.billingCycle,
    discount: offer.value.discount,
  };
  
  return parts;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden py-16 sm:py-20 lg:py-24">
    <!-- Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </div>

    <UContainer class="relative z-10">
      <div class="max-w-3xl mx-auto">
        
        <!-- Header -->
        <div class="space-y-6 text-center mb-12 lg:mb-16">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            {{ offer.title }}
          </h1>
          
          <p class="text-lg sm:text-xl text-muted/80 leading-relaxed max-w-2xl mx-auto">
            {{ offer.description }}
          </p>
          
          <!-- Tagline (optional) -->
          <p v-if="offer.tagline" class="text-sm text-muted/60 italic">
            {{ offer.tagline }}
          </p>
        </div>

        <!-- Pricing (if applicable) -->
        <div v-if="hasPricing" class="mb-12 lg:mb-16">
          <div class="text-center">
            <div class="inline-flex items-baseline gap-2">
              <!-- Discount price (strikethrough) -->
              <span v-if="displayPrice.discount" class="text-2xl text-muted/50 line-through">
                {{ displayPrice.discount }}
              </span>
              
              <!-- Current price -->
              <span class="text-5xl lg:text-6xl font-bold text-white">
                {{ displayPrice.amount }}
              </span>
              
              <!-- Billing cycle -->
              <span v-if="displayPrice.cycle" class="text-lg text-muted/70">
                {{ displayPrice.cycle }}
              </span>
            </div>
            
            <!-- Terms -->
            <p v-if="offer.terms" class="text-sm text-muted/60 mt-3">
              {{ offer.terms }}
            </p>
          </div>
        </div>

        <!-- Features -->
        <div v-if="features.length" class="mb-12 lg:mb-16">
          <ul class="space-y-4 max-w-xl mx-auto">
            <li 
              v-for="feature in features" 
              :key="feature.title" 
              class="flex items-start gap-3 group"
            >
              <div class="mt-0.5 shrink-0">
                <UIcon 
                  :name="feature.icon" 
                  class="w-6 h-6 text-success transition-transform group-hover:scale-110" 
                />
              </div>
              <span class="text-base text-toned/90 leading-relaxed">
                {{ feature.title }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Media -->
        <div v-if="hasMedia" class="mb-12 lg:mb-16">
          <div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm">
            <div 
              v-if="!isAvailable" 
              class="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <div class="bg-black/90 border border-white/20 px-6 py-3 lg:px-8 lg:py-4 rounded-full shadow-2xl">
                <span class="text-xl lg:text-2xl font-bold text-white tracking-wider uppercase">
                  {{ offer.stock?.type === 'hours' ? 'Fully Booked' : 'Sold Out' }}
                </span>
              </div>
            </div>

            <div class="aspect-video">
              <IVideo
                v-if="mediaType === 'video'"
                :src="offer.media.src"
                :alt="offer.media.alt || offer.title"
                class="w-full h-full"
              />

              <NuxtImg 
                v-else-if="mediaType === 'image'" 
                :src="offer.media.src" 
                :alt="offer.media.alt || offer.title"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="max-w-md mx-auto">
          <div class="bg-white/[0.02] border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-6">
            
            <!-- Form submission (magnet offers) -->
            <template v-if="ctaType === 'form'">
              <IFormValidation :location="`offer-solo-${offer.slug}`" :offer="offer" />
              
              <p v-if="offer.cta.note && isAvailable" class="text-xs text-center text-muted/70">
                {{ offer.cta.note }}
              </p>
            </template>

            <!-- External link (booking/payment) -->
            <template v-else-if="ctaType === 'external'">
              <UButton
                :to="offer.cta.to"
                :color="offer.cta.color || 'primary'"
                size="xl"
                block
                external
                target="_blank"
                :disabled="!isAvailable"
              >
                <template #leading>
                  <UIcon v-if="offer.cta.icon" :name="offer.cta.icon" class="w-5 h-5" />
                </template>
                {{ offer.cta.label }}
              </UButton>
              
              <p v-if="offer.cta.note" class="text-xs text-center text-muted/70">
                {{ offer.cta.note }}
              </p>
            </template>
            
            <!-- Stock Progress -->
            <div v-if="offer.stock && isAvailable" class="pt-4 border-t border-white/5">
              <IStockProgress :stock="offer.stock" :offer-id="offer.slug" />
            </div>
          </div>
        </div>

      </div>
    </UContainer>
  </div>
</template>