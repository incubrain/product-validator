<script setup lang="ts">
const { colorPresets, currentPreset, themeSlideoverOpen } = useThemeColor();
const {
  headingFont,
  bodyFont,
  headingWeights,
  bodyWeights,
  headingWeightSummary,
  bodyWeightSummary,
} = useThemeFonts();

// Sample data for components
const avatarItems = [
  { name: 'John Doe', src: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Jane Smith', src: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Mike Johnson', src: 'https://i.pravatar.cc/150?img=3' },
];

const progressValue = ref(65);
const collapsibleOpen = ref(false);

const formState = reactive({
  fullName: '',
  email: '',
  age: undefined,
  skills: [],
  experience: '',
  preferences: [],
  bio: '',
});

function onFormSubmit(event: any) {
  console.log('Form submitted:', event.data);
}

const buttonVariants = ['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'];

const buttonColors = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'info',
  'warning',
  'error',
];

const badgeColors = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'info',
  'warning',
  'error',
];

const buttonSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const commandPaletteOpen = ref(false);
const treeValue = ref({ label: 'index.vue' });

const statuses = ['online', 'away', 'busy', 'offline'];
const status = ref(statuses[0]);
const color = computed(() =>
  status.value
    ? ({
        online: 'success',
        away: 'warning',
        busy: 'error',
        offline: 'neutral',
      }[status.value] as any)
    : 'online',
);
const show = computed(() => status.value !== 'offline');

onMounted(() => {
  setInterval(() => {
    if (status.value) {
      status.value =
        statuses[(statuses.indexOf(status.value) + 1) % statuses.length];
    }
  }, 2000);
});
</script>

