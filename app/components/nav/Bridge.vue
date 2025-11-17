<!-- components/nav/Bridge.vue -->
<script setup lang="ts">
interface BridgeData {
  headline: string;
  message: string;
  cta: Cta;
}

interface Props {
  bridge: BridgeData;
}

defineProps<Props>();
</script>

<template>
  <div class="relative">
    <!-- Corner brackets -->
    <div class="absolute inset-0 pointer-events-none z-10">
      <div
        class="absolute -top-px -left-px w-12 h-12 border-t-2 border-l-2 border-secondary/30"
      />
      <div
        class="absolute -top-px -right-px w-12 h-12 border-t-2 border-r-2 border-secondary/30"
      />
      <div
        class="absolute -bottom-px -left-px w-12 h-12 border-b-2 border-l-2 border-secondary/30"
      />
      <div
        class="absolute -bottom-px -right-px w-12 h-12 border-b-2 border-r-2 border-secondary/30"
      />
    </div>

    <UPageCTA
      :title="bridge.headline"
      :description="bridge.message"
      orientation="vertical"
      variant="outline"
      :links="[
        {
          label: bridge.cta.label,
          to: bridge.cta.to,
          trailingIcon: bridge.cta.icon,
          color: 'secondary',
          variant: 'subtle',
          size: 'lg',
        },
      ]"
      class="rounded-none border border-default/20"
      :ui="{
        container: 'py-12 sm:py-16',
        title: 'text-lg sm:text-xl font-bold text-secondary',
        description: 'text-sm sm:text-base',
      }"
    />
  </div>
</template>
