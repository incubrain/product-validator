<!-- components/section/Offer.vue -->
<script setup lang="ts">
import type { IconProps } from '@nuxt/ui';

defineProps<{
  data?: any;
}>();


// Get primary offer
const { getPrimaryOffer } = useContentCache();
const { data: primaryOffer } = await getPrimaryOffer();

const STATUS_ICONS: Record<string, IconProps & { class: string }> = {
  'status-available': { name: 'lucide:check', class: 'text-success' },
  'status-beta': { name: 'lucide:flask-conical', class: 'text-info' },
  'status-coming-soon': { name: 'lucide:clock', class: 'text-warning' },
};

const transformedFeatures = computed(() => {
  if (!primaryOffer.value?.features) return [];

  return primaryOffer.value.features.map((feature) => {
    const resolved = STATUS_ICONS[feature.icon] || {
      name: feature.icon,
      class: '',
    };
    return {
      title: feature.title,
      icon: resolved.name,
      class: resolved.class,
    };
  });
});

const { showSection } = useSectionVisibility();
</script>

<template>
  <ISectionWrapper
    v-if="showSection('offer')"
    id="#offer"
    :intro="data.intro"
    :cta="data.cta"
    class="relative"
  >
    <!-- ✅ Subtle radial glow -->
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div class="w-[80%] h-[80%] bg-primary/5 rounded-full blur-3xl" />
    </div>

    <div 
    v-if="primaryOffer"
    class="max-w-md mx-auto relative z-10"
    >
      <UPricingPlan
        v-bind="primaryOffer"
        :features="transformedFeatures"
        variant="outline"
        :ui="{
          root: 'bg-primary/5 backdrop-blur-sm',
          features: 'gap-3',
          feature: 'items-center',
          terms: 'w-full',
          featureTitle: 'text-sm leading-tight',
        }"
      >
        <template #description>
          <p class="text-base text-toned">{{ primaryOffer.description }}</p>
        </template>

        <template #features>
          <ul class="flex flex-col gap-3 flex-1 mt-6 grow-0">
            <li
              v-for="feature in transformedFeatures"
              :key="feature.title"
              class="flex items-center gap-2 min-w-0"
            >
              <UIcon
                :name="feature.icon"
                :class="[feature.class, 'size-5 shrink-0']"
              />
              <span class="text-muted text-sm truncate">
                {{ feature.title }}
              </span>
            </li>
          </ul>
        </template>

        <template #button>
          <div class="pt-4 w-full">
            <IFormValidation location="offer-section" :offer="primaryOffer" />
          </div>
        </template>

        <template v-if="primaryOffer.stock" #terms>
          <IStockProgress
            :stock="primaryOffer.stock"
            :offer-id="primaryOffer.slug"
            class="w-full"
          />
        </template>
      </UPricingPlan>
      <div 
      v-if="primaryOffer.secondaryCta"
      class="mt-4 flex flex-col gap-4 justify-center items-center"
      >
        <UBadge variant="soft">
          OR
        </UBadge>
        <UButton
          block
          size="xl"
          :color="primaryOffer.secondaryCta.color || 'neutral'"
          variant="outline"
          :label="primaryOffer.secondaryCta.label"
          :to="primaryOffer.secondaryCta.to"
          :icon="primaryOffer.secondaryCta.icon"
          target="_blank"
        />
      </div>
    </div>
  </ISectionWrapper>
</template>
