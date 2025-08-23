<script setup lang="ts">
type Anchor = 'tl' | 'tr' | 'bl' | 'br' | 'tc' | 'bc' | 'cl' | 'cr' | 'cc'
type XY = number | string
type Breakpoint = { anchor?: Anchor, x?: XY, y?: XY }

const props = withDefaults(defineProps<{
  anchor?: Anchor
  x?: XY
  y?: XY
  as?: string
  z?: number | string
  pointerEvents?: 'auto' | 'none'
  class?: string
  sm?: Breakpoint
  md?: Breakpoint
  lg?: Breakpoint
  xl?: Breakpoint
}>(), {
  anchor: 'tl',
  x: 0,
  y: 0,
  as: 'div',
  pointerEvents: 'auto',
})

const toUnit = (v?: XY) =>
  v == null ? undefined : typeof v === 'number' ? `${v}px` : String(v)

const styleVars = computed<Record<string, string>>(() => {
  const s: Record<string, string> = {
    // base offsets
    '--ax': toUnit(props.x) ?? '0px',
    '--ay': toUnit(props.y) ?? '0px',
  }
  // per-breakpoint “promote later” vars
  const axSm = toUnit(props.sm?.x)
  if (axSm) s['--ax-sm'] = axSm
  const aySm = toUnit(props.sm?.y)
  if (aySm) s['--ay-sm'] = aySm
  const axMd = toUnit(props.md?.x)
  if (axMd) s['--ax-md'] = axMd
  const ayMd = toUnit(props.md?.y)
  if (ayMd) s['--ay-md'] = ayMd
  const axLg = toUnit(props.lg?.x)
  if (axLg) s['--ax-lg'] = axLg
  const ayLg = toUnit(props.lg?.y)
  if (ayLg) s['--ay-lg'] = ayLg
  const axXl = toUnit(props.xl?.x)
  if (axXl) s['--ax-xl'] = axXl
  const ayXl = toUnit(props.xl?.y)
  if (ayXl) s['--ay-xl'] = ayXl

  if (props.z != null) s['z-index'] = String(props.z)
  if (props.pointerEvents) s['pointer-events'] = props.pointerEvents
  return s
})

const dataAttrs = computed(() => ({
  'data-anchor': props.anchor,
  'data-anchor-sm': props.sm?.anchor,
  'data-anchor-md': props.md?.anchor,
  'data-anchor-lg': props.lg?.anchor,
  'data-anchor-xl': props.xl?.anchor,
}))
</script>

<template>
  <component
    :is="as"
    class="anchor-abs absolute will-change-transform"
    :class="$attrs.class"
    :style="styleVars"
    v-bind="dataAttrs"
  >
    <slot />
  </component>
</template>

<style scoped>
/* --- Base position mappings (unset opposites to prevent leakage) --- */
:where(.anchor-abs)[data-anchor="tl"],
:where(.anchor-abs)[data-anchor-sm="tl"],
:where(.anchor-abs)[data-anchor-md="tl"],
:where(.anchor-abs)[data-anchor-lg="tl"],
:where(.anchor-abs)[data-anchor-xl="tl"] {
  top: var(--ay); left: var(--ax);
  right: auto; bottom: auto; transform: translate(0);
}

:where(.anchor-abs)[data-anchor="tr"],
:where(.anchor-abs)[data-anchor-sm="tr"],
:where(.anchor-abs)[data-anchor-md="tr"],
:where(.anchor-abs)[data-anchor-lg="tr"],
:where(.anchor-abs)[data-anchor-xl="tr"] {
  top: var(--ay); right: var(--ax);
  left: auto; bottom: auto; transform: translate(0);
}

:where(.anchor-abs)[data-anchor="bl"],
:where(.anchor-abs)[data-anchor-sm="bl"],
:where(.anchor-abs)[data-anchor-md="bl"],
:where(.anchor-abs)[data-anchor-lg="bl"],
:where(.anchor-abs)[data-anchor-xl="bl"] {
  bottom: var(--ay); left: var(--ax);
  top: auto; right: auto; transform: translate(0);
}

:where(.anchor-abs)[data-anchor="br"],
:where(.anchor-abs)[data-anchor-sm="br"],
:where(.anchor-abs)[data-anchor-md="br"],
:where(.anchor-abs)[data-anchor-lg="br"],
:where(.anchor-abs)[data-anchor-xl="br"] {
  bottom: var(--ay); right: var(--ax);
  top: auto; left: auto; transform: translate(0);
}

:where(.anchor-abs)[data-anchor="tc"],
:where(.anchor-abs)[data-anchor-sm="tc"],
:where(.anchor-abs)[data-anchor-md="tc"],
:where(.anchor-abs)[data-anchor-lg="tc"],
:where(.anchor-abs)[data-anchor-xl="tc"] {
  top: var(--ay); left: 50%;
  right: auto; bottom: auto; transform: translateX(-50%);
}

:where(.anchor-abs)[data-anchor="bc"],
:where(.anchor-abs)[data-anchor-sm="bc"],
:where(.anchor-abs)[data-anchor-md="bc"],
:where(.anchor-abs)[data-anchor-lg="bc"],
:where(.anchor-abs)[data-anchor-xl="bc"] {
  bottom: var(--ay); left: 50%;
  top: auto; right: auto; transform: translateX(-50%);
}

:where(.anchor-abs)[data-anchor="cl"],
:where(.anchor-abs)[data-anchor-sm="cl"],
:where(.anchor-abs)[data-anchor-md="cl"],
:where(.anchor-abs)[data-anchor-lg="cl"],
:where(.anchor-abs)[data-anchor-xl="cl"] {
  left: var(--ax); top: 50%;
  right: auto; transform: translateY(-50%);
}

:where(.anchor-abs)[data-anchor="cr"],
:where(.anchor-abs)[data-anchor-sm="cr"],
:where(.anchor-abs)[data-anchor-md="cr"],
:where(.anchor-abs)[data-anchor-lg="cr"],
:where(.anchor-abs)[data-anchor-xl="cr"] {
  right: var(--ax); top: 50%;
  left: auto; transform: translateY(-50%);
}

:where(.anchor-abs)[data-anchor="cc"],
:where(.anchor-abs)[data-anchor-sm="cc"],
:where(.anchor-abs)[data-anchor-md="cc"],
:where(.anchor-abs)[data-anchor-lg="cc"],
:where(.anchor-abs)[data-anchor-xl="cc"] {
  left: 50%; top: 50%;
  right: auto; bottom: auto; transform: translate(-50%, -50%);
}

/* --- Promote breakpoint vars into --ax/--ay (no attr(), works everywhere) --- */
@media (min-width: 640px) {
  .anchor-abs { --ax: var(--ax-sm, var(--ax)); --ay: var(--ay-sm, var(--ay)); }
}
@media (min-width: 768px) {
  .anchor-abs { --ax: var(--ax-md, var(--ax)); --ay: var(--ay-md, var(--ay)); }
}
@media (min-width: 1024px) {
  .anchor-abs { --ax: var(--ax-lg, var(--ax)); --ay: var(--ay-lg, var(--ay)); }
}
@media (min-width: 1280px) {
  .anchor-abs { --ax: var(--ax-xl, var(--ax)); --ay: var(--ay-xl, var(--ay)); }
}
</style>
