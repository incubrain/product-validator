<!-- components/DevStageToggle.vue -->
<script setup lang="ts">
// Only render in dev mode
if (!import.meta.dev) {
  throw new Error('DevStageToggle should only be used in development');
}

const {
  configSource,
  validationStage,
  setDevOverrides,
  resetDevOverrides,
  hasActiveOverrides,
  envValues,
  clearAllStorage,
  logCurrentStorage,
} = useDevTools();

const isOpen = ref(false);

// Available options
const stages: ValidationStage[] = [
  'identity',
  'attention',
  'traffic',
  'conversion',
  'engagement',
  'demand',
  'build_prep',
];
const sources: ConfigSource[] = ['validator', 'custom'];

// ✅ Use Nuxt UI keyboard shortcuts instead of VueUse
defineShortcuts({
  meta_shift_d: {
    usingInput: false, // Don't trigger when inputs are focused
    handler: () => {
      isOpen.value = !isOpen.value;
    },
  },
});

// Handle config source selection
const handleSourceChange = (source: ConfigSource) => {
  setDevOverrides(source, undefined);
};

// Handle validation stage selection
const handleStageChange = (stage: ValidationStage) => {
  setDevOverrides(undefined, stage);
};

// Reset everything
const handleReset = () => {
  resetDevOverrides();
};
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Floating trigger button -->
      <UButton
        v-if="!isOpen"
        icon="i-heroicons-wrench-screwdriver"
        color="secondary"
        variant="solid"
        size="lg"
        :ui="{ base: 'rounded-full' }"
        class="fixed bottom-4 right-4 z-99 shadow-lg"
        @click="isOpen = true"
      >
        <UBadge
          v-if="hasActiveOverrides"
          color="warning"
          variant="solid"
          class="absolute -top-1 -right-1"
        >
          !
        </UBadge>
      </UButton>

      <!-- Dev tools panel -->
      <UCard
        v-if="isOpen"
        :ui="{
          root: 'fixed bottom-4 right-4 z-99 w-[400px] shadow-2xl',
          body: 'p-4 sm:p-4',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-wrench-screwdriver" class="text-lg" />
              <h3 class="text-base font-semibold">Dev Tools</h3>
              <UBadge
                v-if="hasActiveOverrides"
                color="warning"
                variant="soft"
                size="xs"
              >
                Active
              </UBadge>
            </div>
            <UButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="space-y-4">
          <!-- Config Source Section -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Config Source
              </label>
              <UBadge
                v-if="configSource !== envValues.configSource"
                color="warning"
                variant="soft"
                size="xs"
              >
                Override
              </UBadge>
            </div>
            <UFieldGroup size="sm" orientation="horizontal" class="w-full">
              <UButton
                v-for="source in sources"
                :key="source"
                :label="source"
                :color="configSource === source ? 'primary' : 'neutral'"
                :variant="configSource === source ? 'solid' : 'soft'"
                class="flex-1 justify-center"
                @click="handleSourceChange(source)"
              />
            </UFieldGroup>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ENV:
              <code class="text-primary">{{ envValues.configSource }}</code>
            </p>
          </div>

          <!-- Validation Stage Section -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Validation Stage
              </label>
              <UBadge
                v-if="validationStage !== envValues.validationStage"
                color="warning"
                variant="soft"
                size="xs"
              >
                Override
              </UBadge>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <UButton
                v-for="stage in stages"
                :key="stage"
                :label="stage"
                :color="validationStage === stage ? 'primary' : 'neutral'"
                :variant="validationStage === stage ? 'solid' : 'soft'"
                size="sm"
                class="justify-center"
                @click="handleStageChange(stage)"
              />
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ENV:
              <code class="text-primary">{{ envValues.validationStage }}</code>
            </p>
          </div>

          <!-- Storage Actions -->
          <div class="pt-3 border-t border-gray-200 dark:border-gray-800">
            <p
              class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Storage Management
            </p>
            <div class="flex gap-2">
              <UButton
                label="Log Storage"
                icon="i-heroicons-list-bullet"
                color="neutral"
                variant="soft"
                size="xs"
                class="flex-1"
                @click="logCurrentStorage"
              />
              <UButton
                label="Clear Storage"
                icon="i-heroicons-trash"
                color="error"
                variant="soft"
                size="xs"
                class="flex-1"
                @click="clearAllStorage"
              />
            </div>
          </div>

          <!-- Reset Overrides -->
          <div class="pt-3 border-t border-gray-200 dark:border-gray-800">
            <UButton
              label="Reset to ENV Values"
              icon="i-heroicons-arrow-path"
              color="error"
              variant="soft"
              size="sm"
              :disabled="!hasActiveOverrides"
              block
              @click="handleReset"
            />
          </div>

          <!-- Keyboard Hint -->
          <div class="pt-2 border-t border-gray-200 dark:border-gray-800">
            <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
              Press
              <UKbd value="meta" />
              <UKbd>Shift</UKbd>
              <UKbd>D</UKbd>
              to toggle
            </p>
          </div>
        </div>
      </UCard>
    </Teleport>
  </ClientOnly>
</template>
