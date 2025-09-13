// composables/useThemeFonts.ts
import { computed, watchEffect } from 'vue';
import { useCssVar, useMutationObserver, useDebounceFn } from '@vueuse/core';
import { useHead } from '#imports';

type FontInfo = {
  category: 'sans-serif' | 'serif' | 'display' | 'monospace';
  feel: string;
};

// -- Catalog (same as yours, trimmed only for brevity) --
export const fonts: Record<string, FontInfo> = {
  'Open Sans': { category: 'sans-serif', feel: 'Clean and readable' },
  'Roboto': { category: 'sans-serif', feel: 'Modern and friendly' },
  'Montserrat': { category: 'sans-serif', feel: 'Geometric and strong' },
  'Nunito': { category: 'sans-serif', feel: 'Rounded and approachable' },
  'Source Sans Pro': { category: 'sans-serif', feel: 'Professional and clear' },
  'Ubuntu': { category: 'sans-serif', feel: 'Warm and humanist' },
  'Work Sans': { category: 'sans-serif', feel: 'Minimal and functional' },
  'Raleway': { category: 'sans-serif', feel: 'Elegant and thin' },
  'Cabin': { category: 'sans-serif', feel: 'Humanist and organic' },
  'Hind': { category: 'sans-serif', feel: 'Simple and legible' },
  'Karla': { category: 'sans-serif', feel: 'Distinctive and quirky' },
  'Josefin Sans': { category: 'sans-serif', feel: 'Vintage and geometric' },
  'Quicksand': { category: 'sans-serif', feel: 'Rounded and modern' },
  'Oswald': { category: 'sans-serif', feel: 'Condensed and impactful' },
  'Orbitron': { category: 'sans-serif', feel: 'Futuristic and tech' },
  'Playfair Display': { category: 'serif', feel: 'Elegant and dramatic' },
  'Merriweather': { category: 'serif', feel: 'Pleasant and readable' },
  'Lora': { category: 'serif', feel: 'Calligraphic and friendly' },
  'Source Serif Pro': { category: 'serif', feel: 'Professional serif' },
  'EB Garamond': { category: 'serif', feel: 'Classical and elegant' },
  'Spectral': { category: 'serif', feel: 'Contemporary serif' },
  'Cinzel': { category: 'display', feel: 'Roman and majestic' },
  'Inconsolata': { category: 'monospace', feel: 'Code-friendly' },
};

const createPairing = (h: keyof typeof fonts, b: keyof typeof fonts) => ({
  heading: { name: h as string, ...fonts[h] },
  body: { name: b as string, ...fonts[b] },
});

export const fontPairings = {
  Classic: [
    createPairing('Playfair Display', 'Source Sans Pro'),
    createPairing('EB Garamond', 'Open Sans'),
    createPairing('Spectral', 'Roboto'),
    createPairing('Lora', 'Work Sans'),
    createPairing('Orbitron', 'Hind'),
    createPairing('Cinzel', 'Ubuntu'),
  ],
  Elegant: [
    createPairing('Playfair Display', 'Raleway'),
    createPairing('EB Garamond', 'Karla'),
    createPairing('Spectral', 'Josefin Sans'),
    createPairing('Lora', 'Cabin'),
    createPairing('Cinzel', 'Nunito'),
  ],
  Modern: [
    createPairing('Oswald', 'Merriweather'),
    createPairing('Quicksand', 'Ubuntu'),
    createPairing('Montserrat', 'Source Serif Pro'),
    createPairing('Work Sans', 'Lora'),
    createPairing('Nunito', 'Spectral'),
  ],
  Creative: [
    createPairing('Orbitron', 'Inconsolata'),
    createPairing('Josefin Sans', 'Playfair Display'),
    createPairing('Oswald', 'Source Serif Pro'),
  ],
} as const;

const SYSTEM_FONTS = ['Georgia', 'Times New Roman', 'Arial'] as const;
const isSystem = (f: string) => (SYSTEM_FONTS as readonly string[]).includes(f);
const fontString = (f: string) =>
  isSystem(f) ? `"${f}"` : `"${f}", sans-serif`;

const parseFirstFamily = (cssVarValue: string) => {
  const match = cssVarValue.match(/["']([^"']+)["']/);
  return match ? match[1] : cssVarValue.split(',')[0]?.trim();
};

const formatWeightRange = (weights: number[] = []) => {
  if (!weights.length) return '';
  const s = [...new Set(weights)].sort((a, b) => a - b);
  const out: string[] = [];
  let start = s[0],
    prev = s[0];
  for (let i = 1; i < s.length; i++) {
    const w = s[i];
    if (w === prev + 100) {
      prev = w;
      continue;
    }
    out.push(start === prev ? `${start}` : `${start}–${prev}`);
    start = prev = w;
  }
  out.push(start === prev ? `${start}` : `${start}–${prev}`);
  return out.join(', ');
};

