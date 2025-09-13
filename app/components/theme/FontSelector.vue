<script setup lang="ts">
const FONT_WEIGHTS = '300;400;500;600;700';
const PREVIEW_TEXT = 'The quick brown fox jumps';

const fontPairings = {
  Classic: [
    { heading: 'Playfair Display', body: 'Source Sans Pro' },
    { heading: 'Quattrocento', body: 'Quattrocento Sans' },
    { heading: 'Quattrocento', body: 'Fanwood Text' },
    { heading: 'Oswald', body: 'Quattrocento' },
    { heading: 'Fjalla One', body: 'Libre Baskerville' },
    { heading: 'Lustria', body: 'Lato' },
    { heading: 'Cormorant Garamond', body: 'Proza Libre' },
    { heading: 'Oswald', body: 'EB Garamond' },
    { heading: 'Libre Baskerville', body: 'Source Sans Pro' },
  ],
  Elegant: [
    { heading: 'Cinzel', body: 'Fauna One' },
    { heading: 'Sacramento', body: 'Alice' },
    { heading: 'Yeseva One', body: 'Josefin Sans' },
    { heading: 'Libre Baskerville', body: 'Montserrat' },
    { heading: 'Cardo', body: 'Josefin Sans' },
    { heading: 'Lora', body: 'Roboto' },
    { heading: 'Spectral', body: 'Karla' },
    { heading: 'Halant', body: 'Nunito Sans' },
    { heading: 'Karla', body: 'Karla' },
    { heading: 'Lora', body: 'Merriweather' },
  ],
  Modern: [
    { heading: 'Roboto', body: 'Nunito' },
    { heading: 'Quicksand', body: 'Quicksand' },
    { heading: 'Ubuntu', body: 'Open Sans' },
    { heading: 'Montserrat', body: 'Hind' },
    { heading: 'Nunito', body: 'Pt Sans' },
    { heading: 'Oswald', body: 'Merriweather' },
    { heading: 'Montserrat', body: 'Cardo' },
    { heading: 'Montserrat', body: 'Crimson Text' },
    { heading: 'Open Sans', body: 'Open Sans Condensed' },
    { heading: 'Nunito', body: 'Nunito' },
  ],
  Creative: [
    { heading: 'Arvo', body: 'Lato' },
    { heading: 'Abril Fatface', body: 'Poppins' },
    { heading: 'Playfair Display', body: 'Source Sans Pro' },
    { heading: 'Karla', body: 'Inconsolata' },
    { heading: 'Ultra', body: 'Slabo 27px' },
    { heading: 'Nixie One', body: 'Ledger' },
    { heading: 'Stint Ultra Expanded', body: 'Pontano Sans' },
    { heading: 'Amatic SC', body: 'Andika' },
    { heading: 'Unica One', body: 'Crimson Text' },
    { heading: 'Philosopher', body: 'Muli' },
  ],
  Minimalist: [
    { heading: 'Source Sans Pro', body: 'Source Serif Pro' },
    { heading: 'Fjalla One', body: 'Cantarell' },
    { heading: 'Work Sans', body: 'Open Sans' },
    { heading: 'Hind', body: 'Open Sans' },
    { heading: 'Nunito', body: 'Open Sans' },
    { heading: 'Oxygen', body: 'Source Sans Pro' },
    { heading: 'PT Sans', body: 'Cabin' },
    { heading: 'Roboto Condensed', body: 'Cabin' },
    { heading: 'Raleway', body: 'Open Sans' },
    { heading: 'Roboto', body: 'Lora' },
  ],
} as const;

const bodyFont = ref('Open Sans');
const headingFont = ref('Playfair Display');

const selectedCategory = ref('Classic');
const categories = Object.keys(fontPairings);

const loadedFonts = new Set<string>();

function loadFont(font: string) {
  if (!font || !import.meta.client || loadedFonts.has(font)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    font,
  )}:wght@${FONT_WEIGHTS}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(font);
}

// Select pairing
function selectPairing(pairing: { heading: string; body: string }) {
  headingFont.value = pairing.heading;
  bodyFont.value = pairing.body;

  // Load fonts immediately
  loadFont(pairing.heading);
  loadFont(pairing.body);
}

// Check if pairing is currently selected
function isPairingSelected(pairing: { heading: string; body: string }) {
  return (
    pairing.heading === headingFont.value && pairing.body === bodyFont.value
  );
}

// Preload fonts for visible category
watchEffect(() => {
  const pairings = fontPairings[selectedCategory.value] || [];
  pairings.forEach(({ heading, body }) => {
    loadFont(heading);
    loadFont(body);
  });
});

const fontString = (font: string) => `"${font}", sans-serif`;
</script>

<template>
  <div class="space-y-4">
    <!-- Category Tabs -->
    <div>
      <label class="block font-medium mb-3">Font Pairings</label>
      <div
        class="flex sticky top-20 gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
      >
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'flex-1 text-xs py-2 px-3 rounded-md transition-colors',
            selectedCategory === category
              ? 'bg-white dark:bg-neutral-700 font-medium shadow-sm'
              : 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
          ]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Pairing Preview Grid -->
    <div class="grid grid-cols-1 gap-3">
      <button
        v-for="(pairing, index) in fontPairings[selectedCategory]"
        :key="`${selectedCategory}-${index}`"
        :class="[
          'text-left p-4 border-2 rounded-lg transition-all hover:shadow-md',
          isPairingSelected(pairing)
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300',
        ]"
        @click="selectPairing(pairing)"
      >
        <!-- Heading Preview -->
        <div
          class="text-lg font-semibold mb-1 truncate"
          :style="{ fontFamily: fontString(pairing.heading) }"
        >
          {{ pairing.heading }}
        </div>

        <!-- Body Preview -->
        <div
          class="text-sm text-neutral-600 dark:text-neutral-400 truncate"
          :style="{ fontFamily: fontString(pairing.body) }"
        >
          {{ pairing.body }} • {{ PREVIEW_TEXT }}
        </div>
      </button>
    </div>
  </div>
</template>
