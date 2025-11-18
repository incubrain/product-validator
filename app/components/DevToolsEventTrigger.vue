<!-- components/DevToolsEventTrigger.vue -->
<script setup lang="ts">
import type { EventPayload } from '#shared/types/events';
import type { SelectMenuItem } from '@nuxt/ui';
import {
  EVENT_METADATA,
  EVENT_CHAINS,
  applyFallbacks,
} from '#shared/config/events';

if (!import.meta.dev) {
  throw new Error('DevToolsEventTrigger should only be used in development');
}

type EventExecution = {
  id: string;
  type: TrackedEvents;
  timestamp: number;
  data?: Record<string, any>;
  error?: any;
  status: 'pending' | 'success' | 'error';
};

const isOpen = ref(false);
const { trackEvent } = useEvents();
const route = useRoute();
const nuxtApp = useNuxtApp();

// Event chain tracking
const eventChain = ref<EventExecution[]>([]);

// Listen for event executions
nuxtApp.hook('devtools:event-executed', (event) => {
  const existingEvent = eventChain.value.find((e) => e.id === event.eventId);
  if (existingEvent) {
    existingEvent.status = 'success';
    existingEvent.data = event.data;
  } else {
    eventChain.value.push({
      id: event.eventId,
      type: event.eventType,
      timestamp: Date.now(),
      data: event.data,
      status: 'success',
    });
  }
});

// Listen for event errors
nuxtApp.hook('devtools:event-error', (event) => {
  const existingEvent = eventChain.value.find((e) => e.id === event.eventId);
  if (existingEvent) {
    existingEvent.status = 'error';
    existingEvent.error = event.error;
  } else {
    eventChain.value.push({
      id: event.eventId,
      type: event.eventType,
      timestamp: Date.now(),
      error: event.error,
      status: 'error',
    });
  }
});

// Transform metadata into grouped items
const groupedItems = computed<SelectMenuItem[][]>(() => {
  const byCategory: Record<string, SelectMenuItem[]> = {
    form: [{ type: 'label', label: 'Form Events' }],
    modal: [{ type: 'label', label: 'Modal Events' }],
    action: [{ type: 'label', label: 'Action Events' }],
    other: [{ type: 'label', label: 'Other Events' }],
  };

  Object.entries(EVENT_METADATA).forEach(([eventType, meta]) => {
    byCategory[meta.category].push({
      label: meta.label,
      value: eventType as TrackedEvents,
      icon: meta.icon,
      description: meta.description,
    });
  });

  return Object.values(byCategory).filter((group) => group.length > 1);
});

const selectedEvent = ref<SelectMenuItem | null>(null);

const triggerEvent = async () => {
  if (!selectedEvent.value) return;

  // Clear previous chain
  eventChain.value = [];

  const eventType = selectedEvent.value.value as TrackedEvents;
  const chainConfig = EVENT_CHAINS[eventType];

  // Auto-generate required data with fallbacks
  const eventData = applyFallbacks({}, chainConfig?.requiredFields || []);

  const payload: EventPayload = {
    id: `devtools_${Date.now()}`,
    type: eventType,
    location: route.path,
    action: 'devtools_trigger',
    target: 'manual',
    timestamp: Date.now(),
    data: eventData,
    _devToolsTriggered: true,
  };

  await trackEvent(payload);
};

const handleClose = () => {
  isOpen.value = false;
  selectedEvent.value = null;
  eventChain.value = [];
};

const getStatusColor = (status: EventExecution['status']) => {
  switch (status) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
};

const getStatusIcon = (status: EventExecution['status']) => {
  switch (status) {
    case 'success':
      return 'i-lucide-check-circle';
    case 'error':
      return 'i-lucide-x-circle';
    case 'pending':
      return 'i-lucide-loader-circle';
    default:
      return 'i-lucide-circle';
  }
};

defineExpose({
  open: () => {
    isOpen.value = true;
  },
});
</script>

