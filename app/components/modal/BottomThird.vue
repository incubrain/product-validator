<!-- components/ModalBottomThird.vue -->
<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  dismissible?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: 'Success',
  description: '',
  dismissible: true,
});

const emit = defineEmits<{ close: [] }>();

const isOpen = ref(true);

const handleClose = () => {
  isOpen.value = false;
  emit('close');
};
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Backdrop -->
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 bg-background/80 backdrop-blur-sm z-998"
          @click="dismissible && handleClose()"
        />
      </Transition>

      <!-- Modal -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-y-0"
        leave-to-class="translate-y-full"
      >
        <div
          v-if="isOpen"
          class="fixed bottom-0 left-0 right-0 z-999 mx-auto max-w-4xl"
        >
          <UCard
            :ui="{
              root: 'rounded-t-2xl rounded-b-none shadow-2xl border-t-2 border-x-2 border-primary/20',
              body: 'space-y-4 p-6 sm:p-8',
              header: 'flex items-start justify-between p-6 sm:p-8 pb-0',
            }"
          >
            <template #header>
              <div class="space-y-1 flex-1">
                <h3 class="text-xl sm:text-2xl font-bold">
                  {{ title }}
                </h3>
                <p v-if="description" class="text-sm text-muted">
                  {{ description }}
                </p>
              </div>
              <UButton
                v-if="dismissible"
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="sm"
                square
                @click="handleClose"
              />
            </template>

            <slot :close="handleClose" />
          </UCard>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
