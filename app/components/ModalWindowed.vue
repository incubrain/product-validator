<script setup lang="ts">
interface Props {
  offerId: OfferID;
  location: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [result?: any] }>();

const offer = await useFlowOffer(props.offerId);
const email = ref('');

// ✅ ADD: Modal open state
const isOpen = ref(true);

const filloutParams = computed(() => ({
  offer_id: offer.value?.id,
  offer_name: offer.value?.name,
  email: email.value,
}));

// ✅ ADD: Close handler that updates state
const handleClose = (result?: any) => {
  isOpen.value = false;
  emit('close', result);
};

// ✅ ADD: Watch for modal close animation to complete
watch(isOpen, (newValue) => {
  if (!newValue) {
    // Give time for close animation before emitting
    setTimeout(() => emit('close'), 200);
  }
});
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="offer?.name"
    :description="offer?.description"
  >
    <template #body>
      <div class="space-y-4">
        <!-- Form embed -->
        <LazyIFilloutForm
          v-if="offer.cta.formId"
          :form-id="offer.cta.formId"
          :params="filloutParams"
          height="500px"
        />
      </div>
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        variant="ghost"
        color="neutral"
        @click="handleClose()"
      />
    </template>
  </UModal>
</template>
