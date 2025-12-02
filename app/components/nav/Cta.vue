<!-- components/nav/Cta.vue -->
<script setup lang="ts">
interface SectionCta {
  headline: string;
  message: string;
  button: Cta;
  primary?: boolean;
}

interface Props {
  cta: SectionCta;
}

defineProps<Props>();

// Fetch primary product from collection
const { getPrimaryProduct } = useContentCache();
const { data: primaryProduct } = await getPrimaryProduct();

</script>

<template>
  <div class="relative">
    <!-- Corner brackets -->
    <div class="absolute inset-0 pointer-events-none z-10">
      <div
        class="absolute -top-px -left-px w-12 h-12 border-t-2 border-l-2"
        :class="cta.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -top-px -right-px w-12 h-12 border-t-2 border-r-2"
        :class="cta.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -bottom-px -left-px w-12 h-12 border-b-2 border-l-2"
        :class="cta.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -bottom-px -right-px w-12 h-12 border-b-2 border-r-2"
        :class="cta.primary ? 'border-primary/40' : 'border-secondary/30'"
      />
    </div>

    <UPageCTA
      :title="cta.headline"
      :description="cta.message"
      orientation="vertical"
      variant="naked"
      :links="
        cta.primary
          ? []
          : [
              {
                label: cta.button.label,
                to: cta.button.to,
                trailingIcon: cta.button.icon,
                color: 'secondary',
                variant: 'subtle',
                size: 'lg',
              },
            ]
      "
      class="rounded-none"
      :ui="{
        container: cta.primary ? 'py-16 sm:py-20' : 'py-12 sm:py-16',
        title: cta.primary
          ? 'text-2xl sm:text-3xl font-bold text-primary'
          : 'text-lg sm:text-xl font-bold text-secondary',
        description: cta.primary
          ? 'text-base sm:text-lg'
          : 'text-sm sm:text-base',
      }"
    >
      <template v-if="cta.primary" #footer>
        <!-- ✅ Primary CTA: Form capture like Hero -->
        <div class="max-w-2xl mx-auto pt-4">
          <IFormValidation
            location="bridge-cta"
            :product="primaryProduct"
            layout="horizontal"
          />
        </div>
      </template>
    </UPageCTA>
  </div>
</template>
