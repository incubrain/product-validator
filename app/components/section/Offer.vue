<script setup lang="ts">
const data = useFlowSection('offer');

// Find primary offer and alternatives
const primaryOffer = computed(
  () => data?.items.find((offer) => offer.primary) ?? data?.[0],
);

// Pricing calculations for primary offer
const hasCompare = computed(() => {
  const offer = primaryOffer.value;
  return !!(offer?.price?.current && offer?.price?.future);
});

const savings = computed(() => {
  if (!hasCompare.value || !primaryOffer.value) return null;
  const curr = parseMoney(primaryOffer.value.price?.current);
  const comp = parseMoney(primaryOffer.value.price?.future);
  if (isNaN(curr) || isNaN(comp) || comp <= curr) return null;
  return comp - curr;
});

const inventory = computed(() => primaryOffer.value?.stock ?? null);
const claimed = computed(() => inventory.value?.claimed ?? 0);
const total = computed(() => inventory.value?.limit ?? 0);
const pct = computed(() => {
  if (!inventory.value || !total.value) return 0;
  return Math.min(100, Math.round((claimed.value / total.value) * 100));
});

function parseMoney(m?: string) {
  if (!m) return NaN;
  const n = Number(String(m).replace(/[^0-9.-]/g, ''));
  return isFinite(n) ? n : NaN;
}

// Format price display
function formatPrice(offer: any) {
  if (!offer?.price) return offer?.price || 'Free';
  if (typeof offer.price === 'string') return offer.price;
  return offer.price.current || 'Free';
}
</script>

<template>
  <ISectionWrapper id="#offer" :intro="data.intro" :bridge="data.bridge">
    <!-- Primary Offer - Always Visible -->
    <div class="mb-8">
      <UPageCard variant="naked" spotlight spotlight-color="primary">
        <UPricingPlan
          v-if="primaryOffer"
          orientation="horizontal"
          highlight
          :title="primaryOffer.name"
          :ui="{
            root: 'mx-auto ring-2 ring-primary/30 m-0 bg-primary/5',
            body: 'pb-4 lg:pb-0 lg:pr-6',
            features: 'lg:grid-cols-1 mt-2',
            footer:
              'items-start lg:items-center lg:justify-between h-full gap-8 p-4 sm:p-6 lg:py-0',
          }"
        >
          <template #description>
            <div class="pt-2">
              <p class="text-lg text-dimmed">{{ primaryOffer.description }}</p>
            </div>
          </template>

          <template #features>
            <div
              v-for="(benefit, i) in primaryOffer.benefits"
              :key="i"
              class="flex items-center gap-2 min-w-0"
            >
              <UIcon
                :name="
                  benefit.status === 'coming-soon'
                    ? 'i-lucide-clock'
                    : benefit.status === 'beta'
                    ? 'i-lucide-flask-conical'
                    : 'i-lucide-check'
                "
                :class="[
                  'size-4 flex-shrink-0',
                  benefit.status === 'coming-soon'
                    ? 'text-warning'
                    : benefit.status === 'beta'
                    ? 'text-info'
                    : 'text-success',
                ]"
              />
              <span
                :class="[
                  'text-sm lg:text-base truncate',
                  benefit.status === 'coming-soon'
                    ? 'italic text-dimmed'
                    : 'text-highlighted',
                ]"
              >
                {{ benefit.text }}
              </span>
              <!-- Value badge (none on magnet offer, but keep for other offers) -->
              <UBadge
                v-if="benefit.value"
                :label="`$${benefit.value} value`"
                size="sm"
                color="secondary"
                variant="subtle"
                class="ml-auto flex-shrink-0"
              />
            </div>
          </template>

          <template #footer>
            <div
              class="py-3 bg-success/5 px-3 space-x-2 rounded-lg border border-success/10 flex items-baseline justify-start"
              :class="primaryOffer.price ? 'w-full' : ''"
            >
              <span class="text-4xl font-bold text-primary-400">
                {{ formatPrice(primaryOffer) }}
              </span>
              <span v-if="hasCompare" class="line-through text-muted">
                {{ primaryOffer.price?.future }}
              </span>
              <span v-if="savings" class="text-highlighted text-xs">
                <!-- {EXTRACT} -->
                Save ${{ savings }}
              </span>
            </div>

            <div class="flex flex-col justify-center w-full gap-4">
              <div v-if="inventory" class="w-full flex flex-col space-y-3">
                <div
                  class="flex justify-between items-center text-xs md:text-sm"
                >
                  <span class="font-medium text-dimmed">
                    <!-- {EXTRACT} -->
                    {{ pct }}% claimed
                  </span>
                  <span class="text-muted">
                    <!-- {EXTRACT} -->
                    {{ claimed }}/{{ total }} spots
                  </span>
                </div>
                <UProgress
                  :model-value="pct"
                  color="success"
                  size="xl"
                  class="w-full"
                />
              </div>

              <div class="flex flex-col justify-center w-full gap-2">
                <IMagnetCTA v-if="primaryOffer?.id === 'magnet'" />

                <!-- Regular CTA for paid offers -->
                <div v-else>
                  <UButton
                    :to="primaryOffer.cta.to"
                    :label="primaryOffer.cta.label"
                    :trailing-icon="primaryOffer.cta.icon"
                  />
                  <p
                    v-if="primaryOffer.cta.note"
                    class="text-xs text-muted text-center"
                  >
                    {{ primaryOffer.cta.note }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </UPricingPlan>
      </UPageCard>
    </div>
  </ISectionWrapper>
</template>
