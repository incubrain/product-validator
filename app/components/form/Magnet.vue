<script setup lang="ts">
import { z } from 'zod';
import type { Offer } from '#types';

interface Props {
  location: string;
  offer: Offer;
}

const props = defineProps<Props>();

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  offerId: z.string().optional(),
});

const state = reactive({
  email: '',
  offerId: props.offer.id,
});

const { submit, isSubmitting, isSuccess } = useFormSubmission({
  formId: 'magnet',
  schema,
  location: props.location,
});

const handleSubmit = async () => {
  await submit(state);
};
</script>

<template>
  <div class="w-full">
    <!-- Email Capture Form -->
    <div v-if="!isSuccess" class="space-y-3">
      <UForm :state="state" :schema="schema" @submit="handleSubmit">
        <div class="space-y-3 w-full">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="your@email.com"
            size="xl"
            :disabled="isSubmitting"
            class="w-full"
          />
          <UButton type="submit" size="xl" block :loading="isSubmitting">
            {{ offer.cta.label }}
          </UButton>
        </div>
      </UForm>
      <p v-if="offer.cta.note" class="text-xs text-muted text-center">
        {{ offer.cta.note }}
      </p>
    </div>

    <!-- ✅ Success message (only when NOT redirecting) -->
    <IFormMessage v-else form-id="magnet" :celebrate="true" />
  </div>
</template>
