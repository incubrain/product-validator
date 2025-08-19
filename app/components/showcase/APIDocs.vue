<script setup lang="ts">
interface Props {
  title: string
  description?: string
  tvData: any // Raw TV data
  type: 'props' | 'slots' | 'emits'
  componentName?: string
  showHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: false,
})

// ✅ Process TV data directly in component
const processedData = computed(() => {
  if (!props.tvData) return []

  if (props.type === 'props') {
    const propsData = []

    // Add variant props
    if (props.tvData.variants) {
      Object.entries(props.tvData.variants).forEach(([variantName, options]) => {
        if (typeof options === 'object' && options !== null) {
          const optionKeys = Object.keys(options)
          propsData.push({
            name: variantName,
            type: `'${optionKeys.join('\' | \'')}'`,
            default: props.tvData.defaultVariants?.[variantName] || '—',
            required: false,
          })
        }
      })
    }

    // Add standard props
    propsData.push(
      { name: 'as', type: 'string', default: 'div', required: false },
      { name: 'trackingId', type: 'string | undefined', default: '—', required: false },
      { name: 'ui', type: 'object | undefined', default: '—', required: false },
    )

    return propsData
  }

  if (props.type === 'slots') {
    if (!props.tvData.slots) return [{ name: '#default', defaultClasses: '—' }]

    return Object.entries(props.tvData.slots).map(([name, classes]) => ({
      name: `#${name}`,
      defaultClasses: Array.isArray(classes) ? classes.join(' ') : classes || '—',
    }))
  }

  return []
})

// ✅ Generate stats directly
const variantCount = computed(() => {
  if (!props.tvData?.variants) return 0
  return Object.keys(props.tvData.variants).reduce((count, key) => {
    const variants = props.tvData.variants[key]
    return count + (typeof variants === 'object' ? Object.keys(variants).length : 0)
  }, 0)
})

const slotCount = computed(() => {
  return props.tvData?.slots ? Object.keys(props.tvData.slots).length : 1
})

// ✅ SIMPLE: No h() functions, no computed reactivity hell
const columns = (() => {
  switch (props.type) {
    case 'props':
      return [
        {
          accessorKey: 'name',
          header: 'Prop',
          meta: {
            class: {
              td: 'w-1/4 min-w-0',
              th: 'w-1/4 min-w-0',
            },
          },
        },
        {
          accessorKey: 'type',
          header: 'Type',
          meta: {
            class: {
              td: 'w-1/2 min-w-0',
              th: 'w-1/2 min-w-0',
            },
          },
        },
        {
          accessorKey: 'default',
          header: 'Default',
          meta: {
            class: {
              td: 'w-1/4 min-w-0',
              th: 'w-1/4 min-w-0',
            },
          },
        },
      ]
    case 'slots':
      return [
        {
          accessorKey: 'name',
          header: 'Slot',
          meta: {
            class: {
              td: 'w-1/3 min-w-0',
              th: 'w-1/3 min-w-0',
            },
          },
        },
        {
          accessorKey: 'defaultClasses',
          header: 'Default Classes',
          meta: {
            class: {
              td: 'w-2/3 min-w-0',
              th: 'w-2/3 min-w-0',
            },
          },
        },
      ]
    case 'emits':
      return [
        {
          accessorKey: 'name',
          header: 'Event',
          meta: {
            class: {
              td: 'w-1/2 min-w-0',
              th: 'w-1/2 min-w-0',
            },
          },
        },
        {
          accessorKey: 'type',
          header: 'Payload',
          meta: {
            class: {
              td: 'w-1/2 min-w-0',
              th: 'w-1/2 min-w-0',
            },
          },
        },
      ]
    default:
      return []
  }
})()
</script>