<template>
  <div class="min-h-screen">
    <!-- Simple Header -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <UPageHeader
          class="border-none"
          headline="Themeable"
          title="Theme Showcase"
          :description="`${
            colorPresets.find((p) => p.id === currentPreset)?.name
          } theme`"
        />

        <UButton
          variant="outline"
          color="neutral"
          icon="i-lucide-palette"
          @click="themeSlideoverOpen = true"
        >
          Switch Theme
        </UButton>
      </div>

      <!-- Documentation Alert -->
      <UAlert
        color="info"
        variant="subtle"
        title="Complete Component Library"
        description="This showcase highlights theme variations. Visit the Nuxt UI documentation to explore all components and their full capabilities."
        class="mb-8"
      >
        <template #actions>
          <UButton
            to="https://ui.nuxt.com"
            target="_blank"
            color="info"
            variant="outline"
            size="xs"
          >
            View Docs
          </UButton>
        </template>
      </UAlert>

      <UPageColumns variant="dense" spacing="xs">
        <!-- 1. Buttons & Badges -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Buttons & Badges</h3>
          </template>
          <div class="space-y-6">
            <!-- All Button Colors with their variants -->
            <div
              v-for="buttonColor in buttonColors"
              :key="buttonColor"
              class="space-y-2"
            >
              <h4 class="text-sm font-medium capitalize">
                {{ buttonColor }} Buttons
              </h4>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-for="variant in buttonVariants"
                  :key="`${buttonColor}-${variant}`"
                  :variant="variant"
                  :color="buttonColor"
                  size="sm"
                >
                  {{ variant }}
                </UButton>
              </div>
            </div>

            <!-- Button Sizes (single color/variant) -->
            <div class="border-t border-default pt-4 space-y-2">
              <h4 class="text-sm font-medium">Button Sizes</h4>
              <div class="flex flex-wrap items-end gap-2">
                <UButton
                  v-for="size in buttonSizes"
                  :key="`size-${size}`"
                  variant="solid"
                  color="primary"
                  :size="size"
                >
                  {{ size }}
                </UButton>
              </div>
            </div>

            <!-- All Badge Colors -->
            <div class="border-t border-default pt-4 space-y-2">
              <h4 class="text-sm font-medium">Badges</h4>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="badgeColor in badgeColors"
                  :key="`badge-${badgeColor}`"
                  :color="badgeColor"
                  size="sm"
                >
                  {{ badgeColor }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>

        <!-- 2. Avatars & User Profiles -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Avatars & Users</h3>
          </template>
          <div class="space-y-4">
            <div>
              <UChip :color="color" :show="show" inset>
                <UAvatar :src="avatarItems[0].src" :alt="avatarItems[0].name" />
              </UChip>
            </div>

            <UAvatarGroup size="md" max="2">
              <UAvatar
                v-for="item in avatarItems"
                :key="item.name"
                :src="item.src"
                :alt="item.name"
              />
            </UAvatarGroup>
            <div class="space-y-3 pt-2">
              <UUser
                name="Sarah Wilson"
                description="Product Manager"
                :avatar="{ src: 'https://i.pravatar.cc/150?img=4' }"
              />
              <UUser
                name="Alex Chen"
                description="Senior Developer"
                :avatar="{ src: 'https://i.pravatar.cc/150?img=5' }"
              />
            </div>
          </div>
        </UCard>

        <!-- 3. Alerts & Progress -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Alerts & Progress</h3>
          </template>
          <div class="space-y-4">
            <UAlert
              color="success"
              title="Success"
              description="Operation completed successfully!"
            />
            <UAlert
              color="warning"
              title="Warning"
              description="Please review before proceeding."
            />
            <UAlert
              color="error"
              title="Error"
              description="Something went wrong."
            />

            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span>Primary</span>
                  <span>{{ progressValue }}%</span>
                </div>
                <UProgress :value="progressValue" color="primary" />
              </div>
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span>Success</span>
                  <span>85%</span>
                </div>
                <UProgress :value="85" color="success" />
              </div>
            </div>
          </div>
        </UCard>

        <!-- 5. Collapsible & Accordion -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Collapsible & Accordion</h3>
          </template>
          <div class="space-y-4">
            <UCollapsible v-model:open="collapsibleOpen">
              <template #content>
                <div class="p-4 text-sm text-neutral-600 dark:text-neutral-400">
                  This is collapsible content that demonstrates theme colors.
                </div>
              </template>
            </UCollapsible>

            <UAccordion
              :items="[
                {
                  label: 'Getting Started',
                  icon: 'i-lucide-rocket',
                  content: 'Learn the basics of our platform.',
                },
                {
                  label: 'Advanced Features',
                  icon: 'i-lucide-settings',
                  content: 'Explore powerful tools and integrations.',
                },
                {
                  label: 'API Documentation',
                  icon: 'i-lucide-code',
                  content: 'Complete API reference.',
                },
              ]"
            />
          </div>
        </UCard>

        <!-- 6. Tabs & Content Organization -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Tabs & Content</h3>
          </template>
          <UTabs
            :items="[
              { label: 'Overview', slot: 'overview' },
              { label: 'Analytics', slot: 'analytics' },
              { label: 'Settings', slot: 'settings' },
            ]"
            color="primary"
          >
            <template #overview>
              <div class="p-4 text-sm">
                Dashboard overview with key metrics and recent activity.
              </div>
            </template>
            <template #analytics>
              <div class="p-4 text-sm">
                Detailed analytics and performance insights.
              </div>
            </template>
            <template #settings>
              <div class="p-4 text-sm">
                Configure your preferences and account settings.
              </div>
            </template>
          </UTabs>
        </UCard>

        <!-- 7. Table & Data Display -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Table & Data</h3>
          </template>
          <UTable
            :columns="[
              { accessorKey: 'name', header: 'Name' },
              { accessorKey: 'role', header: 'Role' },
              { accessorKey: 'status', header: 'Status' },
            ]"
            :data="[
              { name: 'John Doe', role: 'Developer', status: 'Active' },
              { name: 'Jane Smith', role: 'Designer', status: 'Away' },
              { name: 'Mike Johnson', role: 'Manager', status: 'Active' },
            ]"
          />
        </UCard>

        <!-- 8. Timeline & Activity -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Timeline & Activity</h3>
          </template>
          <UTimeline
            :items="[
              {
                label: 'Project Created',
                description: 'Initial setup completed',
                icon: 'i-lucide-plus-circle',
                color: 'primary',
              },
              {
                label: 'First Deploy',
                description: 'Application deployed to staging',
                icon: 'i-lucide-rocket',
                color: 'success',
              },
              {
                label: 'Production Release',
                description: 'Live for all users',
                icon: 'i-lucide-check-circle',
                color: 'warning',
              },
            ]"
          />
        </UCard>

        <!-- 9. Layout & Navigation -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Layout & Navigation</h3>
          </template>
          <div class="space-y-4">
            <UBreadcrumb
              :items="[
                { label: 'Home', to: '/' },
                { label: 'Projects', to: '/' },
                { label: 'Current Project' },
              ]"
            />

            <UStepper
              :items="[
                { label: 'Setup', description: 'Create account' },
                { label: 'Verify', description: 'Verify email' },
                { label: 'Profile', description: 'Complete profile' },
                { label: 'Finish', description: 'All set!' },
              ]"
              :current="2"
              color="primary"
            />

            <UPagination :total="100" :page-size="10" color="primary" />
          </div>
        </UCard>

        <!-- 10. Links & Navigation Menu -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Links & Menus</h3>
          </template>
          <div class="space-y-4">
            <div class="space-y-2 flex flex-col items-start">
              <ULink to="#"> ULink Default Behaviour </ULink>
              <ULink to="#" active> Active link </ULink>
            </div>

            <UNavigationMenu
              :items="[
                { label: 'Dashboard', to: '/', icon: 'i-lucide-home' },
                { label: 'Projects', to: '/', icon: 'i-lucide-folder' },
                { label: 'Team', to: '/', icon: 'i-lucide-users' },
              ]"
              color="primary"
            />
          </div>
        </UCard>

        <!-- 12. Marquee & Animations -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Marquee & Animations</h3>
          </template>
          <div class="space-y-4">
            <UMarquee pause-on-hover>
              <UIcon name="i-lucide-github" class="size-8 shrink-0" />
              <UIcon name="i-lucide-twitter" class="size-8 shrink-0" />
              <UIcon name="i-lucide-linkedin" class="size-8 shrink-0" />
              <UIcon name="i-lucide-instagram" class="size-8 shrink-0" />
              <UIcon name="i-lucide-facebook" class="size-8 shrink-0" />
              <UIcon name="i-lucide-youtube" class="size-8 shrink-0" />
            </UMarquee>

            <UMarquee reverse pause-on-hover>
              <span class="text-sm font-medium px-4">Breaking News</span>
              <span class="text-sm font-medium px-4">System Update</span>
              <span class="text-sm font-medium px-4">New Features</span>
            </UMarquee>
          </div>
        </UCard>

        <!-- 13. Tree & Hierarchical Data -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Tree & Hierarchy</h3>
          </template>
          <UTree
            v-model="treeValue"
            :items="[
              {
                label: 'src',
                defaultExpanded: true,
                children: [
                  {
                    label: 'components',
                    children: [{ label: 'Button.vue' }, { label: 'Card.vue' }],
                  },
                  {
                    label: 'pages',
                    defaultExpanded: true,
                    children: [{ label: 'index.vue' }, { label: 'about.vue' }],
                  },
                  { label: 'app.vue' },
                ],
              },
              {
                label: 'public',
                children: [{ label: 'favicon.ico' }, { label: 'logo.png' }],
              },
            ]"
            color="primary"
          />
        </UCard>

        <!-- 14. Command Palette & Tools -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Command Palette</h3>
          </template>
          <div class="text-center p-4">
            <UCommandPalette
              v-model:open="commandPaletteOpen"
              :groups="[
                {
                  id: 'actions',
                  label: 'Actions',
                  items: [
                    { label: 'Create Project', icon: 'i-lucide-plus' },
                    { label: 'Import Data', icon: 'i-lucide-download' },
                    { label: 'Export Settings', icon: 'i-lucide-upload' },
                  ],
                },
              ]"
            />
          </div>
        </UCard>

        <!-- 15. Comprehensive Form Controls -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Form Controls</h3>
          </template>
          <UForm :state="formState" class="space-y-4" @submit="onFormSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Name" name="fullName">
                <UInput v-model="formState.fullName" placeholder="Enter name" />
              </UFormField>

              <UFormField label="Email" name="email">
                <UInput
                  v-model="formState.email"
                  type="email"
                  placeholder="email@example.com"
                />
              </UFormField>

              <UFormField label="Age" name="age">
                <UInputNumber v-model="formState.age" placeholder="25" />
              </UFormField>

              <UFormField label="Skills" name="skills">
                <UInputTags
                  v-model="formState.skills"
                  placeholder="Add skills..."
                />
              </UFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <UFormField label="Experience" name="experience">
                  <URadioGroup
                    v-model="formState.experience"
                    :items="[
                      { label: 'Beginner', value: 'beginner' },
                      { label: 'Intermediate', value: 'intermediate' },
                      { label: 'Advanced', value: 'advanced' },
                    ]"
                    color="primary"
                  />
                </UFormField>
              </div>

              <div>
                <UFormField label="Preferences" name="preferences">
                  <UCheckboxGroup
                    v-model="formState.preferences"
                    :items="[
                      { label: 'Email updates', value: 'email' },
                      { label: 'SMS alerts', value: 'sms' },
                    ]"
                    color="primary"
                  />
                </UFormField>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="text-sm font-medium mb-2 block">Volume</label>
                <USlider :default-value="[65]" color="primary" />
              </div>

              <div>
                <label class="text-sm font-medium mb-2 block">PIN / OTP</label>
                <UPinInput :length="6" />
              </div>
            </div>

            <UFormField label="Bio" name="bio" class="w-full">
              <UTextarea
                v-model="formState.bio"
                placeholder="Tell us about yourself..."
                class="w-full"
                :rows="5"
              />
            </UFormField>

            <UFileUpload
              accept=".pdf,.doc,.docx"
              placeholder="Upload documents..."
              variant="area"
            />

            <div class="flex gap-2">
              <UButton type="submit" color="primary"> Submit </UButton>
              <UButton variant="outline" color="neutral" type="button">
                Cancel
              </UButton>
            </div>
          </UForm>
        </UCard>
        <UCard>
          <template #header>
            <h3 class="font-semibold">Typography Scale</h3>
          </template>
          <div class="space-y-3">
            <div class="text-xs">text-xs</div>
            <div class="text-sm">text-sm</div>
            <div class="text-base">text-base</div>
            <div class="text-lg">text-lg</div>
            <div class="text-xl">text-xl</div>
            <div class="text-2xl">text-2xl</div>
            <div class="text-3xl">text-3xl</div>
            <div class="text-4xl">text-4xl</div>
            <div class="text-5xl">text-5xl</div>
            <div class="text-6xl">text-6xl</div>
            <div class="text-7xl">text-7xl</div>
            <div class="text-8xl">text-8xl</div>
            <div class="text-9xl">text-9xl</div>
          </div>
        </UCard>

        <!-- Lists & Quotes -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Lists & Quotes</h3>
          </template>
          <div class="space-y-6">
            <!-- Unordered List -->
            <div>
              <h4 class="text-sm font-medium mb-2">Unordered List</h4>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>First item with some content</li>
                <li>
                  Second item with nested content
                  <ul class="list-disc list-inside ml-4 mt-1">
                    <li>Nested item one</li>
                    <li>Nested item two</li>
                  </ul>
                </li>
                <li>Third item completes the list</li>
              </ul>
            </div>

            <!-- Ordered List -->
            <div>
              <h4 class="text-sm font-medium mb-2">Ordered List</h4>
              <ol class="list-decimal list-inside space-y-1 text-sm">
                <li>Setup your environment</li>
                <li>
                  Install dependencies
                  <ol class="list-decimal list-inside ml-4 mt-1">
                    <li>Run npm install</li>
                    <li>Configure settings</li>
                  </ol>
                </li>
                <li>Start development server</li>
              </ol>
            </div>

            <!-- Blockquote -->
            <div>
              <h4 class="text-sm font-medium mb-2">Blockquote</h4>
              <blockquote
                class="border-l-4 border-primary-500 pl-4 italic text-sm text-neutral-600 dark:text-neutral-400"
              >
                "The best way to predict the future is to create it. Design is
                not just what it looks like and feels like. Design is how it
                works."
                <footer class="mt-2 not-italic text-xs text-neutral-500">
                  — Steve Jobs
                </footer>
              </blockquote>
            </div>
          </div>
        </UCard>

        <!-- Color Palettes -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Color Palettes</h3>
          </template>
          <div class="space-y-4">
            <!-- Primary Colors -->
            <div>
              <h4 class="text-sm font-medium mb-2">Primary</h4>
              <div class="grid grid-cols-5 gap-1">
                <div
                  class="bg-primary-50 h-8 rounded text-xs flex items-center justify-center text-primary-900"
                >
                  50
                </div>
                <div
                  class="bg-primary-100 h-8 rounded text-xs flex items-center justify-center text-primary-900"
                >
                  100
                </div>
                <div
                  class="bg-primary-200 h-8 rounded text-xs flex items-center justify-center text-primary-900"
                >
                  200
                </div>
                <div
                  class="bg-primary-300 h-8 rounded text-xs flex items-center justify-center text-primary-900"
                >
                  300
                </div>
                <div
                  class="bg-primary-400 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  400
                </div>
                <div
                  class="bg-primary-500 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  500
                </div>
                <div
                  class="bg-primary-600 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  600
                </div>
                <div
                  class="bg-primary-700 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  700
                </div>
                <div
                  class="bg-primary-800 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  800
                </div>
                <div
                  class="bg-primary-900 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  900
                </div>
              </div>
            </div>

            <!-- Secondary Colors -->
            <div>
              <h4 class="text-sm font-medium mb-2">Secondary</h4>
              <div class="grid grid-cols-5 gap-1">
                <div
                  class="bg-secondary-50 h-8 rounded text-xs flex items-center justify-center text-secondary-900"
                >
                  50
                </div>
                <div
                  class="bg-secondary-100 h-8 rounded text-xs flex items-center justify-center text-secondary-900"
                >
                  100
                </div>
                <div
                  class="bg-secondary-200 h-8 rounded text-xs flex items-center justify-center text-secondary-900"
                >
                  200
                </div>
                <div
                  class="bg-secondary-300 h-8 rounded text-xs flex items-center justify-center text-secondary-900"
                >
                  300
                </div>
                <div
                  class="bg-secondary-400 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  400
                </div>
                <div
                  class="bg-secondary-500 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  500
                </div>
                <div
                  class="bg-secondary-600 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  600
                </div>
                <div
                  class="bg-secondary-700 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  700
                </div>
                <div
                  class="bg-secondary-800 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  800
                </div>
                <div
                  class="bg-secondary-900 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  900
                </div>
              </div>
            </div>

            <!-- Status Colors -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Success -->
              <div>
                <h4 class="text-sm font-medium mb-2">Success</h4>
                <div class="grid grid-cols-3 gap-1">
                  <div
                    class="bg-success-300 h-6 rounded text-xs flex items-center justify-center text-success-900"
                  >
                    300
                  </div>
                  <div
                    class="bg-success-500 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    500
                  </div>
                  <div
                    class="bg-success-700 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    700
                  </div>
                </div>
              </div>

              <!-- Warning -->
              <div>
                <h4 class="text-sm font-medium mb-2">Warning</h4>
                <div class="grid grid-cols-3 gap-1">
                  <div
                    class="bg-warning-300 h-6 rounded text-xs flex items-center justify-center text-warning-900"
                  >
                    300
                  </div>
                  <div
                    class="bg-warning-500 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    500
                  </div>
                  <div
                    class="bg-warning-700 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    700
                  </div>
                </div>
              </div>

              <!-- Error -->
              <div>
                <h4 class="text-sm font-medium mb-2">Error</h4>
                <div class="grid grid-cols-3 gap-1">
                  <div
                    class="bg-error-300 h-6 rounded text-xs flex items-center justify-center text-error-900"
                  >
                    300
                  </div>
                  <div
                    class="bg-error-500 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    500
                  </div>
                  <div
                    class="bg-error-700 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    700
                  </div>
                </div>
              </div>

              <!-- Info -->
              <div>
                <h4 class="text-sm font-medium mb-2">Info</h4>
                <div class="grid grid-cols-3 gap-1">
                  <div
                    class="bg-info-300 h-6 rounded text-xs flex items-center justify-center text-info-900"
                  >
                    300
                  </div>
                  <div
                    class="bg-info-500 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    500
                  </div>
                  <div
                    class="bg-info-700 h-6 rounded text-xs flex items-center justify-center text-white"
                  >
                    700
                  </div>
                </div>
              </div>
            </div>

            <!-- Neutral Scale -->
            <div>
              <h4 class="text-sm font-medium mb-2">Neutral</h4>
              <div class="grid grid-cols-10 gap-1">
                <div
                  class="bg-neutral-50 h-8 rounded text-xs flex items-center justify-center text-neutral-900 border border-neutral-200"
                >
                  50
                </div>
                <div
                  class="bg-neutral-100 h-8 rounded text-xs flex items-center justify-center text-neutral-900"
                >
                  100
                </div>
                <div
                  class="bg-neutral-200 h-8 rounded text-xs flex items-center justify-center text-neutral-900"
                >
                  200
                </div>
                <div
                  class="bg-neutral-300 h-8 rounded text-xs flex items-center justify-center text-neutral-900"
                >
                  300
                </div>
                <div
                  class="bg-neutral-400 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  400
                </div>
                <div
                  class="bg-neutral-500 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  500
                </div>
                <div
                  class="bg-neutral-600 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  600
                </div>
                <div
                  class="bg-neutral-700 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  700
                </div>
                <div
                  class="bg-neutral-800 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  800
                </div>
                <div
                  class="bg-neutral-900 h-8 rounded text-xs flex items-center justify-center text-white"
                >
                  900
                </div>
              </div>
            </div>
          </div>
        </UCard>
        <UCard>
          <template #header>
            <h3 class="font-semibold">Font Weights</h3>
          </template>

          <div class="space-y-3">
            <!-- Heading -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium mb-2">
                {{ headingFont || 'Loading...' }} (Heading)
              </h4>

              <div class="text-xs text-info-500 font-mono mb-2">
                Available: {{ headingWeightSummary || 'Loading...' }}
              </div>

              <div
                class="space-y-1"
                :style="{ fontFamily: `'${headingFont}', sans-serif` }"
              >
                <div
                  v-for="weight in headingWeights"
                  :key="`heading-${weight}`"
                  :style="{ fontWeight: weight }"
                  class="text-sm"
                >
                  Font-weight {{ weight }}
                </div>

                <div
                  v-if="headingWeights.length === 0"
                  class="text-sm text-neutral-400"
                >
                  Loading font weights...
                </div>
              </div>
            </div>

            <!-- Body -->
            <div
              class="border-t border-neutral-200 dark:border-neutral-700 pt-3 space-y-2"
            >
              <h4 class="text-sm font-medium mb-2">
                {{ bodyFont || 'Loading...' }} (Body)
              </h4>

              <div class="text-xs text-info-500 font-mono mb-2">
                Available: {{ bodyWeightSummary || 'Loading...' }}
              </div>

              <div
                class="space-y-1"
                :style="{ fontFamily: `'${bodyFont}', serif` }"
              >
                <div
                  v-for="weight in bodyWeights"
                  :key="`body-${weight}`"
                  :style="{ fontWeight: weight }"
                  class="text-sm"
                >
                  Font-weight {{ weight }}
                </div>

                <div
                  v-if="bodyWeights.length === 0"
                  class="text-sm text-neutral-400"
                >
                  Loading font weights...
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Typography Spacing -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Typography Spacing</h3>
          </template>
          <div class="space-y-4">
            <!-- Line Height -->
            <div>
              <h4 class="text-sm font-medium mb-2">Line Height</h4>
              <div class="space-y-3">
                <div class="leading-tight text-sm">
                  <strong>leading-tight:</strong> This paragraph demonstrates
                  tight line spacing which works well for headlines and compact
                  layouts where space is at a premium and readability is still
                  maintained.
                </div>
                <div class="leading-normal text-sm">
                  <strong>leading-normal:</strong> This paragraph shows normal
                  line spacing which is the default and works well for most body
                  text content providing balanced readability and space
                  efficiency.
                </div>
                <div class="leading-relaxed text-sm">
                  <strong>leading-relaxed:</strong> This paragraph uses relaxed
                  line spacing which improves readability for longer content
                  blocks and creates a more spacious, comfortable reading
                  experience.
                </div>
              </div>
            </div>

            <!-- Letter Spacing -->
            <div
              class="border-t border-neutral-200 dark:border-neutral-700 pt-4"
            >
              <h4 class="text-sm font-medium mb-2">Letter Spacing</h4>
              <div class="space-y-2">
                <div class="tracking-tight">
                  tracking-tight: Condensed letter spacing
                </div>
                <div class="tracking-normal">
                  tracking-normal: Default letter spacing
                </div>
                <div class="tracking-wide">
                  tracking-wide: Expanded letter spacing
                </div>
                <div class="tracking-wider">
                  tracking-wider: More expanded spacing
                </div>
                <div class="tracking-widest">
                  tracking-widest: Maximum spacing
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Text Decorations & Effects -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Text Decorations</h3>
          </template>
          <div class="space-y-4">
            <!-- Basic Decorations -->
            <div>
              <h4 class="text-sm font-medium mb-2">Text Decorations</h4>
              <div class="space-y-1">
                <p class="underline">Underlined text for links and emphasis</p>
                <p class="line-through text-neutral-500">
                  Strikethrough text for deletions
                </p>
                <p class="overline">Overline text for special cases</p>
                <p
                  class="no-underline text-primary-500 hover:underline cursor-pointer"
                >
                  Hover to underline
                </p>
              </div>
            </div>

            <!-- Text Styles -->
            <div
              class="border-t border-neutral-200 dark:border-neutral-700 pt-4"
            >
              <h4 class="text-sm font-medium mb-2">Text Styles</h4>
              <div class="space-y-1">
                <p class="italic">Italic text for emphasis and quotes</p>
                <p class="not-italic font-serif">
                  not-italic: Removing italic from serif
                </p>
                <p><strong>Bold text</strong> and <em>emphasized text</em></p>
                <p
                  class="font-code bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded"
                >
                  Monospace font for code
                </p>
              </div>
            </div>

            <!-- Text Transform -->
            <div
              class="border-t border-neutral-200 dark:border-neutral-700 pt-4"
            >
              <h4 class="text-sm font-medium mb-2">Text Transform</h4>
              <div class="space-y-1">
                <p class="uppercase">uppercase text transformation</p>
                <p class="lowercase">LOWERCASE TEXT TRANSFORMATION</p>
                <p class="capitalize">capitalize each word in text</p>
                <p class="normal-case">Normal-case: MIXED case TEXT</p>
              </div>
            </div>

            <!-- Text Overflow -->
            <div
              class="border-t border-neutral-200 dark:border-neutral-700 pt-4"
            >
              <h4 class="text-sm font-medium mb-2">Text Overflow</h4>
              <div class="space-y-2">
                <div class="max-w-48">
                  <p
                    class="truncate bg-neutral-50 dark:bg-neutral-800 p-2 rounded"
                  >
                    This text will be truncated with ellipsis when it exceeds
                    the container width
                  </p>
                </div>
                <div class="max-w-48">
                  <p
                    class="text-ellipsis overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-2 rounded"
                  >
                    Text ellipsis behavior demonstration
                  </p>
                </div>
                <div class="max-w-48">
                  <p
                    class="break-words bg-neutral-50 dark:bg-neutral-800 p-2 rounded"
                  >
                    Verylongwordthatwillbreakacrossmultiplelines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </UPageColumns>
    </div>
  </div>
</template>

<style scoped></style>
