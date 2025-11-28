<script setup lang="ts">
interface Props {
  title?: string;
  items?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "Definition of Done",
  items: () => [],
});

const route = useRoute();
const { local } = useAppStorage();

// Create a unique key for this component instance based on the route path
const storageKey = computed(() => `gated-dod-${route.path}`);

// Persist the set of checked indices with custom Set serialization
const checkedIndices = ref<Set<number>>(new Set());

// Initialize from storage
if (import.meta.client) {
  const stored = local.get(storageKey.value);
  if (stored) {
    try {
      checkedIndices.value = new Set(JSON.parse(stored));
    } catch (e) {
      checkedIndices.value = new Set();
    }
  }

  // Watch for changes and persist
  watch(checkedIndices, (newValue) => {
    local.set(storageKey.value, JSON.stringify(Array.from(newValue)));
  }, { deep: true });
}

const toggleItem = (index: number) => {
  if (checkedIndices.value.has(index)) {
    checkedIndices.value.delete(index);
  } else {
    checkedIndices.value.add(index);
  }
};

const isChecked = (index: number) => checkedIndices.value.has(index);

const allDone = computed(() => {
  return props.items.length > 0 && props.items.every((_, i) => checkedIndices.value.has(i));
});

const { setStepValidity } = useContentProgress();

// Update validity whenever allDone changes
watch(allDone, (isValid) => {
  setStepValidity(route.path, isValid);
}, { immediate: true });

// Cleanup on unmount (optional, but good practice to reset or keep as is? 
// Actually, if we leave the page, we might want to keep the state, but for now let's just update on mount/change)
</script>

<template>
  <div class="my-8 rounded-xl border border-default bg-card p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center size-8 rounded-full bg-muted text-muted-foreground">
          <UIcon name="i-lucide-list-checks" class="size-5" />
        </div>
        <h3 class="text-lg font-semibold text-foreground">
          {{ title }}
        </h3>
      </div>
      
      <div v-if="allDone" class="flex items-center gap-2 text-success text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
        <UIcon name="i-lucide-party-popper" class="size-4" />
        <span>All set!</span>
      </div>
    </div>

    <div class="space-y-3">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="group flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer select-none"
        :class="isChecked(index) ? 'bg-primary/5' : 'hover:bg-muted/50'"
        @click="toggleItem(index)"
      >
        <div 
          class="mt-0.5 size-5 rounded border flex items-center justify-center transition-colors"
          :class="[
            isChecked(index) 
              ? 'bg-primary border-primary text-primary-foreground' 
              : 'border-muted-foreground/30 group-hover:border-primary/50 bg-background'
          ]"
        >
          <UIcon 
            v-if="isChecked(index)" 
            name="i-lucide-check" 
            class="size-3.5" 
          />
        </div>
        <span 
          class="text-sm transition-colors"
          :class="isChecked(index) ? 'text-muted-foreground line-through' : 'text-foreground'"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>
