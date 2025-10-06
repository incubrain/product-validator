<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui';

const data = useFlowSection('process');

// Transform process flow data for stepper
const stepperItems = computed(
  () =>
    (data?.flow?.map((f) => ({
      title: f.title,
      duration: f.duration,
      slot: f.slot,
      value: f.slot,
    })) satisfies StepperItem[]) ?? [],
);

const features = computed(() => data?.features ?? []);

// Helper to render different content types
function renderContent(content: any[]) {
  return content || [];
}
</script>

<template>
  <ISectionWrapper id="#process" :intro="data.intro" :bridge="data.bridge">
    <!-- Features Grid - ABOVE the flow -->
    <UPageGrid>
      <UPageCard
        v-for="(feature, index) in features"
        :key="index"
        spotlight
        spotlight-color="secondary"
        :ui="{
          leadingIcon: 'text-secondary',
        }"
        v-bind="feature"
      />
    </UPageGrid>

    <!-- Separator -->
    <ISeparator v-if="data.separators?.[0]" v-bind="data.separators[0]" />

    <!-- Process Flow Stepper - BELOW the features -->
    <div v-if="stepperItems.length" class="w-full">
      <UStepper
        :items="stepperItems"
        color="secondary"
        :ui="{
          content: 'mt-8',
          description: 'pt-2',
          root: 'w-full',
        }"
      >
        <template #description="{ item }">
          <UBadge variant="soft" color="secondary">
            {{ item.duration }}
          </UBadge>
        </template>

        <!-- Dynamic step content slots -->
        <template v-for="step in data?.flow" :key="step.slot" #[step.slot]>
          <div class="pb-8">
            <UAlert
              :title="step.title"
              :description="step.description"
              color="info"
              variant="subtle"
            />
          </div>

          <div class="grid lg:grid-cols-2 gap-8 items-start">
            <!-- LEFT: Media -->
            <div class="space-y-6">
              <template
                v-for="(contentItem, index) in renderContent(step.content)"
                :key="index"
              >
                <div v-if="contentItem.type === 'text'">
                  <MDC :value="contentItem.value" />
                </div>
                <!-- Video content -->
                <div v-else-if="contentItem.type === 'video'">
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

            <!-- RIGHT: Step Details + Actions -->
            <div class="space-y-6">
              <div v-if="step.actions" class="space-y-3">
                <div class="space-y-2">
                  <div
                    v-for="action in step.actions"
                    :key="action.task"
                    class="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-default/50"
                  >
                    <!-- Left: Task name with icon -->
                    <div class="flex items-center gap-2 flex-1 min-w-0">
                      <UIcon
                        name="i-lucide-check"
                        class="size-4 text-success flex-shrink-0"
                      />
                      <span class="text-sm font-medium truncate">
                        {{ action.task }}
                      </span>
                    </div>

                    <!-- Right: Time badges -->
                    <div class="flex items-center gap-2 flex-shrink-0">
                      <UBadge variant="subtle" color="info" size="sm">
                        {{ action.estimated_time }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UStepper>
    </div>
  </ISectionWrapper>
</template>
