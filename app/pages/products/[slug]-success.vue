<script setup lang="ts">
import confetti from 'canvas-confetti';

const route = useRoute();
const productSlug = route.params.slug as string;

if (!productSlug) {
  // Redirect to home if no product specified
  navigateTo('/');
}

// Try to fetch the MDC success page for this product
const { data: successPage } = await useAsyncData(
  `product-success-${productSlug}`,
  () =>
    queryCollection('pages').path(`/products/${productSlug}-success`).first(),
  {
    // Don't fail if page doesn't exist
    default: () => null,
  },
);

onMounted(() => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
});

definePageMeta({ layout: false });
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-linear-to-b from-background to-muted/20"
  >
    <div class="absolute top-6 left-0 right-0 z-50 flex justify-center">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </div>

    <div class="max-w-2xl w-full mx-auto px-4">
      <div
        v-if="successPage"
        class="bg-card rounded-2xl p-8 shadow-xl border border-success/20"
      >
        <ContentRenderer :value="successPage" />
      </div>

      <div
        v-else
        class="bg-card rounded-2xl p-8 shadow-xl border border-success/20 text-center space-y-6"
      >
        <div class="flex justify-center">
          <UIcon name="i-lucide-check-circle" class="w-20 h-20 text-success" />
        </div>

        <div class="space-y-3">
          <h1 class="text-3xl font-bold text-white">You're in!</h1>
          <p class="text-lg text-toned">
            Check your email — we just sent you the goods.
          </p>
          <p class="text-sm text-muted">
            Can't find it? Check spam or reply to ask for help.
          </p>
        </div>

        <div class="pt-4">
          <UButton to="/" size="lg" variant="outline" color="neutral" block>
            Return Home
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
