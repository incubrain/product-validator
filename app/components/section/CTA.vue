<script setup lang="ts">
import { ref, computed } from 'vue';

export interface CTAContent {
  badge?: { text: string; icon?: string };
  title: string;
  subtitle: string;
  primaryButton: {
    text: string;
    icon?: string;
  };
  secondaryButton?: {
    text: string;
    icon?: string;
  };
  backCard: {
    title: string;
    description: string;
    form: {
      placeholder: string;
      buttonText: string;
    };
    success: {
      title: string;
      description: string;
      buttonText: string;
    };
    progress: {
      total: number;
      current: number;
      labels: {
        priceIncrease: string;
        spotsFilled: string;
      };
    };
  };
}

export interface CTAProps {
  content: CTAContent;
}

const props = defineProps<CTAProps>();

const flipped = ref(false);
const submitted = ref(false);
const email = ref('');

const percent = computed(() => {
  const p =
    (props.content.backCard.progress.current /
      props.content.backCard.progress.total) *
    100;
  return Math.min(100, Math.max(0, Math.round(p)));
});

function handlePrimaryClick() {
  flipped.value = true;
}

function handleNotify() {
  if (!email.value) return;
  submitted.value = true;
}
</script>

<template>
  <UPageSection :ui="{ container: 'py-16 sm:py-24 lg:py-32' }">
    <div class="relative perspective">
      <div
        class="transition-transform duration-500 transform-3d"
        :class="flipped ? 'rotate-y-180' : ''"
      >
        <!-- FRONT FACE -->
        <div class="backface-hidden">
          <UPricingPlan
            orientation="horizontal"
            variant="soft"
            highlight
            :title="content.title"
            :description="content.subtitle"
            price="$50"
            :features="[
              'Setup in minutes (Nuxt 4 + Tailwind v4)',
              'A/B variants for headline & CTA',
              'Social-first distribution playbook',
              'No lock-in (Nuxt events → any analytics)',
              'Optional public YouTube critique',
            ]"
            :button="{
              label: content.primaryButton.text,
              size: 'xl',
              onClick: handlePrimaryClick,
            }"
            :ui="{
              root: 'min-h-[320px] ring-secondary',
              footer: 'items-start lg:items-center',
            }"
          />
        </div>

        <!-- BACK FACE -->
        <div class="backface-hidden rotate-y-180 absolute inset-0">
          <UPageCTA
            variant="soft"
            :title="content.backCard.title"
            :description="content.backCard.description"
            class="relative overflow-hidden border"
          >
            <template #body>
              <div class="max-w-xl mx-auto">
                <div class="flex justify-center gap-2">
                  <UInput
                    v-model="email"
                    type="email"
                    size="xl"
                    :placeholder="content.backCard.form.placeholder"
                    autocomplete="email"
                  />
                  <UButton size="xl" :disabled="!email" @click="handleNotify">
                    {{ content.backCard.form.buttonText }}
                  </UButton>
                </div>

                <div
                  v-if="submitted"
                  class="mt-4 rounded-lg border border-default/50 p-4"
                >
                  <h4 class="font-semibold mb-1">
                    {{ content.backCard.success.title }}
                  </h4>
                  <p class="text-sm">
                    {{ content.backCard.success.description }}
                  </p>
                  <div class="mt-3">
                    <UButton size="md" color="secondary">{{
                      content.backCard.success.buttonText
                    }}</UButton>
                  </div>
                </div>
              </div>

              <!-- RIGHT DOCKED VERTICAL PROGRESS -->
              <div class="hidden md:block absolute inset-y-0 right-0 w-20">
                <div class="relative h-full">
                  <!-- Track -->
                  <div
                    class="absolute right-4 top-4 bottom-4 w-10 rounded-2xl bg-accented/30 ring-1 ring-default/30 overflow-hidden"
                    aria-hidden="true"
                  >
                    <!-- Fill -->
                    <div
                      class="absolute bottom-0 left-0 right-0 bg-primary"
                      :style="{
                        height: percent + '%',
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                      }"
                    />
                  </div>

                  <!-- Labels -->
                  <div
                    class="absolute inset-y-0 right-24 flex flex-col justify-between pointer-events-none"
                  >
                    <!-- Top label -->
                    <div class="relative mt-6">
                      <ISurround gap="lg">
                        <ISVG type="arrows" variant="right" :size="34" />
                        <template #left-end>
                          <span
                            class="bg-warning/20 border border-warning-700 px-2 rounded font-written font-bold"
                          >
                            {{ content.backCard.progress.labels.priceIncrease }}
                          </span>
                        </template>
                      </ISurround>
                    </div>

                    <!-- Bottom label -->
                    <div
                      :style="{
                        position: 'absolute',
                        top: `calc(${100 - percent}% - 6px)`,
                      }"
                    >
                      <ISurround gap="lg">
                        <ISVG
                          type="arrows"
                          variant="right"
                          :size="34"
                          flip-vertical
                        />
                        <template #left-start>
                          <span class="text-muted font-written font-bold">
                            {{ content.backCard.progress.current }}
                            {{ content.backCard.progress.labels.spotsFilled }}
                          </span>
                        </template>
                      </ISurround>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </UPageCTA>
        </div>
      </div>
    </div>
  </UPageSection>
</template>

<style scoped>
.perspective {
  perspective: 1200px;
}
.transform-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
