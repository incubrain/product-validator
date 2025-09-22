<script setup lang="ts">
const hypothesis = useFlowSection('hypothesis');
const sections = useFlowSection('hypothesis').sections;

const route = useRoute();
const router = useRouter();

const customerProfiles = computed(() => hypothesis?.customerProfiles ?? []);

// Simplified: Only tabs are reactive
const activeTab = computed({
  get() {
    const queryTab = route.query.profile as string;
    if (queryTab && customerProfiles.value.some((p) => p.id === queryTab)) {
      return queryTab;
    }
    const primaryProfile = customerProfiles.value.find((p) => p.primary);
    return primaryProfile?.id || customerProfiles.value[0]?.id || '';
  },
  set(profileId) {
    router.push({
      query: { ...route.query, profile: profileId },
      hash: route.hash,
    });
  },
});

const tabItems = computed(() =>
  customerProfiles.value.map((profile) => ({
    label: profile.label,
    value: profile.id,
    slot: profile.id,
    primary: profile.primary,
    description: profile.description,
    context: profile.context || {},
    pains: profile.pains || [],
    outcomes: profile.outcomes || [],
  })),
);

// ONLY profile pains are reactive - everything else static
const { profilePains } = useProfileData(activeTab);

// Static data from config (no reactivity needed)
const evidence = computed(() => hypothesis?.evidence ?? []);
const outcomeFeatures = computed(() => hypothesis?.outcomeFeatures ?? []);
const bridge = computed(() => hypothesis?.sections.bridge);
</script>

<template>
  <UPageSection
    :icon="sections?.intro?.icon"
    :headline="sections.intro?.headline"
    :title="sections.intro?.title"
    :description="sections.intro?.description"
    orientation="vertical"
    class="bg-muted/20"
  >
    <!-- Customer Pain Points with Tabs -->
    <div>
      <UTabs
        v-model="activeTab"
        :items="tabItems"
        orientation="vertical"
        variant="link"
        :ui="{
          root: 'grid grid-cols-2 gap-8 items-start',
          list: 'flex-col w-full',
          content: 'w-full',
        }"
      >
        <!-- Left side: Customer Profile Identity Cards -->
        <template #default="{ item }">
          <UPageCard
            :variant="activeTab === item.value ? 'subtle' : 'ghost'"
            class="cursor-pointer"
          >
            <template #title>
              <div class="flex items-center gap-2">
                {{ item.label }}
                <UBadge v-if="item.primary" size="xs" color="info">
                  Primary
                </UBadge>
              </div>
            </template>

            <template #description>
              <div class="space-y-3 text-sm text-left">
                <p class="text-muted italic">{{ item.description }}</p>

                <!-- Context as chips -->
                <div class="flex flex-wrap gap-1">
                  <UBadge
                    v-for="(value, key) in item.context"
                    :key="key"
                    size="xs"
                    variant="soft"
                    color="neutral"
                  >
                    {{ value }}
                  </UBadge>
                </div>
              </div>
            </template>
          </UPageCard>
        </template>

        <!-- Right side: Pain Points for selected profile (reactive) -->
        <template
          v-for="profile in customerProfiles"
          :key="profile.id"
          #[profile.id]
        >
          <UCard class="border-error/30">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-lucide-alert-triangle"
                  class="size-5 text-error"
                />
                <h4 class="font-semibold">
                  Pain Points for {{ profile.label }}
                </h4>
              </div>
            </template>

            <div class="space-y-4">
              <div
                v-for="pain in profilePains"
                :key="pain.label"
                class="p-4 bg-error/5 border border-error/20 rounded-lg"
              >
                <h5 class="font-medium text-sm mb-2">{{ pain.label }}</h5>
                <p class="text-xs text-muted mb-1">
                  Severity: {{ pain.severity }}
                </p>
                <p v-if="pain.cost" class="text-xs text-error">
                  Cost: {{ pain.cost }}
                </p>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>

    <ISeparator
      :label="sections.separators?.research?.label"
      :description="sections.separators?.research?.description"
    />

    <!-- Research Evidence -->
    <div class="text-left">
      <UPageGrid>
        <UPageCard
          v-for="e in evidence"
          :key="e.summary"
          spotlight-color="info"
          spotlight
        >
          <template #leading>
            <div class="p-3 rounded-full bg-info/10 flex">
              <UIcon :name="e.icon" class="size-6 text-info" />
            </div>
          </template>
          <template #title>
            {{ e.summary }}
          </template>
          <template #description>
            <div class="space-y-3">
              <p class="text-sm">{{ e.description }}</p>

              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-3">
                  <UBadge variant="outline" size="xs">
                    n={{ e.sample_size }}
                  </UBadge>
                  <span class="text-muted">{{ e.date }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <UIcon
                    v-for="n in 5"
                    :key="n"
                    name="i-lucide-star"
                    :class="n <= e.strength ? 'text-warning' : 'text-muted'"
                    class="size-3"
                  />
                </div>
              </div>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>

    <ISeparator
      :label="sections.separators?.solution?.label"
      :description="sections.separators?.solution?.description"
    />

    <!-- Value Proposition Features -->
    <div class="text-center">
      <UPageGrid>
        <UPageFeature
          v-for="(feature, index) in outcomeFeatures"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
          orientation="vertical"
          class="relative"
        >
          <template #leading>
            <div class="relative">
              <div
                class="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold"
              >
                {{ index + 1 }}
              </div>
              <div class="p-3 rounded-full flex bg-success/10">
                <UIcon :name="feature.icon" class="size-6 text-success" />
              </div>
            </div>
          </template>
        </UPageFeature>
      </UPageGrid>
    </div>
    <INavBridge :bridge="bridge" />
  </UPageSection>
</template>
