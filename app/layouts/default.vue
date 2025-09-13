<!-- layouts/default.vue - UPDATED -->
<template>
  <div class="min-h-screen bg-default text-default antialiased">
    <INavHeader />
    <main class="min-h-[calc(100vh-4rem)]">
      <slot />
    </main>
    <INavFooter />
  </div>
</template>
