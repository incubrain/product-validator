<!-- products/[slug].vue -->
<script setup lang="ts">
import { STATUS_ICONS } from '#constants';

const route = useRoute();
const slug = route.params.slug as string;

const { getSiteConfig, getProduct } = useContentCache();
const { data: configData } = await getSiteConfig();
const business = computed(() => configData.value?.business);

// ✅ Always fetch product data
const { data: product } = await getProduct(slug)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Product "${slug}" not found`,
    fatal: true
  });
}

if (product.value.slug !== slug) {
  navigateTo(`/products/${product.value.slug}`, { redirectCode: 301 })
}

// ✅ Try to fetch MDC sales page
const { data: salesPage } = await useAsyncData(
  `product-sales-${slug}`,
  () => queryCollection('pages').path(`/products/${slug}`).first(),
  { default: () => null }
);

const hasSalesPage = computed(() => !!salesPage.value);

// --- Product Page Logic (Inlined) ---

const features = computed(() => {
  if (!product.value?.features) return [];
  return product.value.features.map((f) => ({
    ...f,
    icon: STATUS_ICONS[f.icon] || f.icon,
  }));
});

const { isAvailable } = useProductStock(product.value.stock as any, product.value.slug as any);
const hasMedia = computed(() => !!product.value.media?.src);
const mediaType = computed(() => product.value.media?.type || null);

// Determine CTA type
const ctaConfig = computed(() => product.value.ctas.conversion);

// Should show form or button?
const showForm = computed(() => {
  const strategy = ctaConfig.value?.strategy;
  return strategy === 'modal' || !strategy;  // Default to form if no strategy
});

// --- SEO & Tracking ---

defineOgImage({
    component: 'Frame',
    props: {
      title: product.value.title,
      description: product.value.description,
      image: business.value?.logo,
    },
})

if (product.value.price && product.value.price !== 'Free') {
  const priceMatch = product.value.price.match(/\$?(\d+)/);
  const priceAmount = priceMatch ? priceMatch[1] : '0';
  
  useSchemaOrg([
    defineProduct({
      name: product.value.title,
      description: product.value.description,
      image: product.value.media?.src,
      products: {
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
    id: `product_${product.value.slug}_view`,
    type: 'element_viewed',
    location: `product-page-${product.value.slug}`,
    action: 'page_view',
    target: `/products/${product.value.slug}`,
    data: {
      productId: product.value.slug,
      metadata: {
        product_slug: product.value.slug,
        product_type: product.value.type,
        product_price: product.value.price,
        is_primary: product.value.primary,
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
            {{ product.title }}
          </h1>
          
          <p class="text-lg sm:text-xl text-muted/80 leading-relaxed max-w-2xl mx-auto">
            {{ product.description }}
          </p>
          
          <p v-if="product.tagline" class="text-sm text-muted/60 italic">
            {{ product.tagline }}
          </p>
        </div>

        

        <!-- Pricing -->
        <div v-if="product.price && product.price !== 'Free'" class="mb-12 lg:mb-16">
          <div class="text-center">
            <div class="inline-flex items-baseline gap-2">
              <span v-if="product.discount" class="text-2xl text-muted/50 line-through">
                {{ product.discount }}
              </span>
              <span class="text-5xl lg:text-6xl font-bold text-white">
                {{ product.price }}
              </span>
              <span v-if="product.billingCycle" class="text-lg text-muted/70">
                {{ product.billingCycle }}
              </span>
            </div>
            <p v-if="product.terms" class="text-sm text-muted/60 mt-3">
              {{ product.terms }}
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
                :src="product.media.src"
                :alt="product.media.alt || product.title"
                class="w-full h-full"
              />

              <NuxtImg 
                v-else-if="mediaType === 'image'" 
                :src="product.media.src" 
                :alt="product.media.alt || product.title"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- ✅ MDC Sales Content (Injected Here) -->
        <div v-if="hasSalesPage" class="mb-12 lg:mb-16 prose prose-invert max-w-none">
          <ContentRenderer :value="salesPage" :data="{ product }" />
        </div>

        <!-- CTA Section -->
        <div class="max-w-md mx-auto">
          <div class="bg-white/2 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-6">
            
            <!-- Show form -->
            <IConvertEmail
              v-if="showForm"
              :product="product"
              cta-name="conversion"
              :location="`sales-page-${product.slug}`"
            />

            <!-- Show button -->
            <IConvertButton
              v-else
              :product-id="product.slug as any"
              cta-name="conversion"
              location="sales-page-bottom"
              size="xl"
              block
            />
            
            <!-- Stock Progress -->
            <div v-if="product.stock && isAvailable" class="pt-4 border-t border-white/5">
              <IStockProgress :stock="product.stock as any" :product-id="product.slug as any" />
            </div>
          </div>
        </div>

      </div>
    </UContainer>
  </div>
</template>
