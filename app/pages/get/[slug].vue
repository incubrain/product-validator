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

// ✅ Track page view on mount
const { trackEvent } = useEvents();
onMounted(() => {
  trackEvent({
    id: `offer_${offer.value.slug}_view`,
    type: 'element_viewed',
    location: `offer-page-${offer.value.slug}`,
    action: 'page_view',
    target: `/get/${offer.value.slug}`,
    data: {
      offerId: offer.value.slug,
      metadata: {
        offer_slug: offer.value.slug,
        offer_type: offer.value.type,
        offer_price: offer.value.price,
        is_primary: offer.value.primary,
      },
    },
  });
});
</script>

<template>
  <div class="relative">
    <div class="absolute top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div class="pointer-events-auto">
        <NuxtLink to="/"><ILogo /></NuxtLink>
      </div>
    </div>
    <IOfferPage v-if="offer" :offer="offer" />
  </div>
</template>
