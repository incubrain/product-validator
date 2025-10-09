<script setup lang="ts">
interface Props {
  offerId: OfferID;
  location: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [result?: any] }>();

const isOpen = ref(true);

const offer = useFlowOffer(props.offerId);
const email = ref('');

const filloutParams = computed(() => ({
  offer_id: offer.value?.id,
  offer_name: offer.value?.title,
  email: email.value,
}));

const handleClose = (result?: any) => {
  isOpen.value = false;
  emit('close', result);
};

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
    :title="offer?.title"
    :description="offer?.description"
  >
    <template #body>
      <div class="space-y-4">
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
        label="Close"
        variant="ghost"
        color="neutral"
        @click="handleClose()"
      />
    </template>
  </UModal>
</template>
