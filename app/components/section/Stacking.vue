<script setup lang="ts">
const {
  currentTheme,
} = useThemeColor()
</script>

<template>
  <UPageSection>
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">
          Layer Stack Visualization
        </h2>
        <p class="text-sm text-muted">
          Background hierarchy using {{ currentTheme.name }} theme
        </p>
      </template>

      <div class="bg-default p-6 rounded-lg">
        <p class="text-sm font-medium mb-4 flex items-center gap-2">
          <span>Layer 0</span>
          <code class="text-xs bg-black/20 px-1 py-0.5 rounded">bg-default</code>
        </p>

        <div class="bg-muted p-6 rounded-lg mb-4">
          <p class="text-sm font-medium mb-4 flex items-center gap-2">
            <span>Layer 1</span>
            <code class="text-xs bg-black/20 px-1 py-0.5 rounded">bg-muted</code>
          </p>

          <div class="bg-elevated p-6 rounded-lg mb-4">
            <p class="text-sm font-medium mb-4 flex items-center gap-2">
              <span>Layer 2</span>
              <code class="text-xs bg-black/20 px-1 py-0.5 rounded">bg-elevated</code>
            </p>

            <div class="bg-accented p-6 rounded-lg">
              <p class="text-sm font-medium mb-3 flex items-center gap-2">
                <span>Layer 3</span>
                <code class="text-xs bg-black/20 px-1 py-0.5 rounded">bg-accented</code>
              </p>

              <div class="flex gap-2">
                <UButton size="sm">
                  Primary
                </UButton>
                <UButton
                  size="sm"
                  color="secondary"
                >
                  Secondary
                </UButton>
                <UButton
                  size="sm"
                  variant="outline"
                >
                  Outline
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </UPageSection>
</template>

<style scoped>

</style>
