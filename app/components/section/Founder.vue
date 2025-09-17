<script setup lang="ts">
interface FounderSectionProps {
  content: {
    headline?: string;
    longMessage: string;
    promise: string;
    expertise: Array<{ label: string; icon?: string }>;
    backgroundStory?: string;
    user: {
      firstName: string;
      lastName: string;
      title: string;
      avatar: { src: string; alt?: string };
    };
    socials?: Array<{
      label: string;
      icon: string;
      to: string;
      target?: '_blank' | '_self';
    }>;
  };
}

const { content } = defineProps<FounderSectionProps>();

const fullName = `${content.user.firstName} ${content.user.lastName}`;
</script>

<template>
  <UPageSection
    orientation="horizontal"
    class="bg-muted"
    :ui="{
      container: 'flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-8',
    }"
  >
    <!-- This content goes in the LEFT side of the horizontal layout -->
    <template #header>
      <!-- User Profile + Social Icons -->
      <div class="flex flex-col items-start gap-4 mb-6">
        <UUser
          :name="fullName"
          :description="content.user.title"
          :avatar="content.user.avatar"
          size="lg"
        />

        <div class="flex items-center gap-1 mt-1">
          <UButton
            v-for="social in content.socials"
            :key="social.label"
            variant="ghost"
            color="neutral"
            size="sm"
            square
            :to="social.to"
            :target="social.target || '_blank'"
            :aria-label="social.label"
          >
            <UIcon :name="social.icon" class="size-4" />
          </UButton>
        </div>
      </div>

      <!-- Expertise badges -->
      <div v-if="content.expertise?.length" class="flex flex-wrap gap-2 mb-6">
        <UBadge
          v-for="expertise in content.expertise"
          :key="expertise.label"
          variant="subtle"
          color="primary"
          size="sm"
        >
          <span class="inline-flex items-center gap-1.5">
            <UIcon
              v-if="expertise.icon"
              :name="expertise.icon"
              class="size-3"
            />
            {{ expertise.label }}
          </span>
        </UBadge>
      </div>
    </template>

    <template #body>
      <!-- Long message using MDC -->
      <div class="prose prose-invert max-w-none mb-6">
        <MDC :value="content.longMessage" />
      </div>

      <!-- Optional background story -->
      <div class="mt-4 text-muted leading-relaxed">
        <MDC :value="content.backgroundStory" />
      </div>
    </template>

    <div>
      <div class="flex justify-end items-start pb-12">
        <ISurround>
          <div class="text-2xl font-bold text-center font-family-written mb-6">
            {{ content.headline || 'My Promise' }}
          </div>
          <template #bottom-start>
            <ISVG type="arrows" variant="up" flip="both" :size="44" />
          </template>
        </ISurround>
      </div>
      <blockquote class="relative">
        <div class="absolute -top-4 left-2 text-7xl text-primary font-serif">
          "
        </div>

        <UCard class="border-2 border-dashed border-primary/30">
          <p class="text-xl leading-relaxed">
            {{ content.promise }}
          </p>
        </UCard>

        <div
          class="absolute -bottom-4 right-2 text-7xl text-primary font-serif rotate-180"
        >
          "
        </div>
      </blockquote>
    </div>
  </UPageSection>
</template>
