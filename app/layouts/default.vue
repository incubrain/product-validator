<!-- layouts/default.vue -->
<script lang="ts" setup>
import { CONVERSION } from '#shared/config/navigation';
const { reachedStage } = useSectionVisibility();
</script>

<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <INavBanner
      v-if="CONVERSION.banner"
      :offer-id="CONVERSION.secondary"
      :sticky="CONVERSION.banner.sticky"
      :class="CONVERSION.navbar?.sticky ? '' : 'border-b'"
    />
    <INavHeader
      v-if="CONVERSION.navbar && reachedStage('conversion')"
      :sticky="CONVERSION.navbar.sticky"
      :class="CONVERSION.banner?.sticky ? 'top-(--ui-banner-height)' : 'top-0'"
    />
    <main>
      <slot />
    </main>
    <INavFooter v-if="reachedStage('conversion')" />
  </div>
</template>
