<script setup lang="ts">
const offers = useFlowSection('offers');

// Get primary offer (first one) and alternatives
const primaryOffer = computed(() => offers?.[0] ?? null);
const alternativeOffers = computed(() => offers?.slice(1) ?? []);

// Pricing calculations for primary offer
const hasCompare = computed(
  () => !!(primaryOffer.value?.compareAt && primaryOffer.value?.price),
);

const savings = computed(() => {
  if (!hasCompare.value || !primaryOffer.value) return null;
  const curr = parseMoney(primaryOffer.value.price);
  const comp = parseMoney(primaryOffer.value.compareAt);
  if (isNaN(curr) || isNaN(comp) || comp <= curr) return null;
  return comp - curr;
});

const inventory = computed(() => primaryOffer.value?.inventory ?? null);
const claimed = computed(() => inventory.value?.claimed ?? 0);
const total = computed(() => inventory.value?.total ?? 0);
const pct = computed(() => {
  if (!inventory.value || !total.value) return 0;
  return Math.min(100, Math.round((claimed.value / total.value) * 100));
});

function parseMoney(m?: string) {
  if (!m) return NaN;
  const n = Number(String(m).replace(/[^0-9.-]/g, ''));
  return isFinite(n) ? n : NaN;
}
</script>

<template>
  <UPageSection
    headline="Pricing"
    title="Choose Your Path"
    description="Select the option that best fits your needs"
    icon="i-lucide-bolt"
  >
    <!-- Primary Offer -->
    <UPricingPlan
      v-if="primaryOffer"
      orientation="horizontal"
      variant="soft"
      highlight
      :title="primaryOffer.name"
      :ui="{
        root: 'mx-auto ring-1 ring-primary/20 m-0',
        body: 'pb-4 lg:pb-0 lg:pr-6',
        features: 'lg:grid-cols-1 mt-2',
        footer: 'items-start lg:items-center gap-8 p-4 sm:p-6',
      }"
    >
      <template #description>
        <div class="space-y-3">
          <p class="text-sm text-muted">{{ primaryOffer.description }}</p>
          <p class="text-muted text-sm">
            {{ primaryOffer.guarantee || 'Limited time offer' }}
          </p>
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
                : 'i-lucide-check'
            "
            :class="[
              'size-4 flex-shrink-0',
              benefit.status === 'coming-soon'
                ? 'text-warning'
                : 'text-success',
            ]"
          />
          <span
            :class="[
              'text-xs lg:text-sm truncate',
              benefit.status === 'coming-soon'
                ? 'italic text-muted'
                : 'text-highlighted',
            ]"
          >
            {{ benefit.text }}
          </span>
          <UBadge
            v-if="benefit.value"
            :label="`$${benefit.value} value`"
            size="xs"
            color="success"
            variant="subtle"
            class="ml-auto flex-shrink-0"
          />
        </div>
      </template>

      <template #footer>
        <div
          class="flex items-baseline gap-3 border-b-4 border-warning pb-4 w-full"
        >
          <span class="text-3xl sm:text-4xl font-bold text-primary">
            {{ primaryOffer.price }}
          </span>
          <span v-if="primaryOffer.compareAt" class="line-through text-muted">
            {{ primaryOffer.compareAt }}
          </span>
          <UBadge v-if="savings" variant="soft" color="warning" class="ml-1">
            Save {{ `$${savings}` }}
          </UBadge>
        </div>

        <div v-if="inventory" class="w-full flex flex-col space-y-3">
          <div class="flex justify-between items-center text-xs md:text-sm">
            <span class="text-muted">{{ claimed }}/{{ total }} claimed</span>
            <span class="font-medium text-toned">{{ pct }}% filled</span>
          </div>
          <UProgress
            :model-value="pct"
            color="primary"
            size="xl"
            class="w-full"
          />
        </div>

        <div class="flex flex-col justify-center w-full gap-2">
          <UButton
            :to="primaryOffer.cta.href"
            :trailing-icon="primaryOffer.cta.icon"
            :variant="primaryOffer.cta.variant || 'solid'"
            :color="primaryOffer.cta.color || 'primary'"
            :label="primaryOffer.cta.label"
            size="lg"
            class="w-full justify-between"
          />
          <p
            v-if="primaryOffer.cta.note"
            class="text-xs text-muted text-center"
          >
            {{ primaryOffer.cta.note }}
          </p>
        </div>
      </template>
    </UPricingPlan>

    <USeparator label="OR" />

    <!-- Alternative Offers -->
    <div v-if="alternativeOffers.length" class="mx-auto">
      <UPageGrid class="lg:grid-cols-2">
        <UPageCard
          v-for="altOffer in alternativeOffers"
          :key="altOffer.id"
          :title="altOffer.name"
          :description="altOffer.description"
          variant="outline"
          spotlight
        >
          <template #leading>
            <div>
              <UBadge v-if="altOffer.price" variant="soft">
                {{ altOffer.price }}
              </UBadge>
            </div>
          </template>
          <!-- Benefits -->
          <div v-if="altOffer.benefits?.length" class="space-y-2 py-4">
            <div
              v-for="benefit in altOffer.benefits"
              :key="benefit.text"
              class="flex items-center gap-2 text-sm"
            >
              <UIcon
                name="i-lucide-check"
                class="size-4 text-success flex-shrink-0"
              />
              <span>{{ benefit.text }}</span>
            </div>
          </div>

          <UButton
            :to="altOffer.cta.href"
            :trailing-icon="altOffer.cta.icon"
            :variant="altOffer.cta.variant"
            :color="altOffer.cta.color"
            :label="altOffer.cta.label"
            size="lg"
            class="w-full justify-between"
          />
          <p v-if="altOffer.cta.note" class="text-xs text-muted text-center">
            {{ altOffer.cta.note }}
          </p>
        </UPageCard>
      </UPageGrid>
    </div>
  </UPageSection>
</template>
