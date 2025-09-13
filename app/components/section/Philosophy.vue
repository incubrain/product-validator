<script setup lang="ts">
interface Props {
  content: {
    headline: string;
    title: string;
    description: string;
    principles: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

const { content } = defineProps<Props>();

</script>

<template>
  <UPageSection
    :headline="content.headline"
    :title="content.title"
    :description="content.description"
    orientation="vertical"
    :ui="{
      container: 'py-16 sm:py-24 lg:py-32',
    }"
  >
    <!-- Philosophy Cards Grid -->
    <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
      <UPageCard
        v-for="(principle, index) in content.principles"
        :key="index"
        :title="principle.title"
        :description="principle.description"
        :icon="principle.icon"
        variant="subtle"
        class="relative"
      >
        <!-- Custom icon styling -->
        <template #leading>
          <div
            class="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg ring-1 ring-primary/20"
          >
            <UIcon :name="principle.icon" class="text-primary text-lg" />
          </div>
        </template>
      </UPageCard>
    </div>

    <!-- Enhanced Example Section -->
    <div class="mt-20">
      <div class="text-center mb-12">
        <h3 class="text-2xl font-bold text-highlighted mb-3">
          Real Example: Contact Strategy
        </h3>
        <p class="text-muted-foreground">
          See the difference friction-reduction makes in practice
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Traditional Approach Card -->
        <UPageCard
          title="❌ Traditional Approach"
          description="Complex setup, ongoing maintenance"
          variant="outline"
          class="border-error/30"
        >
          <template #body>
            <UPageList divide class="mt-4">
              <div
                v-for="step in [
                  'Build contact form component',
                  'Set up form validation',
                  'Configure email service',
                  'Handle spam protection',
                  'Manage form submissions',
                  'Monitor delivery rates',
                ]"
                :key="step"
                class="py-2"
              >
                <UPageFeature
                  :description="step"
                  icon="i-lucide-x"
                  :ui="{ leadingIcon: 'text-error' }"
                />
              </div>
            </UPageList>
          </template>
        </UPageCard>

        <!-- Friction-Free Approach Card -->
        <UPageCard
          title="✅ Friction-Free Approach"
          description="Direct connection, zero maintenance"
          variant="outline"
          highlight
          highlight-color="success"
          class="border-success/30"
        >
          <template #body>
            <UPageList divide class="mt-4">
              <div
                v-for="step in [
                  'Direct calendar booking link',
                  'Email link with pre-filled subject',
                  'WhatsApp/Telegram direct message',
                  'Zero maintenance required',
                  'Instant connection to prospects',
                  'No technical overhead',
                ]"
                :key="step"
                class="py-2"
              >
                <UPageFeature
                  :description="step"
                  icon="i-lucide-check"
                  :ui="{ leadingIcon: 'text-success' }"
                />
              </div>
            </UPageList>
          </template>
        </UPageCard>
      </div>
    </div>
  </UPageSection>
</template>
