<script setup lang="ts">
interface Props {
  title: string
  description?: string
  data: any[]
  type: 'props' | 'slots' | 'emits'
  componentName?: string
  variantCount?: number
  slotCount?: number
  showHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: false,
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
          {{ data.length }}
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
          :data="data"
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