// Light cache in Nuxt state (shared across pages)
const weightCache = () =>
  useState<Record<string, number[]>>('font:weights', () => ({}));
const loadedCache = () =>
  useState<Record<string, true>>('font:loaded', () => ({}));

const fetchGoogleFontWeights = async (family: string): Promise<number[]> => {
  if (isSystem(family)) return [400, 700];
  const cache = weightCache().value;
  if (cache[family]) return cache[family];

  try {
    const res = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
        family,
      )}:wght@100;200;300;400;500;600;700;800;900&display=swap`,
    );
    if (!res.ok) throw new Error(String(res.status));
    const css = await res.text();
    const blocks = css.split('@font-face');
    const found = new Set<number>();
    for (const b of blocks) {
      const m = b.match(/font-weight:\s*(\d+)/);
      if (m) found.add(parseInt(m[1], 10));
    }
    const weights = Array.from(found).sort((a, b) => a - b);
    cache[family] = weights.length ? weights : [400, 700];
    return cache[family];
  } catch {
    return (cache[family] = [400, 700]);
  }
};

const loadFontLink = (family: string, weights: number[]) => {
  if (isSystem(family)) return;
  const loaded = loadedCache().value;
  if (loaded[family]) return;
  const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weights.join(';')}&display=swap`;
  useHead({ link: [{ id: `gf-${family}`, rel: 'stylesheet', href }] });
  loaded[family] = true;
};

export function useThemeFonts() {
  // Bind directly to CSS vars (VueUse)
  const headingVar = import.meta.client
    ? useCssVar('--font-family-heading', document.documentElement)
    : undefined;
  const bodyVar = import.meta.client
    ? useCssVar('--font-family-body', document.documentElement)
    : undefined;

  // Expose current font names as refs derived from CSS vars
  const headingFont = useState<string>('font:heading', () => 'Orbitron');
  const bodyFont = useState<string>('font:body', () => 'Georgia');

  // Weights for the current heading/body
  const headingWeights = useState<number[]>('font:headingWeights', () => []);
  const bodyWeights = useState<number[]>('font:bodyWeights', () => []);

  const headingWeightSummary = computed(() =>
    formatWeightRange(headingWeights.value),
  );
  const bodyWeightSummary = computed(() =>
    formatWeightRange(bodyWeights.value),
  );

  const categories = Object.keys(fontPairings);
  const selectedCategory = useState<string>(
    'font:selectedCategory',
    () => 'Classic',
  );

  // Keep refs in sync with CSS variables
  const refreshFromCssVars = useDebounceFn(async () => {
    if (!import.meta.client) return;
    const h = parseFirstFamily(headingVar?.value ?? '') || headingFont.value;
    const b = parseFirstFamily(bodyVar?.value ?? '') || bodyFont.value;
    headingFont.value = h;
    bodyFont.value = b;
    const [hw, bw] = await Promise.all([
      fetchGoogleFontWeights(h),
      fetchGoogleFontWeights(b),
    ]);
    headingWeights.value = hw;
    bodyWeights.value = bw;
    loadFontLink(h, hw);
    loadFontLink(b, bw);
  }, 50);

  if (import.meta.client) {
    // Initial hydration
    watchEffect(refreshFromCssVars);

    // React to CSS var mutations
    useMutationObserver(document.documentElement, refreshFromCssVars, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  // Public API
  const setFonts = async (heading: string, body: string) => {
    // write CSS vars (VueUse ref writes style directly)
    if (headingVar) headingVar.value = fontString(heading);
    if (bodyVar) bodyVar.value = fontString(body);
    // refresh (loads & caches weights + links)
    await refreshFromCssVars();
  };

  const selectPairing = async (pairing: {
    heading: { name: string };
    body: { name: string };
  }) => {
    await setFonts(pairing.heading.name, pairing.body.name);
  };

  const isPairingSelected = (pairing: {
    heading: { name: string };
    body: { name: string };
  }) =>
    pairing.heading.name === headingFont.value &&
    pairing.body.name === bodyFont.value;

  return {
    // state
    headingFont,
    bodyFont,
    headingWeights,
    bodyWeights,
    headingWeightSummary,
    bodyWeightSummary,
    selectedCategory,
    categories,

    // catalog
    fonts,
    fontPairings,

    // utils + actions
    fontString,
    formatWeightRange,
    fetchGoogleFontWeights, // exposed in case you need it in the selector list
    setFonts,
    selectPairing,
    isPairingSelected,
  };
}
