<!-- app/components/IDebugModal.vue -->
<script setup lang="ts">
const route = useRoute()
const activeTab = ref('overview')

const emit = defineEmits<{
  close: [result: boolean]
}>()

// Get debug data directly inside the modal
const { getCurrentPageDebugInfo } = useGlobalDebugRegistry()
const debugInfo = getCurrentPageDebugInfo()

const tabs = [
  { label: 'Overview', icon: 'i-lucide-info', value: 'overview', slot: 'overview' },
  { label: 'SEO', icon: 'i-lucide-search', value: 'seo', slot: 'seo' },
  { label: 'Meta & Raw Data', icon: 'i-lucide-code', value: 'meta', slot: 'meta' },
]

const getStatusColor = (status: boolean | string) => {
  if (typeof status === 'boolean') return status ? 'success' : 'error'
  if (status === 'found') return 'success'
  if (status === 'missing') return 'warning'
  if (status === 'unknown') return 'neutral'
  return 'neutral'
}

const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}

const isPrimitive = (value: any) => {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

const getPropertyType = (value: any) => {
  if (Array.isArray(value)) return 'array'
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  return typeof value
}

const getPropertyTypeColor = (value: any) => {
  const type = getPropertyType(value)
  const colorMap = {
    string: 'blue',
    number: 'emerald',
    boolean: 'purple',
    array: 'amber',
    object: 'gray',
    null: 'red',
    undefined: 'red',
  }
  return colorMap[type] || 'gray'
}

const formatPrimitiveValue = (value: any) => {
  if (typeof value === 'boolean') return value ? '✓ true' : '✗ false'
  if (typeof value === 'string' && value.length > 50) return value.slice(0, 50) + '...'
  return String(value)
}

const handleClose = () => {
  emit('close', false)
}
</script>

<template>
  <UModal
    fullscreen
    :close="{ onClick: handleClose }"
    title="Debug Info"
    description="Detailed information about the current i18n context."
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-500/20 rounded-lg">
            <UIcon
              name="i-lucide-bug"
              class="w-5 h-5 text-purple-400"
            />
          </div>
          <div>
            <h3 class="font-semibold text-white">
              i18n Content Debug
            </h3>
            <p class="text-sm text-gray-400">
              {{ debugInfo?.meta.route || 'Loading debug data...' }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ILanguageSwitcher
            variant="minimal"
            size="xs"
          />

          <UButton
            variant="solid"
            size="xs"
            color="error"
            @click="handleClose"
          >
            Close
          </UButton>
        </div>
      </div>
    </template>

    <!-- Loading State -->
    <template #body>
      <div
        v-if="!debugInfo"
        class="text-center py-8"
      >
        <UIcon
          name="i-lucide-loader-2"
          class="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin"
        />
        <div class="text-gray-400">
          Loading debug information...
        </div>
      </div>

      <!-- Debug Content -->
      <div
        v-else
        class="space-y-6"
      >
        <!-- Tabs -->
        <UTabs
          v-model:model-value="activeTab"
          :items="tabs"
          class="w-full"
        >
          <!-- Overview Tab -->
          <template #overview>
            <div class="space-y-6">
              <!-- Quick Status Cards -->
              <div class="grid md:grid-cols-2 gap-4">
                <UCard class="bg-gray-900/50">
                  <template #header>
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-file-text"
                        class="w-4 h-4 text-blue-400"
                      />
                      <span class="text-sm font-medium text-white">Content Status</span>
                    </div>
                  </template>

                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-400">Collection</span>
                      <UBadge
                        size="xs"
                        variant="soft"
                      >
                        {{ debugInfo.content.collection }}
                      </UBadge>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-400">Locale</span>
                      <UBadge
                        size="xs"
                        variant="soft"
                        color="primary"
                      >
                        {{ debugInfo.content.locale }}
                      </UBadge>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-400">STEM</span>
                      <code class="text-xs bg-gray-800 px-2 py-1 rounded text-emerald-300">
                        {{ debugInfo.content.stem || 'N/A' }}
                      </code>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-400">Status</span>
                      <div class="flex gap-1">
                        <UBadge
                          :color="getStatusColor(debugInfo.content.status.found)"
                          size="xs"
                        >
                          {{ debugInfo.content.status.found ? 'Found' : 'Missing' }}
                        </UBadge>
                        <UBadge
                          v-if="debugInfo.content.status.found"
                          :color="getStatusColor(debugInfo.content.status.published)"
                          size="xs"
                        >
                          {{ debugInfo.content.status.published ? 'Published' : 'Draft' }}
                        </UBadge>
                      </div>
                    </div>
                  </div>
                </UCard>

                <UCard class="bg-gray-900/50">
                  <template #header>
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-settings"
                        class="w-4 h-4 text-emerald-400"
                      />
                      <span class="text-sm font-medium text-white">Translation Summary</span>
                    </div>
                  </template>

                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-400">Total Locales</span>
                      <UBadge
                        size="xs"
                        variant="soft"
                      >
                        {{ debugInfo.translations.total }}
                      </UBadge>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-400">Found</span>
                      <UBadge
                        size="xs"
                        variant="soft"
                        color="success"
                      >
                        {{ debugInfo.translations.found.length }}
                      </UBadge>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-400">Missing</span>
                      <UBadge
                        size="xs"
                        variant="soft"
                        color="warning"
                      >
                        {{ debugInfo.translations.missing.length }}
                      </UBadge>
                    </div>
                  </div>
                </UCard>
              </div>

              <!-- Route Parameters -->
              <UCard class="bg-gray-900/50">
                <template #header>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-route"
                      class="w-4 h-4 text-purple-400"
                    />
                    <span class="text-sm font-medium text-white">Route Parameters</span>
                  </div>
                </template>

                <div
                  v-if="Object.keys(debugInfo.params.current).length > 0"
                  class="space-y-2"
                >
                  <div
                    v-for="(value, param) in debugInfo.params.current"
                    :key="param"
                    class="flex justify-between items-center"
                  >
                    <code class="text-sm text-blue-300">{{ param }}</code>
                    <code class="text-sm text-emerald-300">{{ value }}</code>
                  </div>
                </div>
                <div
                  v-else
                  class="text-sm text-gray-400"
                >
                  No parameters in current route
                </div>
              </UCard>

              <!-- Features Status -->
              <UCard class="bg-gray-900/50">
                <template #header>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-check-circle"
                      class="w-4 h-4 text-purple-400"
                    />
                    <span class="text-sm font-medium text-white">Feature Status</span>
                  </div>
                </template>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div class="text-center">
                    <UIcon
                      :name="debugInfo.seo.autoSEO ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                      :class="debugInfo.seo.autoSEO ? 'text-emerald-400' : 'text-gray-500'"
                      class="w-6 h-6 mx-auto mb-1"
                    />
                    <div class="text-xs text-gray-400">
                      Auto SEO
                    </div>
                  </div>

                  <div class="text-center">
                    <UIcon
                      :name="debugInfo.seo.autoI18nParams ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                      :class="debugInfo.seo.autoI18nParams ? 'text-emerald-400' : 'text-gray-500'"
                      class="w-6 h-6 mx-auto mb-1"
                    />
                    <div class="text-xs text-gray-400">
                      Auto Params
                    </div>
                  </div>

                  <div class="text-center">
                    <UIcon
                      :name="debugInfo.content.status.hasTranslations ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                      :class="debugInfo.content.status.hasTranslations ? 'text-emerald-400' : 'text-gray-500'"
                      class="w-6 h-6 mx-auto mb-1"
                    />
                    <div class="text-xs text-gray-400">
                      Translations
                    </div>
                  </div>

                  <div class="text-center">
                    <UIcon
                      :name="Object.keys(debugInfo.params.current).length > 0 ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                      :class="Object.keys(debugInfo.params.current).length > 0 ? 'text-emerald-400' : 'text-gray-500'"
                      class="w-6 h-6 mx-auto mb-1"
                    />
                    <div class="text-xs text-gray-400">
                      Parameters
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </template>

          <!-- SEO Tab -->
          <template #seo>
            <div class="space-y-6">
              <!-- SEO Integration Showcase -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4 p-3 ">
                  <h3 class="font-medium text-purple-400 text-sm">
                    Auto-Generated SEO Tags
                  </h3>
                  <div class="bg-gray-900 rounded text-xs font-mono space-y-1">
                    <div class="text-gray-500">
                      // Automatically generated by asSeoCollection
                    </div>
                    <div><span class="text-emerald-300">&lt;title&gt;</span>{{ debugInfo.seo.title || 'No title' }}<span class="text-emerald-300">&lt;/title&gt;</span></div>
                    <div><span class="text-emerald-300">&lt;meta name="description"</span> <span class="text-blue-300">content</span>=<span class="text-yellow-300">"{{ debugInfo.seo.description || 'No description' }}"</span><span class="text-emerald-300">&gt;</span></div>
                    <div><span class="text-emerald-300">&lt;meta property="og:title"</span> <span class="text-blue-300">content</span>=<span class="text-yellow-300">"{{ debugInfo.seo.title || 'No title' }}"</span><span class="text-emerald-300">&gt;</span></div>
                    <div><span class="text-emerald-300">&lt;meta property="og:description"</span> <span class="text-blue-300">content</span>=<span class="text-yellow-300">"{{ debugInfo.seo.description || 'No description' }}"</span><span class="text-emerald-300">&gt;</span></div>
                  </div>
                </div>

                <div class="space-y-4 p-3 ">
                  <h3 class="font-medium text-amber-400 text-sm">
                    Sitemap Integration
                  </h3>
                  <div class="space-y-2 text-xs">
                    <div class="flex justify-between">
                      <span class="text-gray-400">Auto-indexed:</span>
                      <UBadge
                        color="success"
                        size="xs"
                      >
                        ✓ Yes
                      </UBadge>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Last Modified:</span>
                      <span class="text-gray-200">{{ debugInfo.seo.generated.sitemap?.lastmod || 'Auto-detected' }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Change Freq:</span>
                      <span class="text-gray-200">{{ debugInfo.seo.generated.sitemap?.changefreq || 'weekly' }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Priority:</span>
                      <span class="text-gray-200">{{ debugInfo.seo.generated.sitemap?.priority || '0.8' }}</span>
                    </div>
                  </div>

                  <div class="p-2 bg-amber-900/20 border border-amber-700/30 rounded">
                    <div class="text-xs text-amber-200">
                      <strong>Auto-features:</strong> Robots meta, structured data, hreflang tags, and OG images all generated automatically via asSeoCollection()
                    </div>
                  </div>
                </div>
              </div>

              <!-- Generated SEO Elements -->
              <UCard class="bg-gray-900/50">
                <template #header>
                  <span class="text-sm font-medium text-white">Generated SEO Elements</span>
                </template>

                <div class="space-y-4">
                  <div
                    v-for="(value, key) in debugInfo.seo.generated"
                    :key="`seo-${key}`"
                    class="border border-default rounded p-3"
                  >
                    <div class="flex justify-between items-center mb-2">
                      <code class="text-sm text-info-300">{{ key }}</code>
                      <UBadge
                        :color="value ? 'success' : 'neutral'"
                        size="xs"
                      >
                        {{ value ? 'Generated' : 'None' }}
                      </UBadge>
                    </div>

                    <div
                      v-if="value"
                      class="text-xs text-gray-400"
                    >
                      <pre class="bg-gray-950 p-2 rounded overflow-auto max-h-32">{{ JSON.stringify(value, null, 2) }}</pre>
                    </div>
                  </div>
                </div>
              </UCard>

              <!-- Feature Status -->
              <UCard class="bg-gray-900/50">
                <template #header>
                  <span class="text-sm font-medium text-white">SEO Feature Status</span>
                </template>

                <div class="grid md:grid-cols-2 gap-4">
                  <div class="flex items-center gap-3">
                    <UIcon
                      :name="debugInfo.seo.autoSEO ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                      :class="debugInfo.seo.autoSEO ? 'text-emerald-400' : 'text-red-400'"
                      class="w-5 h-5"
                    />
                    <span class="text-sm text-gray-300">Auto SEO Integration</span>
                  </div>

                  <div class="flex items-center gap-3">
                    <UIcon
                      :name="debugInfo.seo.autoI18nParams ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                      :class="debugInfo.seo.autoI18nParams ? 'text-emerald-400' : 'text-red-400'"
                      class="w-5 h-5"
                    />
                    <span class="text-sm text-gray-300">Auto i18n Parameters</span>
                  </div>
                </div>
              </UCard>
            </div>
          </template>

          <!-- Meta & Raw Data Tab -->
          <template #meta>
            <div class="space-y-6">
              <!-- System Information -->
              <UCard class="bg-gray-900/50">
                <template #header>
                  <span class="text-sm font-medium text-white">System Information</span>
                </template>

                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-400">Page Key</span>
                    <code class="text-xs bg-gray-800 px-2 py-1 rounded text-cyan-300">
                      {{ debugInfo.performance.pageKey }}
                    </code>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-400">Cache Key</span>
                    <code class="text-xs bg-gray-800 px-2 py-1 rounded text-cyan-300">
                      {{ debugInfo.content.cacheKey }}
                    </code>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-400">Timestamp</span>
                    <span class="text-sm text-gray-300">{{ formatTimestamp(debugInfo.performance.timestamp) }}</span>
                  </div>

                  <div class="flex justify-between items-start">
                    <span class="text-sm text-gray-400">Selected Fields</span>
                    <div class="flex flex-wrap gap-1 max-w-xs">
                      <UBadge
                        v-for="field in debugInfo.content.fields"
                        :key="field"
                        size="xs"
                        variant="soft"
                      >
                        {{ field }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </UCard>

              <!-- Raw Content Data -->
              <UCard class="bg-gray-900/50">
                <template #header>
                  <span class="text-sm font-medium text-gray-300">Content Metadata Structure</span>
                </template>

                <div class="space-y-4">
                  <p class="text-sm text-gray-400">
                    Complete frontmatter and computed properties for this content (body excluded):
                  </p>

                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                      v-for="[key, value] in Object.entries(Object.fromEntries(Object.entries(debugInfo.content).filter(([k]) => k !== 'body')))"
                      :key="key"
                      class="bg-gray-900 p-3 rounded-lg"
                    >
                      <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-2">
                          <code class="text-emerald-300 text-xs font-medium">{{ key }}</code>
                          <UBadge
                            :color="getPropertyTypeColor(value)"
                            size="xs"
                            variant="soft"
                          >
                            {{ getPropertyType(value) }}
                          </UBadge>
                        </div>

                        <!-- String/Number/Boolean values -->
                        <div
                          v-if="isPrimitive(value)"
                          class="text-sm text-gray-200 break-words"
                        >
                          {{ formatPrimitiveValue(value) }}
                        </div>

                        <!-- Array values -->
                        <div
                          v-else-if="Array.isArray(value)"
                          class="space-y-1"
                        >
                          <div class="text-xs text-gray-400">
                            {{ value.length }} items
                          </div>
                          <div class="flex flex-wrap gap-1">
                            <UBadge
                              v-for="(item, idx) in value.slice(0, 3)"
                              :key="idx"
                              size="xs"
                              variant="soft"
                              color="info"
                            >
                              {{ String(item).slice(0, 20) }}{{ String(item).length > 20 ? '...' : '' }}
                            </UBadge>
                            <UBadge
                              v-if="value.length > 3"
                              size="xs"
                              variant="soft"
                              color="neutral"
                            >
                              +{{ value.length - 3 }} more
                            </UBadge>
                          </div>
                        </div>

                        <!-- Object values -->
                        <div
                          v-else-if="typeof value === 'object' && value !== null"
                          class="space-y-1"
                        >
                          <div class="text-xs text-gray-400">
                            {{ Object.keys(value).length }} properties
                          </div>
                          <div class="text-xs font-mono text-gray-300 bg-gray-950 p-2 rounded max-h-20 overflow-y-auto">
                            {{ JSON.stringify(value, null, 1) }}
                          </div>
                        </div>

                        <!-- Null/undefined -->
                        <div
                          v-else
                          class="text-xs text-gray-500 italic"
                        >
                          {{ value === null ? 'null' : 'undefined' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </UCard>

              <!-- Debug Tips -->
              <UCard class="bg-blue-900/20 border-blue-700/30">
                <template #header>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-lightbulb"
                      class="w-4 h-4 text-blue-400"
                    />
                    <span class="text-sm font-medium text-white">Debug Tips</span>
                  </div>
                </template>

                <ul class="text-sm space-y-1 text-blue-200">
                  <li>• Press <UKbd>⌘</UKbd> <UKbd>⇧</UKbd> <UKbd>D</UKbd> to toggle debug modal</li>
                  <li>• Press <UKbd>⌘</UKbd> <UKbd>⇧</UKbd> <UKbd>L</UKbd> to cycle languages</li>
                  <li>• Press <UKbd>Esc</UKbd> to close modal</li>
                  <li>• Click debug button in navigation when in dev mode</li>
                  <li>• Debug data updates in real-time as you navigate</li>
                  <li>• Use Meta Data view to inspect complete content structure</li>
                </ul>
              </UCard>
            </div>
          </template>
        </UTabs>
      </div>
    </template>

    <!-- Footer -->
    <template #footer>
      <div class="flex justify-between items-center text-xs text-gray-500">
        <div>Route: <code class="text-gray-400">{{ route.path }}</code></div>
        <div>Debug mode active</div>
      </div>
    </template>
  </UModal>
</template>
