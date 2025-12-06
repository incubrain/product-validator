<script setup lang="ts">
import type { SectionCta } from '#shared/types/config';

interface Props {
  cta?: SectionCta;
  title?: string;
  description?: string;
  variant?: 'outline' | 'solid' | 'soft' | 'subtle' | 'naked';
  orientation?: 'vertical' | 'horizontal';
}

const props = withDefaults(defineProps<Props>(), {
  cta: undefined,
  title: undefined,
  description: undefined,
  variant: 'outline',
  orientation: 'vertical',
});

// Computed values to handle mix of direct props and cta object
const displayTitle = computed(() => props.title || props.cta?.headline);
const displayDescription = computed(
  () => props.description || props.cta?.message,
);
const isPrimary = computed(() => props.cta?.primary ?? false);

// Generate links only if cta object is present and using default button logic
const defaultLinks = computed(() => {
  if (props.cta && !props.cta.primary) {
    return [
      {
        label: props.cta.button.label,
        to: props.cta.button.to,
        trailingIcon: props.cta.button.icon,
        color: 'secondary',
        variant: 'subtle',
        size: 'lg',
      },
    ];
  }
  return [];
});
</script>

<template>
  <div class="relative">
    <!-- Corner brackets -->
    <div class="absolute inset-0 pointer-events-none z-10">
      <div
        class="absolute -top-px -left-px w-12 h-12 border-t-2 border-l-2 rounded-tl-lg"
        :class="isPrimary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -top-px -right-px w-12 h-12 border-t-2 border-r-2 rounded-tr-lg"
        :class="isPrimary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -bottom-px -left-px w-12 h-12 border-b-2 border-l-2 rounded-bl-lg"
        :class="isPrimary ? 'border-primary/40' : 'border-secondary/30'"
      />
      <div
        class="absolute -bottom-px -right-px w-12 h-12 border-b-2 border-r-2 rounded-br-lg"
        :class="isPrimary ? 'border-primary/40' : 'border-secondary/30'"
      />
    </div>

    <UPageCTA
      :title="displayTitle"
      :description="displayDescription"
      :orientation="orientation"
      :variant="variant"
      :links="defaultLinks"
      :ui="{
        container: isPrimary ? 'py-16 sm:py-20' : 'py-12 sm:py-16',
        title: isPrimary
          ? 'text-2xl sm:text-3xl font-bold text-primary'
          : 'text-lg sm:text-xl font-bold text-secondary',
        description: isPrimary
          ? 'text-base sm:text-lg'
          : 'text-sm sm:text-base',
      }"
    >
      <!-- Expose slots -->
      <template #links>
        <slot name="links" />
      </template>

      <template v-if="cta?.primary" #footer>
        <div class="max-w-2xl mx-auto pt-4">
          <ConvertEmail
            location="bridge-cta"
            cta-type="conversion"
            layout="horizontal"
          />
        </div>
      </template>
    </UPageCTA>
  </div>
</template>
