<script setup lang="ts">
import { CONVERSION } from '#shared/config/navigation';

const data = useFlowSection('offer');

const primaryOffer = computed(() =>
  data?.items.find((offer) => offer.id === CONVERSION.primary),
);

const email = ref('');
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
);
</script>

<template>
  <ISectionWrapper id="#offer" :intro="data.intro" :bridge="data.bridge">
    <div class="max-w-md mx-auto">
      <UPricingPlan
        v-if="primaryOffer"
        v-bind="primaryOffer"
        :ui="{
          root: 'bg-primary/5',
          features: 'gap-3',
          feature: 'items-center',
          featureTitle: 'text-sm leading-tight',
        }"
      >
        <!-- Button slot (same as before) -->
        <template #button>
          <div
            v-if="primaryOffer.id === 'magnet'"
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
              :disabled="!isEmailValid"
            />
            <p
              v-if="primaryOffer.cta.note"
              class="text-xs text-muted text-center"
            >
              {{ primaryOffer.cta.note }}
            </p>
          </div>

          <IButtonCTA
            v-else
            :offer-id="primaryOffer.id"
            location="offer-section"
            size="xl"
            block
          />
        </template>

        <!-- Stock progress -->
        <template v-if="primaryOffer.stock" #terms>
          <IStockProgress :stock="primaryOffer.stock" class="w-full" />
        </template>
      </UPricingPlan>
    </div>
  </ISectionWrapper>
</template>
