<script setup lang="ts">
import QRCode from 'qrcode';

const props = withDefaults(
  defineProps<{
    url: string;
    size?: number;
  }>(),
  {
    size: 256,
  },
);

const qrSrc = ref('');
const isError = ref(false);
const isLoading = ref(true);

// Generate QR code when URL changes
watch(
  () => props.url,
  async (newUrl) => {
    if (!newUrl) return;

    isLoading.value = true;
    isError.value = false;

    try {
      qrSrc.value = await QRCode.toDataURL(newUrl, {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        width: props.size,
        margin: 2,
      });
    } catch (err) {
      console.error('QR generation failed:', err);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  },
  { immediate: true },
);

const downloadQR = () => {
  if (!qrSrc.value) return;

  // Extract slug from URL for readable filename
  const urlParts = props.url.split('/');
  const slug = urlParts[urlParts.length - 1]?.split('?')[0] || 'profile';

  const link = document.createElement('a');
  link.download = `qr-${slug}.png`;
  link.href = qrSrc.value;
  link.click();
};
</script>

<template>
  <div class="flex flex-col items-center gap-4 relative">
    <!-- Error State -->
    <UEmpty
      v-if="isError"
      icon="i-lucide-alert-circle"
      title="QR Generation Failed"
      description="Unable to generate QR code. Please try again."
      variant="subtle"
      size="sm"
    />

    <!-- Loading State -->
    <USkeleton
      v-else-if="isLoading"
      :style="{ width: size + 'px', height: size + 'px' }"
      class="rounded-lg"
    />

    <!-- Success State - USE REGULAR IMG, NOT NuxtImg -->
    <UTooltip
      v-else
      :text="url"
      :content="{
        align: 'center',
        side: 'top',
        sideOffset: 8,
      }"
    >
      <img
        :src="qrSrc"
        :width="size"
        :height="size"
        alt="QR Code"
        class="border-4 border-gray-200 rounded-lg dark:border-gray-800"
      />
    </UTooltip>

    <UButton
      @click="downloadQR"
      icon="i-heroicons-arrow-down-tray"
      label="Download QR"
      size="sm"
      variant="outline"
      :disabled="!qrSrc || isLoading || isError"
    />
  </div>
</template>
