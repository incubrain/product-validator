<!-- layouts/default.vue - UPDATED -->
<template>
  <div class="min-h-screen bg-muted text-default antialiased">
    <NavHeader />
    <main class="min-h-[calc(100vh-4rem)]">
      <slot />
    </main>
    <NavFooter />
  </div>
</template>
