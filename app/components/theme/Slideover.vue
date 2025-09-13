<script setup lang="ts">
const { colorPresets, currentPreset, themeSlideoverOpen, applyPreset } =
  useThemeColor();

const select = (id: string) => {
  applyPreset(id);
  // Optional: close after selection
  // themeSlideoverOpen = false
};

const radius = ref(0.25);
const updateRadius = (value: number) => {
  const root = document.documentElement;
  root.style.setProperty('--ui-radius', `${value}rem`);
};

watch(
  radius,
  (newVal) => {
    updateRadius(newVal);
  },
  { immediate: false },
);
</script>

<template>
  <!-- Mount once (layout/app.vue) so state persists across pages -->
  <div>
    <UButton
      variant="ghost"
      color="neutral"
      size="sm"
      icon="i-lucide-palette"
      @click="themeSlideoverOpen = true"
    />
    <USlideover v-model:open="themeSlideoverOpen" title="Switch Theme">
      <template #body>
        <div class="space-y-4">
          <label class="block font-medium mb-3">Border Radius</label>
          <UInputNumber v-model="radius" :step="0.1" :min="0" :max="1" />

          <label class="block font-medium mb-3">Themes</label>
          <div class="grid grid-cols-1 gap-3">
            <UButton
              v-for="preset in colorPresets"
              :key="preset.id"
              :variant="currentPreset === preset.id ? 'solid' : 'outline'"
              :color="currentPreset === preset.id ? 'primary' : 'neutral'"
              class="text-left h-auto p-4"
              @click="select(preset.id)"
            >
              <div class="w-full">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="font-medium">
                      {{ preset.name }}
                    </div>
                    <div class="text-xs">
                      {{ preset.description }}
                    </div>
                  </div>
                  <div
                    class="text-[10px] rounded px-2 py-0.5 border border-default"
                  >
                    {{ preset.mood }}
                  </div>
                </div>

                <!-- Swatches -->
                <div class="grid grid-cols-7 gap-1 mt-3">
                  <div
                    v-for="(color, family) in preset.colors"
                    :key="family"
                    class="aspect-square rounded border-2 border-default"
                    :style="{ backgroundColor: color }"
                    :title="`${family}: ${color}`"
                  />
                </div>
              </div>
            </UButton>
          </div>
          <IThemeFontSelector />
        </div>
      </template>
    </USlideover>
  </div>
</template>
