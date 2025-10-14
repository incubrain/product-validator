<script setup lang="ts">
import type { IconProps } from '@nuxt/ui';
import { CONVERSION } from '#shared/config/navigation';

const data = useFlowSection('offer');

const primaryOffer = computed(() =>
  data?.value.items.find((offer) => offer.id === CONVERSION.primary),
);

// Simple icon alias + color mapping
const STATUS_ICONS: Record<string, IconProps> = {
  'status-available': { name: 'lucide:check', class: 'text-success' },
  'status-beta': { name: 'lucide:flask-conical', class: 'text-info' },
  'status-coming-soon': { name: 'lucide:clock', class: 'text-warning' },
};

// Transform features to include resolved icons
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
        :features="transformedFeatures"
        :ui="{
          root: 'bg-primary/5',
          features: 'gap-3',
          feature: 'items-center',
          featureTitle: 'text-sm leading-tight',
        }"
      >
        <!-- NEW: Display tagline if exists -->
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

        <template v-if="primaryOffer.stock" #terms>
          <IStockProgress :stock="primaryOffer.stock" class="w-full" />
        </template>
      </UPricingPlan>
    </div>
  </ISectionWrapper>
</template>
