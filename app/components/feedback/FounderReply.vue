<script setup lang="ts">
const props = defineProps<{
  location?: 'sidebar' | 'page-footer';
}>();

const { getFounder } = useContentCache();
const { data: founder } = await getFounder();
const route = useRoute();
// const { email: userEmail } = useGatedAccess();

// Logic to construct mailto link
const mailtoLink = computed(() => {
  if (!founder.value?.profile.email) return '#';

  const email = founder.value.profile.email;
  const subject = encodeURIComponent(
    `Question regarding: ${route.meta.title}`,
  );
  // const body = encodeURIComponent(
  //   `\n\n---\nContext: ${route.path}\nUser: ${userEmail.value || 'Anonymous'}`,
  // );
  return `mailto:${email}?subject=${subject}`;
});

// const { track } = useAnalytics();

const handleContact = () => {
  // track('contact_founder_initiated', {
  //   location: props.location || 'unknown',
  //   page_path: route.path,
  // });
};
</script>

<template>
  <div v-if="founder">
    <!-- Sidebar Version: Compact Button -->
    <UTooltip
      v-if="location === 'sidebar'"
      text="Ask a Question"
      placement="right"
    >
      <UButton
        tag="a"
        :to="mailtoLink"
        icon="i-lucide-reply"
        variant="ghost"
        color="neutral"
        square
        size="md"
        @click="handleContact"
      />
    </UTooltip>

    <!-- Page Footer Version: Card -->
    <div
      v-else
      class="border border-default rounded-lg p-6 bg-subtle flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
    >
      <UAvatar
        v-if="founder.profile?.avatar"
        :src="founder.profile.avatar.src"
        :alt="founder.profile.avatar.alt || founder.profile.name"
        size="lg"
      />
      <div class="flex-1">
        <h3 class="font-medium text-foreground">Stuck? Have a question?</h3>
        <p class="text-sm text-muted">
          I read every reply. Shoot me an email and I'll help you out.
        </p>
      </div>
      <UButton
        tag="a"
        :to="mailtoLink"
        label="Email Me"
        icon="i-lucide-mail"
        color="primary"
        variant="soft"
        @click="handleContact"
      />
    </div>
  </div>
</template>
