<script setup lang="ts">
const route = useRoute();
import { useClipboard } from '@vueuse/core';
import { OFFERS } from '#shared/config/navigation';

const { trackEvent } = useEvents();

// Fetch team member from existing collection
const { data: member, pending: memberPending } = await useAsyncData(
  `team-${route.params.slug}`,
  () =>
    queryCollection('team')
      .where('slug', '=', route.params.slug as string)
      .first(),
);

if (!memberPending.value && !member.value) {
  throw createError({
    statusCode: 404,
    message: 'Team member not found',
  });
}

// Fetch story content
const { data: story, pending: storyPending } = await useAsyncData(
  `team-story-${route.params.slug}`,
  () => queryCollection('pages').path(`/team/${route.params.slug}`).first(),
);

// Combined loading state
const isLoading = computed(() => memberPending.value || storyPending.value);

// Track page view
onMounted(() => {
  if (member.value) {
    trackEvent({
      id: `team_page_view_${route.params.slug}`,
      type: 'element_viewed',
      location: 'team_page',
      action: 'page_view',
      target: route.path,
      data: {
        metadata: {
          slug: route.params.slug as string,
          name: `${member.value.given_name} ${member.value.surname}`,
        },
      },
    });
  }
});

// Modal State
const isShareOpen = ref(false);

// Handle query param trigger
watch(
  () => route.query.share,
  (share) => {
    if (share === 'true' && !isLoading.value) {
      isShareOpen.value = true;
    }
  },
  { immediate: true },
);

// Web Share API
const shareProfile = async () => {
  const shareData = {
    title: `Connect with ${member.value.given_name}`,
    text: `Connect with ${member.value.given_name} ${member.value.surname} - ${member.value.role}`,
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
  const url = new URL(`${baseUrl}/team/${route.params.slug}`);
  url.searchParams.set('utm_source', 'qr');
  url.searchParams.set('utm_medium', 'inperson');
  url.searchParams.set('utm_campaign', route.params.slug as string);
  return url.toString();
});

// Copy functionality

// SEO
useHead({
  title: member.value
    ? `${member.value.given_name} ${member.value.surname} - ${member.value.role}`
    : 'Team Member',
  meta: member.value
    ? [{ name: 'description', content: member.value.bio }]
    : [],
});
</script>

<template>
  <div class="min-h-screen py-16">
    <UContainer>
      <!-- Loading State - Refined to match new layout -->
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
          <div class="pt-8 space-y-3">
            <USkeleton class="h-5 w-full rounded-lg" />
            <USkeleton class="h-5 w-full rounded-lg" />
            <USkeleton class="h-5 w-4/5 rounded-lg" />
          </div>
        </div>
      </div>

      <!-- Loaded Content -->
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
      >
        <!-- Left Column: Profile & QR Trigger -->
        <div class="space-y-8 lg:col-span-1 lg:sticky lg:top-4 self-start">
          <ITeamProfile :member="member">
            <template #actions>
              <!-- Iterate directly over OFFERS from config -->
              <IConvertButton
                v-for="(offer, key) in OFFERS"
                :key="key"
                v-bind="offer"
                location="team_profile"
                size="xl"
                color="primary"
                variant="subtle"
                block
                class="w-full"
              />

              <!-- Secondary Local CTA (if configured and unique) -->
              <IConvertButton
                v-if="member.cta?.secondary"
                :label="member.cta.secondary.text"
                :to="member.cta.secondary.url"
                location="team_profile"
                cta-type="secondary"
                variant="subtle"
                size="lg"
                block
                color="secondary"
                class="w-full font-black"
              />
            </template>
          </ITeamProfile>

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
                    Scan to connect with {{ member.given_name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Point your camera at the QR code
                  </p>
                </div>

                <!-- QR Code -->
                <ITeamQRCode :url="qrUrl" />
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
              description="This team member hasn't added their story yet."
              variant="subtle"
              size="lg"
              class="my-12"
            />

            <div class="my-12">
              <INavCta
                title="Want to work together?"
                description="We are building a team of A-players who want to help founders succeed."
                orientation="vertical"
                variant="outline"
              >
                <template #links>
                  <IConvertButton
                    to="/team"
                    label="Meet the Team"
                    location="founder_profile_cta"
                    icon="i-heroicons-users"
                    size="xl"
                    color="neutral"
                    variant="link"
                  />
                  <IConvertButton
                    to="/team/join-us"
                    label="Join the Team"
                    location="founder_profile_cta"
                    icon="i-heroicons-briefcase"
                    size="xl"
                    color="secondary"
                    variant="solid"
                    class="font-black"
                  />
                </template>
              </INavCta>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