<template>
  <div class="space-y-8">
    <!-- API Header -->
    <div
      v-if="showHeader"
      class="border-b border-default pb-4"
    >
      <div class="flex items-center gap-3 flex-wrap">
        <h2 class="text-2xl font-semibold text-primary">
          API
        </h2>

        <div class="flex items-center gap-2">
          <UBadge
            color="success"
            variant="soft"
            size="sm"
          >
            TailwindVariants
          </UBadge>
          <UBadge
            v-if="variantCount && variantCount > 0"
            color="info"
            variant="soft"
            size="sm"
          >
            {{ variantCount }} variants
          </UBadge>
          <UBadge
            v-if="slotCount && slotCount > 0"
            color="neutral"
            variant="soft"
            size="sm"
          >
            {{ slotCount }} slots
          </UBadge>
        </div>
      </div>

      <p class="text-muted mt-2">
        {{ componentName }} component props and slots
      </p>
    </div>

    <!-- Table Section -->
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <h3 class="text-lg font-semibold text-primary">
          {{ title }}
        </h3>
        <UBadge
          color="neutral"
          variant="soft"
          size="sm"
        >
          {{ processedData.length }}
        </UBadge>
      </div>

      <p
        v-if="description"
        class="text-sm text-muted-foreground"
      >
        {{ description }}
      </p>

      <div class="border border-default rounded-lg overflow-hidden">
        <UTable
          :data="processedData"
          :columns="columns"
          :ui="{
            root: 'w-full',
            base: 'w-full table-fixed',
            th: 'bg-muted/30 px-6 py-4 text-left text-sm font-semibold break-words max-w-0',
            td: 'px-6 py-4 text-sm border-b border-default last:border-b-0 break-words max-w-0',
            tr: 'hover:bg-muted/20 transition-colors',
          }"
        >
          <!-- ✅ SIMPLE: Props table slots -->
          <template
            v-if="type === 'props'"
            #name-cell="{ row }"
          >
            <div class="flex items-center gap-2">
              <code class="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-sm font-semibold">
                {{ row.original.name }}
              </code>
              <span
                v-if="row.original.required"
                class="px-1.5 py-0.5 bg-error/10 text-error rounded text-xs font-medium"
              >
                required
              </span>
            </div>
          </template>

          <template
            v-if="type === 'props'"
            #type-cell="{ row }"
          >
            <Shiki
              :code="row.original.type"
              lang="typescript"
              as="span"
              :unwrap="true"
              class="[&>*]:inline [&>*]:text-sm [&>*]:font-mono text-pretty"
            />
          </template>

          <template
            v-if="type === 'props'"
            #default-cell="{ row }"
          >
            <span
              v-if="!row.original.default || row.original.default === '—'"
              class="text-muted-foreground text-sm"
            >
              —
            </span>
            <code
              v-else
              class="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded font-mono text-sm"
            >
              {{ row.original.default }}
            </code>
          </template>

          <!-- ✅ SIMPLE: Slots table slots -->
          <template
            v-if="type === 'slots'"
            #name-cell="{ row }"
          >
            <code class="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-sm font-semibold">
              {{ row.original.name }}
            </code>
          </template>

          <template
            v-if="type === 'slots'"
            #defaultClasses-cell="{ row }"
          >
            <span
              v-if="!row.original.defaultClasses || row.original.defaultClasses === '—'"
              class="text-muted-foreground text-sm"
            >
              —
            </span>
            <code
              v-else
              class="px-2 py-1 bg-gray-500/10 text-gray-600 dark:text-gray-400 rounded font-mono text-xs"
            >
              {{ row.original.defaultClasses }}
            </code>
          </template>

          <!-- ✅ SIMPLE: Emits table slots -->
          <template
            v-if="type === 'emits'"
            #name-cell="{ row }"
          >
            <code class="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-sm font-semibold">
              @{{ row.original.name }}
            </code>
          </template>

          <template
            v-if="type === 'emits'"
            #type-cell="{ row }"
          >
            <code class="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded font-mono text-sm">
              {{ row.original.type }}
            </code>
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>
