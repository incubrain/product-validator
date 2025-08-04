<!-- app/components/showcase/DemoContent.vue -->
<script setup lang="ts">
interface ContentItem {
  as: string // 'div', 'button', 'img', etc. or component name
  props?: Record<string, any>
  text?: string
  html?: string
  children?: ContentItem[]
}

interface Props {
  content?: ContentItem | ContentItem[]
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    as: 'div',
    props: {
      class: 'bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border dark:border-gray-700 max-w-sm',
    },
    children: [
      {
        as: 'div',
        props: {
          class: 'flex justify-center items-center',
        },
        children: [
          {
            as: 'div',
            props: {
              class: 'w-3 h-3 bg-red-400 rounded-full',
            },
          },
        ],
      },
    ],
  }),
})

// Normalize content to always be an array
const normalizedContent = computed(() => {
  return Array.isArray(props.content) ? props.content : [props.content]
})
</script>

<template>
  <template
    v-for="(item, index) in normalizedContent"
    :key="index"
  >
    <component
      :is="item.as"
      v-bind="item.props || {}"
    >
      <!-- Text content -->
      <template v-if="item.text">
        {{ item.text }}
      </template>

      <!-- HTML content -->
      <template v-else-if="item.html">
        <div v-html="item.html" />
      </template>

      <!-- Nested children -->
      <template v-else-if="item.children">
        <ShowcaseDemoContent :content="item.children" />
      </template>
    </component>
  </template>
</template>
