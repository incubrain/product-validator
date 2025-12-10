<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { OFFERS } from '#shared/config/navigation';

const { trackEvent } = useEvents();

// Fetch founder data
const { data: founder, pending: founderPending } = await useAsyncData(
  'founder-profile',
  () => queryCollection('team').where('stem', '=', 'team/founder').first()
);

// Fetch story content
const { data: story, pending: storyPending } = await useAsyncData(
  'founder-story',
  () => queryCollection('pages').path('/founder').first()
);

const isLoading = computed(() => founderPending.value || storyPending.value);

// Track page view
onMounted(() => {
  if (founder.value) {
    trackEvent({
      id: 'founder_page_view',
      type: 'element_viewed',
      location: 'founder_page',
      action: 'page_view',
      target: '/founder',
      data: {
        metadata: {
          name: `${founder.value.given_name} ${founder.value.surname}`,
        },
      },
    });
  }
});

// Modal State
const route = useRoute();
const isShareOpen = ref(false);

// Handle query param trigger
watch(
  () => route.query.share,
  (share) => {
    if (share === 'true' && !isLoading.value) {
      isShareOpen.value = true;
    }
  },
  { immediate: true }
);

// Web Share API
const shareProfile = async () => {
  const shareData = {
    title: `Connect with ${founder.value.given_name}`,
    text: `Connect with ${founder.value.given_name} ${founder.value.surname} - ${founder.value.role}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // Share cancelled or failed, ignore
    }
  } else {
    // Fallback to copy link
    const { copy } = useClipboard({ source: window.location.href });
    copy();
  }
};

// Generate QR URL with UTM params
const baseUrl = useRequestURL().origin;
const qrUrl = computed(() => {
  const url = new URL(`${baseUrl}/founder`);
  url.searchParams.set('utm_source', 'qr');
  url.searchParams.set('utm_medium', 'inperson');
  url.searchParams.set('utm_campaign', 'founder');
  return url.toString();
});

// SEO
useHead({
  title: founder.value
    ? `${founder.value.given_name} ${founder.value.surname} - ${founder.value.role}`
    : 'Founder',
  meta: founder.value
    ? [{ name: 'description', content: founder.value.bio }]
    : [],
});
</script>

<template>
  <div class="min-h-screen py-16">
    <UContainer>
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
      >
        <div class="space-y-8 lg:col-span-1">
          <!-- Avatar & Profile Skeleton -->
          <div class="flex flex-col items-center gap-6">
            <USkeleton class="h-24 w-24 rounded-full" />
            <div class="space-y-2 w-full text-center">
              <USkeleton class="h-8 w-3/4 mx-auto rounded" />
              <USkeleton class="h-6 w-1/2 mx-auto rounded" />
            </div>
            <USkeleton class="h-20 w-full rounded" />
            <USkeleton class="h-12 w-full rounded-lg" />
            <USkeleton class="h-12 w-full rounded-lg" />
          </div>
          <USkeleton class="h-12 rounded-lg w-full" />
        </div>

        <div class="lg:col-span-2 space-y-4">
          <USkeleton class="h-10 w-3/4 rounded-lg" />
          <USkeleton class="h-5 w-full rounded-lg" />
          <USkeleton class="h-5 w-full rounded-lg" />
          <USkeleton class="h-5 w-5/6 rounded-lg" />
        </div>
      </div>

      <!-- Loaded Content -->
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
      >
        <!-- Left Column: Profile & QR Trigger -->
        <div class="space-y-8 lg:col-span-1 lg:sticky lg:top-4 self-start">
          <TeamProfile :member="founder">
            <template #actions>
              <!-- Iterate directly over OFFERS from config -->
              <ConvertButton
                v-for="(offer, key) in OFFERS"
                :key="key"
                v-bind="offer"
                location="founder_profile"
                size="xl"
                color="primary"
                variant="subtle"
                block
                class="w-full"
              />

              <!-- Secondary Local CTA (if configured and unique) -->
              <ConvertButton
                v-if="founder.cta?.secondary"
                :label="founder.cta.secondary.text"
                :to="founder.cta.secondary.url"
                location="founder_profile"
                cta-type="secondary"
                variant="subtle"
                size="lg"
                block
                color="secondary"
                class="w-full font-black"
              />
            </template>
          </TeamProfile>

          <!-- Share Actions -->
          <div class="flex gap-4">
            <UButton
              label="Share Profile"
              icon="i-heroicons-share"
              size="xl"
              class="flex-1"
              variant="subtle"
              color="primary"
              @click="shareProfile"
            />

            <UButton
              icon="i-heroicons-qr-code"
              size="xl"
              variant="outline"
              color="neutral"
              aria-label="Show QR Code"
              @click="isShareOpen = true"
            />
          </div>

          <!-- QR Modal -->
          <UModal v-model:open="isShareOpen">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-qr-code" class="text-xl" />
                <h3 class="font-semibold">Share Profile</h3>
              </div>
            </template>

            <template #body>
              <div class="flex flex-col items-center gap-6 py-4">
                <!-- Instructions -->
                <div class="text-center space-y-2">
                  <p
                    class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Scan to connect with {{ founder.given_name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Point your camera at the QR code
                  </p>
                </div>

                <!-- QR Code -->
                <TeamQRCode :url="qrUrl" />
              </div>
            </template>
          </UModal>
        </div>

        <!-- Right Column: Story -->
        <div class="lg:col-span-2">
          <div class="max-w-3xl">
            <article
              v-if="story"
              class="prose prose-lg dark:prose-invert space-y-8"
            >
              <h1 class="text-4xl font-bold">{{ story.title }}</h1>
              <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {{ story.description }}
              </p>
              <ContentRenderer :value="story" />
            </article>

            <!-- No Story State -->
            <UEmpty
              v-else
              icon="i-lucide-file-text"
              title="No story available"
              description="The founder story hasn't been added yet."
              variant="subtle"
              size="lg"
              class="my-12"
            />

            <div class="my-12">
              <NavCta
                title="Want to work together?"
                description="We are building a team of A-players who want to help founders succeed."
                orientation="vertical"
                variant="outline"
              >
                <template #links>
                  <ConvertButton
                    to="/offers/join-us"
                    label="Join the Team"
                    location="founder_profile_cta"
                    icon="i-heroicons-briefcase"
                    size="xl"
                    color="secondary"
                    variant="solid"
                    class="font-black"
                  />
                </template>
              </NavCta>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
