<!-- RENAME: offers/[slug].vue → get/[slug].vue -->
<script setup lang="ts">
import type { Offer } from '#types';

const route = useRoute();
const slug = route.params.slug as string;

const { getSiteConfig } = useContentCache();
const { data: configData } = await getSiteConfig();
const business = computed(() => configData.value?.business);

// Fetch offer
const { data: offer } = await useAsyncData(`offer-${slug}`, async () => {
  const offers = await queryCollection('offers').where('slug', '=', slug).all();
  return offers[0] as Offer | undefined;
});

if (!offer.value) {
  throw createError({ statusCode: 404, statusMessage: 'Offer not found' });
}

useHead(offer.value.head || {});
useSeoMeta(offer.value.seo || {});

  
  defineOgImage({
    component: 'Frame',
    props: {
      title: offer.value.title,
      description: offer.value.description,
      image: business.value?.logo,
    },
  })

// ✅ DYNAMIC: Use site config instead of hardcoded URL
const { url: siteUrl } = useSiteConfig();
const canonicalUrl = `${siteUrl}/get/${slug}`;

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
});

// ✅ Schema.org for paid offers
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

// ✅ Component resolution (extensible for future types)
const OfferComponent = computed(() => {
  const componentMap = {
    'ebook': resolveComponent('IOfferEbook'),
  };
  return componentMap[offer.value?.type] || resolveComponent('IOfferEbook');
});

// ✅ Stock management
const { isSoldOut } = useOfferStock(offer.value.stock, offer.value.slug);

// ✅ Analytics tracking
const { trackCtaClick, trackSoldOut } = useOfferAnalytics(offer);

watch(isSoldOut, (newValue) => {
  if (newValue) trackSoldOut();
}, { immediate: true });
</script>

<template>
  <div class="relative">
    <div class="absolute top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div class="pointer-events-auto">
        <NuxtLink to="/"><ILogo /></NuxtLink>
      </div>
    </div>
    <component :is="OfferComponent" v-if="offer" :offer="offer" />
  </div>
</template>
