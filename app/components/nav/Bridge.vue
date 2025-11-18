<!-- components/nav/Bridge.vue -->
<script setup lang="ts">
import { CONVERSION } from '#shared/config/navigation';

interface BridgeData {
  headline: string;
  message: string;
  cta: Cta;
  primary?: boolean;
}

interface Props {
  bridge: BridgeData;
}

defineProps<Props>();

// ✅ Get primary offer for form
const primaryOffer = useFlowOffer(CONVERSION.primary);
</script>

<template>
  <div class="relative">
    <!-- Corner brackets -->
    <div class="absolute inset-0 pointer-events-none z-10">
      <div
        class="absolute -top-px -left-px w-12 h-12 border-t-2 border-l-2"
        :class="bridge.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -top-px -right-px w-12 h-12 border-t-2 border-r-2"
        :class="bridge.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -bottom-px -left-px w-12 h-12 border-b-2 border-l-2"
        :class="bridge.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -bottom-px -right-px w-12 h-12 border-b-2 border-r-2"
        :class="bridge.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
    </div>

    <UPageCTA
      :title="bridge.headline"
      :description="bridge.message"
      orientation="vertical"
      :variant="bridge.primary ? 'soft' : 'outline'"
      :links="
        bridge.primary
          ? []
          : [
              {
                label: bridge.cta.label,
                to: bridge.cta.to,
                trailingIcon: bridge.cta.icon,
                color: 'secondary',
                variant: 'subtle',
                size: 'lg',
              },
            ]
      "
      class="rounded-none border border-default/20"
      :ui="{
        container: bridge.primary ? 'py-16 sm:py-20' : 'py-12 sm:py-16',
        title: bridge.primary
          ? 'text-2xl sm:text-3xl font-bold text-primary'
          : 'text-lg sm:text-xl font-bold text-secondary',
        description: bridge.primary
          ? 'text-base sm:text-lg'
          : 'text-sm sm:text-base',
      }"
    >
      <template v-if="bridge.primary" #footer>
        <!-- ✅ Primary CTA: Form capture like Hero -->
        <div class="max-w-2xl mx-auto pt-4">
          <IFormFakeDoor
            location="bridge-cta"
            :offer="primaryOffer"
            layout="horizontal"
          />
        </div>
      </template>
    </UPageCTA>
  </div>
</template>
