<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui';

const product = useFlowSection('product');

// Transform productFlow data for stepper
const stepperItems = computed(
  () =>
    (product?.flow?.map((f) => ({
      title: f.title,
      slot: f.id,
      value: f.id,
    })) satisfies StepperItem[]) ?? [],
);

// Helper to render different content types
function renderContent(content: any[]) {
  return content || [];
}
</script>

<template>
  <UPageSection
    headline="Product"
    icon="i-lucide-bolt"
    title="How it works"
    :description="product?.elevator"
    orientation="vertical"
  >
    <!-- Stepper with dynamic content -->
    <div v-if="stepperItems.length" class="w-full">
      <UStepper
        :items="stepperItems"
        :ui="{
          content: 'mt-8',
          root: 'w-full',
        }"
      >
        <!-- Dynamic step content slots -->
        <template
          v-for="step in product?.flow"
          :key="step.id"
          #[step.id]
        >
          <div class="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
            <!-- Media content (videos/images) -->
            <div class="space-y-6">
              <template
                v-for="(contentItem, index) in renderContent(step.content)"
                :key="index"
              >
                <!-- Video content -->
                <div v-if="contentItem.type === 'video'">
                  <IVideo
                    :src="contentItem.src"
                    :autoplay="false"
                    :muted="true"
                    :loop="false"
                    aspect-ratio="video"
                    class="rounded-xl border border-default"
                  />
                </div>

                <!-- Image content -->
                <div v-else-if="contentItem.type === 'image'">
                  <NuxtImg
                    :src="contentItem.src"
                    :alt="contentItem.alt || `${step.title} demonstration`"
                    class="rounded-xl border border-default w-full"
                  />
                </div>
              </template>
            </div>

            <!-- Text and list content -->
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
                <p class="text-muted">{{ step.description }}</p>
              </div>

              <template
                v-for="(contentItem, index) in renderContent(step.content)"
                :key="`text-${index}`"
              >
                <!-- Text content -->
                <div
                  v-if="contentItem.type === 'text'"
                  class="prose prose-sm max-w-none"
                >
                  <p>{{ contentItem.value }}</p>
                </div>

                <!-- List content -->
                <div v-else-if="contentItem.type === 'list'" class="space-y-2">
                  <ul
                    :class="{
                      'list-disc list-inside': contentItem.style === 'bullets',
                      'list-decimal list-inside':
                        contentItem.style === 'numbers',
                      'space-y-1': contentItem.style === 'checks',
                    }"
                  >
                    <li
                      v-for="item in contentItem.items"
                      :key="item"
                      :class="{
                        'flex items-center gap-2':
                          contentItem.style === 'checks',
                      }"
                    >
                      <UIcon
                        v-if="contentItem.style === 'checks'"
                        name="i-lucide-check"
                        class="size-4 text-success flex-shrink-0"
                      />
                      <span class="text-sm">{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Code content -->
                <div v-else-if="contentItem.type === 'code'" class="space-y-2">
                  <div v-if="contentItem.label" class="text-sm font-medium">
                    {{ contentItem.label }}
                  </div>
                  <pre
                    class="text-sm bg-muted/30 p-3 rounded overflow-x-auto"
                  ><code>{{ contentItem.snippet }}</code></pre>
                </div>
              </template>
            </div>
          </div>
        </template>
      </UStepper>
    </div>
  </UPageSection>
</template>
