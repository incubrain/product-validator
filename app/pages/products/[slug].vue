<!-- products/[slug].vue -->
<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();
const business = computed(() => configData.value?.business);

// Fetch product page from pages collection (MDC)
const { data: product } = await useAsyncData(`product-page-${slug}`, () =>
  queryCollection('pages').path(`/products/${slug}`).first(),
);

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Product "${slug}" not found`,
    fatal: true,
  });
}

definePageMeta({ layout: false });

defineOgImage({
  component: 'Frame',
  props: {
    title: product.value.title,
    description: product.value.description,
    image: business.value?.logo,
  },
});

const { trackEvent } = useEvents();
onMounted(() => {
  trackEvent({
    id: `product_${slug}_view`,
    type: 'element_viewed',
    location: `product-page-${slug}`,
    action: 'page_view',
    target: `/products/${slug}`,
    data: {
      productSlug: slug,
    },
  });
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden py-16 sm:py-20 lg:py-24"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent"
      />
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
      />
    </div>

    <div
      class="absolute top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div class="pointer-events-auto">
        <NuxtLink to="/"><ILogo /></NuxtLink>
      </div>
    </div>

    <UContainer class="relative z-10">
      <div class="max-w-3xl mx-auto">
        <div class="space-y-6 text-center mb-12 lg:mb-16">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
          >
            {{ product.title }}
          </h1>

          <p
            class="text-lg sm:text-xl text-muted/80 leading-relaxed max-w-2xl mx-auto"
          >
            {{ product.description }}
          </p>
        </div>

        <div class="mb-12 lg:mb-16 prose prose-invert max-w-none">
          <ContentRenderer :value="product" />
        </div>

        <div class="max-w-md mx-auto">
          <div
            class="bg-white/2 border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-6"
          >
            <IConvertEmail
              cta-type="conversion"
              :location="`sales-page-${slug}`"
              :success-redirect="`/products/${slug}-success`"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
