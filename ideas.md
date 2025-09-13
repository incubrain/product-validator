# Inspiration

https://feldmanarchitecture.com/
https://www.woodsdangaran.com/
https://www.anacapaarchitecture.com/


# Dynamic Full Width Font Sizing

The main issue here is that we would need to revert to passing the text as a prop for integrating with Heading component. This should be avoided, content should be passed to the slot not the props so we can use TextEffect and other augmentors if needed.

const computeFontSize = (text: string) => {
  const charCount = text.length
  // Reduce vw as character count increases
  const baseVw = Math.max(3, 12 - (charCount * 0.4))
  const minRem = 3
  const maxRem = 16
  return `clamp(${minRem}rem,${baseVw}vw,${maxRem}rem)`
}

const dynamicFontSize = computed(() => computeFontSize(text))

vbind in style tags

text-(--font-massive) for TW integration