<script setup lang="ts">
import { computed, resolveDynamicComponent } from 'vue';

const svgModules = import.meta.glob('~/assets/svg/**/*.svg', { eager: true });

// Extract available groups/variants at runtime
const availableIcons = Object.keys(svgModules).reduce((acc, path) => {
  const match = path.match(/\/assets\/svg\/([^/]+)\/([^/]+)\.svg$/);
  if (match) {
    const [, group, variant] = match;
    if (!acc[group]) acc[group] = [];
    acc[group].push(variant);
  }
  return acc;
}, {} as Record<string, string[]>);

/** groups & variants – match your folder names under ./assets/svg/<group>/<variant>.svg */
type ArrowVariant = 'right' | 'left' | 'up' | 'down';
type MarkVariant = 'check' | 'x';

type Group = 'arrows' | 'marks';
type Color = 'white' | 'black'
type FlipDirection = 'horizontal' | 'vertical' | 'both';

type BaseProps = {
  /** px size; if omitted, uses natural/inherited sizing */
  size?: number;
  flip?: FlipDirection;

  /** CSS color (uses `currentColor` inside the SVGs) */
  color?: Color;
  /** rotation in degrees */
  rotate?: number;
  /** extra classes */
  class?: string;
  /** aria-label for a11y (otherwise decorative) */
  ariaLabel?: string;
  /** for nuxt-svgo's wrapper (ISVG / nuxt-icon) to opt out of font sizing */
  fontControlled?: boolean;
};

/** discriminated union for type-safe variants per group */
type Props =
  | ({ type: 'arrows'; variant: ArrowVariant } & BaseProps)
  | ({ type: 'marks'; variant: MarkVariant } & BaseProps);

const props = defineProps<Props>();

if (import.meta.dev) {
  if (!availableIcons[props.type]?.includes(props.variant)) {
    console.warn(
      `Icon not found: assets/svg/${props.type}/${props.variant}.svg`,
    );
  }
}

/** nuxt-svgo registers components as svgo-<subfolders>-<filename> (kebab-cased) */
const tagName = computed(() => `svgo-${props.type}-${props.variant}`);

/** dynamic component reference; will be a valid component when the file exists */
const Dyn = computed(() => resolveDynamicComponent(tagName.value));

const transform = computed(() => {
  const ops: string[] = [];

  if (props.flip === 'horizontal' || props.flip === 'both')
    ops.push('scaleX(-1)');
  if (props.flip === 'vertical' || props.flip === 'both')
    ops.push('scaleY(-1)');

  if (props.rotate) ops.push(`rotate(${props.rotate}deg)`);
  return ops.join(' ');
});

const style = computed(() => ({
  color: props.color,
  width: props.size ? `${props.size}px` : undefined,
  height: props.size ? `${props.size}px` : undefined,
  transform: transform.value || undefined,
  transformOrigin: 'center',
  transformBox: 'fill-box', // important for SVG
}));

const role = computed(() => (props.ariaLabel ? 'img' : 'presentation'));
const iconProps = computed(() => ({
  fontControlled: props.fontControlled ?? false,
}));
</script>

<template>
  <component
    :is="Dyn"
    :aria-label="ariaLabel"
    :role="role"
    :class="class"
    :style="style"
    v-bind="iconProps"
  />
</template>
