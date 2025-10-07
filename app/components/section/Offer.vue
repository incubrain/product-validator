<script setup lang="ts">
import { CONVERSION } from '#shared/config/navigation';
const data = await useFlowSection('offer');

// Find primary offer
const primaryOffer = computed(() =>
  data?.items.find((offer) => offer.id === CONVERSION.primary),
);

// Map offer data to PricingPlan props
const pricingPlanProps = computed(() => {
  if (!primaryOffer.value) return null;

  const offer = primaryOffer.value;

  return {
    title: offer.name,
    description: offer.description,

    // Price handling
    price: offer.price?.current || 'Free',
    discount: offer.price?.future,
    billingCycle: offer.price?.recurrence
      ? `/${offer.price.recurrence}`
      : undefined,

    // Features with status icons
    features: offer.benefits.map((benefit) => ({
      title: benefit.text,
      icon:
        benefit.status === 'coming-soon'
          ? 'i-lucide-clock'
          : benefit.status === 'beta'
          ? 'i-lucide-flask-conical'
          : 'i-lucide-check',
    })),

    // Stock info as terms
    terms: offer.stock
      ? `${offer.stock.claimed}/${offer.stock.limit} ${
          offer.stock.type || 'spots'
        } claimed`
      : undefined,

    // Visual styling
    highlight: offer.primary,
    variant: 'outline',
  };
});


// Email capture state (only for magnet)
const email = ref('');
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
);
</script>

<template>
  <ISectionWrapper id="#offer" :intro="data.intro" :bridge="data.bridge">
    <!-- Primary Offer - Vertical Layout -->
    <div class="max-w-md mx-auto">
      <UPricingPlan
        v-if="pricingPlanProps"
        v-bind="pricingPlanProps"
        :ui="{
          root: 'bg-primary/5',
          features: 'gap-3',
          feature: 'items-start',
          featureIcon: [
            '[&.i-lucide-check]:text-success',
            '[&.i-lucide-clock]:text-warning',
            '[&.i-lucide-flask-conical]:text-info',
          ],
          featureTitle: 'text-sm leading-tight',
          button: 'font-bold',
        }"
      >
        <!-- Button slot - handles both magnet (modal) and others (links) -->
        <template #button>
          <!-- Magnet: Email capture + modal trigger -->
          <div
            v-if="primaryOffer?.id === 'magnet'"
            class="space-y-3 pt-4 w-full"
          >
            <UInput
              v-model="email"
              type="email"
              placeholder="your@email.com"
              size="xl"
              class="w-full"
            />
            <IButtonCTA
              :offer-id="primaryOffer.id"
              location="offer-section"
              size="xl"
              block
              class="font-bold"
              :disabled="!isEmailValid"
            />
            <p
              v-if="primaryOffer.cta.note"
              class="text-xs text-muted text-center"
            >
              {{ primaryOffer.cta.note }}
            </p>
          </div>

          <!-- Non-magnet: Direct CTA button -->
          <IButtonCTA
            v-else-if="primaryOffer"
            :offer-id="primaryOffer.id"
            location="offer-section"
            size="xl"
            block
            class="font-bold"
          />
        </template>

        <!-- Stock progress bar -->
        <template v-if="primaryOffer?.stock" #terms>
          <IStockProgress :stock="primaryOffer.stock" />
        </template>
      </UPricingPlan>
    </div>
  </ISectionWrapper>
</template>
