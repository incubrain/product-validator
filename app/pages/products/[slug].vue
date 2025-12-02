<!-- products/[slug].vue -->
<script setup lang="ts">
import { STATUS_ICONS } from '#constants';

const route = useRoute();
const slug = route.params.slug as string;

const { getSiteConfig, getOffer } = useContentCache();
const { data: configData } = await getSiteConfig();
const business = computed(() => configData.value?.business);

// ✅ Always fetch offer data
const { data: offer } = await getOffer(slug)

if (!offer.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Offer "${slug}" not found`,
    fatal: true
  });
}

if (offer.value.slug !== slug) {
  navigateTo(`/products/${offer.value.slug}`, { redirectCode: 301 })
}

// ✅ Try to fetch MDC sales page
const { data: salesPage } = await useAsyncData(
  `product-sales-${slug}`,
  () => queryCollection('pages').path(`/products/${slug}`).first(),
  { default: () => null }
);

const hasSalesPage = computed(() => !!salesPage.value);

// --- Offer Page Logic (Inlined) ---

const features = computed(() => {
  if (!offer.value?.features) return [];
  return offer.value.features.map((f) => ({
    ...f,
    icon: STATUS_ICONS[f.icon] || f.icon,
  }));
});

const { isAvailable } = useOfferStock(offer.value.stock as any, offer.value.slug as any);
const hasMedia = computed(() => !!offer.value.media?.src);
const mediaType = computed(() => offer.value.media?.type || null);

// Determine CTA type
const ctaConfig = computed(() => offer.value.ctas.conversion);

// Should show form or button?
const showForm = computed(() => {
  const strategy = ctaConfig.value?.strategy;
  return strategy === 'modal' || !strategy;  // Default to form if no strategy
});

// --- SEO & Tracking ---

defineOgImage({
    component: 'Frame',
    props: {
      title: offer.value.title,
      description: offer.value.description,
      image: business.value?.logo,
    },
})

if (offer.value.price && offer.value.price !== 'Free') {
  const priceMatch = offer.value.price.match(/\$?(\d+)/);
  const priceAmount = priceMatch ? priceMatch[1] : '0';
  
  useSchemaOrg([
    defineProduct({
      name: offer.value.title,
      description: offer.value.description,
      image: offer.value.media?.src,
      offers: {
        price: priceAmount,
        priceCurrency: 'USD',
        availability: 'InStock',
      },
    }),
  ]);
}

definePageMeta({ layout: false });

const { trackEvent } = useEvents();
onMounted(() => {
  trackEvent({
    id: `offer_${offer.value.slug}_view`,
    type: 'element_viewed',
    location: `offer-page-${offer.value.slug}`,
    action: 'page_view',
    target: `/products/${offer.value.slug}`,
    data: {
      offerId: offer.value.slug,
      metadata: {
        offer_slug: offer.value.slug,
        offer_type: offer.value.type,
        offer_price: offer.value.price,
        is_primary: offer.value.primary,
        has_sales_page: hasSalesPage.value,
      },
    },
  });
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden py-16 sm:py-20 lg:py-24">
    <!-- Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </div>

    <!-- Logo -->
    <div class="absolute top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div class="pointer-events-auto">
        <NuxtLink to="/"><ILogo /></NuxtLink>
      </div>
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
          
          <p v-if="offer.tagline" class="text-sm text-muted/60 italic">
            {{ offer.tagline }}
          </p>
        </div>

        

        <!-- Pricing -->
        <div v-if="offer.price && offer.price !== 'Free'" class="mb-12 lg:mb-16">
          <div class="text-center">
            <div class="inline-flex items-baseline gap-2">
              <span v-if="offer.discount" class="text-2xl text-muted/50 line-through">
                {{ offer.discount }}
              </span>
              <span class="text-5xl lg:text-6xl font-bold text-white">
                {{ offer.price }}
              </span>
              <span v-if="offer.billingCycle" class="text-lg text-muted/70">
                {{ offer.billingCycle }}
              </span>
            </div>
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

        <!-- ✅ MDC Sales Content (Injected Here) -->
        <div v-if="hasSalesPage" class="mb-12 lg:mb-16 prose prose-invert max-w-none">
          <ContentRenderer :value="salesPage" :data="{ offer }" />
        </div>

        <!-- CTA Section -->
        <div class="max-w-md mx-auto">
          <div class="bg-white/2 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-6">
            
            <!-- Show form -->
            <IFormValidation
              v-if="showForm"
              :offer="offer"
              cta-name="conversion"
              :location="`sales-page-${offer.slug}`"
            />

            <!-- Show button -->
            <IButtonCTA
              v-else
              :offer-id="offer.slug as any"
              cta-name="conversion"
              location="sales-page-bottom"
              size="xl"
              block
            />
            
            <!-- Stock Progress -->
            <div v-if="offer.stock && isAvailable" class="pt-4 border-t border-white/5">
              <IStockProgress :stock="offer.stock as any" :offer-id="offer.slug as any" />
            </div>
          </div>
        </div>

      </div>
    </UContainer>
  </div>
</template>
