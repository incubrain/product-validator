<!-- components/MagnetCTA.vue -->
<script setup lang="ts">
const email = ref('');
const isModalOpen = ref(false);
const offer = useFlowOffer('magnet');

const handleSubmit = () => {
  if (!email.value || !isValidEmail(email.value)) {
    return;
  }
  isModalOpen.value = true;
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const filloutParams = computed(() => ({
  id: offer.value.name,
  email: email.value,
}));
</script>

<template>
  <div class="space-y-4">
    <UInput
      v-model="email"
      type="email"
      placeholder="your@email.com"
      size="xl"
      class="w-full"
      required
    />

    <UButton
      :label="offer.cta.label"
      :trailing-icon="offer.cta.icon"
      size="xl"
      class="w-full justify-between font-bold cursor-pointer"
      :disabled="!isValidEmail(email)"
      @click="handleSubmit"
    />

    <p v-if="offer.cta.note" class="text-xs text-muted text-center">
      {{ offer.cta.note }}
    </p>
    <!-- {EXTRACT} -->
    <UModal
      v-model:open="isModalOpen"
      :title="`Complete ${offer.name} Registration`"
      description="Help us understand how we can best help you"
    >
      <template #body>
        <LazyIFilloutForm
          :form-id="offer.cta.formId"
          :params="filloutParams"
          height="500px"
        />
      </template>

      <template #footer>
        <UButton
          label="Cancel"
          color="neutral"
          variant="outline"
          @click="isModalOpen = false"
        />
      </template>
    </UModal>
  </div>
</template>