<template>
  <ClientOnly>
    <UModal v-model:open="isOpen">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-zap" class="text-warning" />
          <h3 class="text-lg font-semibold">Trigger Event</h3>
        </div>
      </template>

      <template #body>
        <div class="space-y-4">
          <!-- Event Selection -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Select Event</label>
            <USelectMenu
              v-model="selectedEvent"
              :items="groupedItems"
              placeholder="Choose event..."
              class="w-full"
              :search-input="{
                icon: 'i-lucide-search',
                placeholder: 'Search...',
              }"
            >
              <template #leading="{ modelValue }">
                <UIcon
                  v-if="modelValue"
                  :name="modelValue.icon"
                  class="size-5"
                />
                <UIcon v-else name="i-lucide-zap" class="size-5 text-muted" />
              </template>

              <template #item-leading="{ item }">
                <UIcon v-if="item.icon" :name="item.icon" class="size-5" />
              </template>

              <template #item-label="{ item }">
                <div class="flex flex-col gap-0.5">
                  <span class="font-medium">{{ item.label }}</span>
                  <span v-if="item.description" class="text-xs text-muted">
                    {{ item.description }}
                  </span>
                </div>
              </template>
            </USelectMenu>
          </div>

          <!-- Info Box -->
          <div
            v-if="selectedEvent"
            class="p-3 bg-muted/50 rounded-lg text-xs space-y-1"
          >
            <div class="font-medium">Auto-generated test data</div>
            <div class="text-muted">
              Required fields filled with mock values
            </div>
          </div>

          <!-- Event Chain (shown after trigger) -->
          <div v-if="eventChain.length > 0" class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-activity" class="text-primary size-4" />
                <span class="text-sm font-semibold">Event Chain</span>
                <UBadge
                  :label="String(eventChain.length)"
                  size="xs"
                  color="primary"
                />
              </div>
              <UButton
                icon="i-lucide-trash-2"
                color="neutral"
                variant="ghost"
                size="xs"
                square
                @click="eventChain = []"
              />
            </div>

            <div
              class="border border-default rounded-lg divide-y divide-default max-h-60 overflow-y-auto"
            >
              <div
                v-for="(event, index) in eventChain"
                :key="event.id"
                class="p-3 hover:bg-muted/50 transition-colors"
              >
                <div class="flex items-start gap-2">
                  <!-- Chain number -->
                  <div
                    class="size-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5"
                    :class="[
                      index === 0
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted',
                    ]"
                  >
                    {{ index + 1 }}
                  </div>

                  <!-- Event details -->
                  <div class="flex-1 min-w-0 space-y-1">
                    <div class="flex items-center gap-2">
                      <UIcon
                        :name="getStatusIcon(event.status)"
                        :class="[
                          'size-4',
                          event.status === 'pending' && 'animate-spin',
                        ]"
                      />
                      <span class="font-mono text-xs font-medium truncate">
                        {{ event.type }}
                      </span>
                      <UBadge
                        :label="event.status"
                        :color="getStatusColor(event.status)"
                        size="xs"
                        variant="soft"
                      />
                    </div>

                    <!-- Error details -->
                    <div
                      v-if="event.error"
                      class="text-xs text-error space-y-1"
                    >
                      <div class="font-medium">Error:</div>
                      <div
                        class="font-mono bg-error/10 p-2 rounded text-[10px] break-all"
                      >
                        {{ event.error.message || String(event.error) }}
                      </div>
                    </div>

                    <!-- Data preview -->
                    <details
                      v-if="event.data && Object.keys(event.data).length > 0"
                      class="text-xs"
                    >
                      <summary
                        class="cursor-pointer text-muted hover:text-default"
                      >
                        View data
                      </summary>
                      <pre
                        class="mt-1 p-2 bg-muted/50 rounded font-mono text-[10px] overflow-x-auto"
                        >{{ JSON.stringify(event.data, null, 2) }}</pre
                      >
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-2 justify-end w-full">
          <UButton label="Close" variant="ghost" @click="handleClose" />
          <UButton
            label="Trigger"
            icon="i-lucide-zap"
            :disabled="!selectedEvent"
            @click="triggerEvent"
          />
        </div>
      </template>
    </UModal>
  </ClientOnly>
</template>
