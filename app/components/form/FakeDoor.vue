<!-- components/form/FakeDoor.vue - UPDATED WITH LAYOUT PROP -->
<script setup lang="ts">
import { z } from 'zod';
import type { Offer } from '#types';

interface Props {
  location: string;
  offer: Offer;
  layout?: 'stacked' | 'horizontal'; // NEW: layout control
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'stacked', // Default to existing behavior
});

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  offerId: z.string().optional(),
});

const state = reactive({
  email: '',
  offerId: props.offer.id,
});

const { submit, isSubmitting, isSuccess } = useFormSubmission({
  formId: 'fake_door',
  schema,
  location: props.location,
});

const handleSubmit = async () => {
  await submit(state);
};

// Dynamic classes based on layout
const formLayoutClass = computed(() => {
  return props.layout === 'horizontal'
    ? 'flex flex-col sm:flex-row gap-3 w-full'
    : 'space-y-3 w-full';
});

const inputContainerClass = computed(() => {
  return props.layout === 'horizontal' ? 'flex-1' : 'w-full';
});

const buttonBlockProp = computed(() => {
  return props.layout === 'stacked';
});
</script>

<template>
  <div class="w-full">
    <!-- Email Capture Form -->
    <div v-if="!isSuccess" class="space-y-3">
      <UForm :state="state" :schema="schema" @submit="handleSubmit">
        <div :class="formLayoutClass">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="your@email.com"
            size="xl"
            :disabled="isSubmitting"
            :class="inputContainerClass"
          />
          <UButton
            type="submit"
            size="xl"
            :block="buttonBlockProp"
            :loading="isSubmitting"
          >
            {{ offer.cta.label }}
          </UButton>
        </div>
      </UForm>
      <p v-if="offer.cta.note" class="text-xs text-muted text-center">
        {{ offer.cta.note }}
      </p>
    </div>
  </div>
</template>
