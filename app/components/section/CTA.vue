<script setup lang="ts">
import { ref } from 'vue';

export interface CTAContent {
  title: string;
  subtitle: string;
  features: string[];
  price: string;
  primaryButton: {
    text: string;
    action: 'external' | 'leadCapture';
    url?: string; // for external action
  };
  leadCapture?: {
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
      buttonUrl?: string;
    };
  };
}

export interface CTAProps {
  content: CTAContent;
}

const props = defineProps<CTAProps>();

const showLeadCapture = ref(false);
const submitted = ref(false);
const email = ref('');

function handlePrimaryClick() {
  if (
    props.content.primaryButton.action === 'external' &&
    props.content.primaryButton.url
  ) {
    window.open(props.content.primaryButton.url, '_blank');
  } else if (props.content.primaryButton.action === 'leadCapture') {
    showLeadCapture.value = true;
  }
}

function handleNotify() {
  if (!email.value) return;
  submitted.value = true;
}
</script>

<template>
  <UPageSection :ui="{ container: 'py-16 sm:py-24 lg:py-32' }">
    <!-- Lead Capture Mode -->
    <div v-if="showLeadCapture && content.leadCapture">
      <UPageCTA
        variant="soft"
        :title="content.leadCapture.title"
        :description="content.leadCapture.description"
        class="relative overflow-hidden border"
      >
        <template #body>
          <div class="max-w-xl mx-auto">
            <div class="flex justify-center gap-2">
              <UInput
                v-model="email"
                type="email"
                size="xl"
                :placeholder="content.leadCapture.form.placeholder"
                autocomplete="email"
              />
              <UButton size="xl" :disabled="!email" @click="handleNotify">
                {{ content.leadCapture.form.buttonText }}
              </UButton>
            </div>

            <div
              v-if="submitted"
              class="mt-4 rounded-lg border border-default/50 p-4"
            >
              <h4 class="font-semibold mb-1">
                {{ content.leadCapture.success.title }}
              </h4>
              <p class="text-sm">
                {{ content.leadCapture.success.description }}
              </p>
              <div class="mt-3">
                <UButton
                  size="md"
                  color="secondary"
                  :to="content.leadCapture.success.buttonUrl"
                  target="_blank"
                >
                  {{ content.leadCapture.success.buttonText }}
                </UButton>
              </div>
            </div>
          </div>
        </template>
      </UPageCTA>
    </div>

    <!-- Pricing Card Mode -->
    <div v-else>
      <UPricingPlan
        orientation="horizontal"
        variant="soft"
        highlight
        :title="content.title"
        :description="content.subtitle"
        :price="content.price"
        :features="content.features"
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
  </UPageSection>
</template>
