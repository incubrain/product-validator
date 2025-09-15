<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useElementSize } from '@vueuse/core';
import { surroundStyles } from '#theme/surround';
import type { SurroundVariants } from '#theme/surround';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'center' | 'end';
type SurroundSlot = `${Side}-${Alignment}`;

export interface SurroundProps {
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: SurroundVariants['interactive'];
  wrap?: SurroundVariants['wrap'];
  class?: string;
  positionedClass?: string;
}

const props = withDefaults(defineProps<SurroundProps>(), {
  gap: 'md',
  interactive: false,
  wrap: false,
});

const gapValue = computed(() => {
  const gapMap = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  };
  return gapMap[props.gap];
});

// Track content size
const contentRef = useTemplateRef('contentElement');
const { width: contentWidth, height: contentHeight } =
  useElementSize(contentRef);

// Generate positioning styles
const getPositionStyle = (
  side: Side,
  alignment: Alignment,
  elementWidth: number,
  elementHeight: number,
) => {
  const gap = gapValue.value;

  const positionMap = {
    right: {
      start: {
        left: `${contentWidth.value + gap}px`,
        top: `0px`,
      },
      center: {
        left: `${contentWidth.value + gap}px`,
        top: `${contentHeight.value * 0.5 - elementHeight / 2}px`,
      },
      end: {
        left: `${contentWidth.value + gap}px`,
        top: `${contentHeight.value - elementHeight}px`,
      },
    },
    left: {
      start: {
        left: `${-elementWidth - gap}px`,
        top: `0px`,
      },
      center: {
        left: `${-elementWidth - gap}px`,
        top: `${contentHeight.value * 0.5 - elementHeight / 2}px`,
      },
      end: {
        left: `${-elementWidth - gap}px`,
        top: `${contentHeight.value - elementHeight}px`,
      },
    },
    top: {
      start: {
        left: `0px`,
        top: `${-elementHeight - gap}px`,
      },
      center: {
        left: `${(contentWidth.value - elementWidth) / 2}px`,
        top: `${-elementHeight - gap}px`,
      },
      end: {
        left: `${contentWidth.value - elementWidth}px`,
        top: `${-elementHeight - gap}px`,
      },
    },
    bottom: {
      start: {
        left: `0px`,
        top: `${contentHeight.value + gap}px`,
      },
      center: {
        left: `${(contentWidth.value - elementWidth) / 2}px`,
        top: `${contentHeight.value + gap}px`,
      },
      end: {
        left: `${contentWidth.value - elementWidth}px`,
        top: `${contentHeight.value + gap}px`,
      },
    },
  };

  return {
    position: 'absolute' as const,
    ...positionMap[side][alignment],
  };
};

type DynamicSlots = {
  [K in SurroundSlot]: () => any;
} & {
  default: () => any;
};

const slots = defineSlots<DynamicSlots>();

// Get all positioned slot names that are actually used
const positionedSlots = computed(() => {
  return Object.keys(slots).filter(
    (name) =>
      name !== 'default' &&
      name.match(/^(top|right|bottom|left)-(start|center|end)$/),
  ) as SurroundSlot[];
});

const computedStyles = useTV(surroundStyles, props);

// Track sizes of each positioned element
const positionedElements = computed(() => {
  return positionedSlots.value.map((slotName) => {
    const [side, alignment] = slotName.split('-') as [Side, Alignment];
    const elementRef = useTemplateRef(slotName);
    const { width, height } = useElementSize(elementRef);

    return {
      slotName,
      side,
      alignment,
      style: computed(() =>
        getPositionStyle(side, alignment, width.value, height.value),
      ),
    };
  });
});
</script>

<template>
  <div :class="computedStyles.root({ class: props.class })">
    <!-- Main content -->
    <div ref="contentElement" :class="computedStyles.content()">
      <slot />
    </div>

    <!-- Dynamic positioned elements -->
    <div
      v-for="element in positionedElements"
      :key="element.slotName"
      :ref="element.slotName"
      :style="element.style.value"
      :class="computedStyles.positioned({ class: props.positionedClass })"
    >
      <slot :name="element.slotName" />
    </div>
  </div>
</template>
