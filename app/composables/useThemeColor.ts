// composables/useThemeColor.ts
const colorFamilies = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
] as const;
const allSteps = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type ColorFamily = (typeof colorFamilies)[number];
export type ColorSteps = (typeof allSteps)[number];

interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  mood: string;
  colors: Record<ColorFamily, Record<ColorSteps, string>>;
}

// TAILWIND-COMPATIBLE THEME DEFINITIONS
// Hardcoded, improved palettes
const coreThemes: ThemeDefinition[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Rich emerald with natural balance',
    mood: 'Professional & Trustworthy',
    colors: {
      // PRIMARY - Rich Emerald
      primary: {
        50: 'oklch(97.5% 0.015 166)',
        100: 'oklch(95% 0.03 165)',
        200: 'oklch(89% 0.06 164)',
        300: 'oklch(84% 0.09 163)',
        400: 'oklch(78% 0.12 162)',
        500: 'oklch(71% 0.15 161)',
        600: 'oklch(64% 0.14 160)',
        700: 'oklch(57% 0.13 159)',
        800: 'oklch(50% 0.12 158)',
        900: 'oklch(40% 0.11 157)',
        950: 'oklch(25% 0.06 156)',
      },
      // SECONDARY - Rich Teal
      secondary: {
        50: 'oklch(97.5% 0.01 190)',
        100: 'oklch(95% 0.02 190)',
        200: 'oklch(89% 0.05 192)',
        300: 'oklch(83% 0.08 194)',
        400: 'oklch(77% 0.11 196)',
        500: 'oklch(71% 0.14 198)',
        600: 'oklch(61.172% 0.10402 199.838)',
        700: 'oklch(57.844% 0.09836 199.301)',
        800: 'oklch(48.497% 0.08257 197.042)',
        900: 'oklch(39.133% 0.06659 197.732)',
        950: 'oklch(26.174% 0.04469 194.807)',
      },
      // SUCCESS - Vibrant Green
      success: {
        50: 'oklch(97.5% 0.01 145)',
        100: 'oklch(95% 0.02 146)',
        200: 'oklch(89% 0.05 148)',
        300: 'oklch(83% 0.09 150)',
        400: 'oklch(77% 0.13 151)',
        500: 'oklch(71% 0.17 152)',
        600: 'oklch(65% 0.16 152)',
        700: 'oklch(59% 0.15 151)',
        800: 'oklch(53% 0.13 150)',
        900: 'oklch(43% 0.11 149)',
        950: 'oklch(27% 0.07 148)',
      },
      // WARNING - Rich Amber
      warning: {
        50: 'oklch(97.5% 0.015 85)',
        100: 'oklch(95% 0.03 86)',
        200: 'oklch(89% 0.07 88)',
        300: 'oklch(83% 0.12 90)',
        400: 'oklch(77% 0.17 92)',
        500: 'oklch(71% 0.21 94)',
        600: 'oklch(65% 0.2 94)',
        700: 'oklch(59% 0.19 93)',
        800: 'oklch(53% 0.17 92)',
        900: 'oklch(43% 0.15 91)',
        950: 'oklch(27% 0.1 90)',
      },
      // ERROR - Blood Red/Maroon
      error: {
        50: 'oklch(97.5% 0.01 25)',
        100: 'oklch(95% 0.02 26)',
        200: 'oklch(89% 0.05 28)',
        300: 'oklch(83% 0.09 30)',
        400: 'oklch(77% 0.13 32)',
        500: 'oklch(71% 0.17 34)',
        600: 'oklch(65% 0.16 32)',
        700: 'oklch(59% 0.15 30)',
        800: 'oklch(53% 0.13 28)',
        900: 'oklch(43% 0.11 26)',
        950: 'oklch(27% 0.07 25)',
      },
      // INFO - Enhanced Cyan
      info: {
        50: 'oklch(97.5% 0.008 210)',
        100: 'oklch(95% 0.015 210)',
        200: 'oklch(89% 0.035 210)',
        300: 'oklch(83% 0.065 210)',
        400: 'oklch(77% 0.095 210)',
        500: 'oklch(71% 0.125 210)',
        600: 'oklch(65% 0.115 210)',
        700: 'oklch(59% 0.105 210)',
        800: 'oklch(53% 0.095 210)',
        900: 'oklch(43% 0.085 210)',
        950: 'oklch(27% 0.055 210)',
      },
      // NEUTRAL - Enhanced granular grays
      neutral: {
        50: 'oklch(98.5% 0.002 20)',
        100: 'oklch(97% 0.002 20)',
        200: 'oklch(94% 0.002 20)',
        300: 'oklch(85% 0.002 20)',
        400: 'oklch(75% 0.002 20)',
        500: 'oklch(58% 0.002 20)',
        600: 'oklch(46% 0.002 20)',
        700: 'oklch(38% 0.002 20)',
        800: 'oklch(31% 0.002 20)',
        900: 'oklch(23% 0.002 20)',
        950: 'oklch(15% 0.002 20)',
      },
    },
  },
  {
    id: 'tech-forward',
    name: 'Tech Forward',
    description: 'Modern, innovative, precise',
    mood: 'Cutting-edge & Professional',
    colors: {
      // Cyan brand
      primary: {
        50: 'oklch(96% 0.010 195)',
        100: 'oklch(90% 0.020 195)',
        200: 'oklch(80% 0.050 195)',
        300: 'oklch(72% 0.080 195)',
        400: 'oklch(64% 0.110 195)',
        500: 'oklch(56% 0.140 195)', // anchor
        600: 'oklch(48% 0.120 195)',
        700: 'oklch(40% 0.100 195)',
        800: 'oklch(32% 0.085 195)',
        900: 'oklch(26% 0.070 195)',
        950: 'oklch(22% 0.050 195)',
      },
      // Digital purple accent
      secondary: {
        50: 'oklch(96% 0.012 285)',
        100: 'oklch(90% 0.022 285)',
        200: 'oklch(80% 0.050 285)',
        300: 'oklch(70% 0.080 285)',
        400: 'oklch(62% 0.110 285)',
        500: 'oklch(54% 0.135 285)',
        600: 'oklch(46% 0.110 285)',
        700: 'oklch(38% 0.090 285)',
        800: 'oklch(30% 0.075 285)',
        900: 'oklch(24% 0.060 285)',
        950: 'oklch(22% 0.048 285)',
      },
      // Matrix green
      success: {
        50: 'oklch(96% 0.010 155)',
        100: 'oklch(90% 0.022 155)',
        200: 'oklch(80% 0.055 155)',
        300: 'oklch(72% 0.085 155)',
        400: 'oklch(64% 0.115 155)',
        500: 'oklch(56% 0.140 155)',
        600: 'oklch(48% 0.125 155)',
        700: 'oklch(40% 0.105 155)',
        800: 'oklch(32% 0.088 155)',
        900: 'oklch(26% 0.070 155)',
        950: 'oklch(22% 0.052 155)',
      },
      // Alert amber (tamed highlights)
      warning: {
        50: 'oklch(96% 0.012 85)',
        100: 'oklch(92% 0.028 85)',
        200: 'oklch(84% 0.065 85)',
        300: 'oklch(76% 0.105 85)',
        400: 'oklch(68% 0.145 85)',
        500: 'oklch(60% 0.180 85)',
        600: 'oklch(52% 0.165 85)',
        700: 'oklch(44% 0.140 85)',
        800: 'oklch(36% 0.120 85)',
        900: 'oklch(28% 0.095 85)',
        950: 'oklch(22% 0.070 85)',
      },
      // System red
      error: {
        50: 'oklch(96% 0.010 5)',
        100: 'oklch(90% 0.024 5)',
        200: 'oklch(80% 0.055 5)',
        300: 'oklch(72% 0.085 5)',
        400: 'oklch(64% 0.115 5)',
        500: 'oklch(56% 0.140 5)',
        600: 'oklch(48% 0.125 5)',
        700: 'oklch(40% 0.105 5)',
        800: 'oklch(32% 0.088 5)',
        900: 'oklch(26% 0.070 5)',
        950: 'oklch(22% 0.052 5)',
      },
      // Data blue
      info: {
        50: 'oklch(96% 0.010 220)',
        100: 'oklch(90% 0.020 220)',
        200: 'oklch(80% 0.045 220)',
        300: 'oklch(72% 0.070 220)',
        400: 'oklch(64% 0.095 220)',
        500: 'oklch(56% 0.110 220)',
        600: 'oklch(48% 0.100 220)',
        700: 'oklch(40% 0.088 220)',
        800: 'oklch(32% 0.078 220)',
        900: 'oklch(26% 0.060 220)',
        950: 'oklch(22% 0.045 220)',
      },
      // Cool tech gray (kept darks deeper for neutral only)
      neutral: {
        50: 'oklch(96% 0.003 240)',
        100: 'oklch(92% 0.005 240)',
        200: 'oklch(84% 0.008 240)',
        300: 'oklch(72% 0.012 240)',
        400: 'oklch(60% 0.015 240)',
        500: 'oklch(48% 0.017 240)',
        600: 'oklch(36% 0.015 240)',
        700: 'oklch(28% 0.013 240)',
        800: 'oklch(22% 0.011 240)',
        900: 'oklch(16% 0.008 240)',
        950: 'oklch(14% 0.004 240)',
      },
    },
  },
  {
    id: 'luxury-premium',
    name: 'Luxury Premium',
    description: 'Sophisticated, exclusive, refined',
    mood: 'High-end & Exclusive',
    colors: {
      // Royal purple
      primary: {
        50: 'oklch(94% 0.012 285)',
        100: 'oklch(88% 0.025 285)',
        200: 'oklch(76% 0.055 285)',
        300: 'oklch(66% 0.085 285)',
        400: 'oklch(58% 0.110 285)',
        500: 'oklch(50% 0.130 285)', // anchor
        600: 'oklch(42% 0.110 285)',
        700: 'oklch(34% 0.090 285)',
        800: 'oklch(28% 0.075 285)',
        900: 'oklch(24% 0.060 285)',
        950: 'oklch(22% 0.050 285)',
      },
      // Champagne gold (tamed highlight glare)
      secondary: {
        50: 'oklch(94% 0.014 45)',
        100: 'oklch(88% 0.028 45)',
        200: 'oklch(76% 0.060 45)',
        300: 'oklch(66% 0.090 45)',
        400: 'oklch(58% 0.120 45)',
        500: 'oklch(50% 0.135 45)',
        600: 'oklch(42% 0.120 45)',
        700: 'oklch(34% 0.105 45)',
        800: 'oklch(28% 0.090 45)',
        900: 'oklch(24% 0.075 45)',
        950: 'oklch(22% 0.055 45)',
      },
      // Emerald
      success: {
        50: 'oklch(94% 0.010 155)',
        100: 'oklch(88% 0.022 155)',
        200: 'oklch(76% 0.055 155)',
        300: 'oklch(66% 0.085 155)',
        400: 'oklch(58% 0.110 155)',
        500: 'oklch(50% 0.120 155)',
        600: 'oklch(42% 0.105 155)',
        700: 'oklch(34% 0.090 155)',
        800: 'oklch(28% 0.078 155)',
        900: 'oklch(24% 0.062 155)',
        950: 'oklch(22% 0.048 155)',
      },
      // Luxe amber
      warning: {
        50: 'oklch(94% 0.014 75)',
        100: 'oklch(88% 0.030 75)',
        200: 'oklch(76% 0.070 75)',
        300: 'oklch(66% 0.110 75)',
        400: 'oklch(58% 0.150 75)',
        500: 'oklch(50% 0.170 75)',
        600: 'oklch(42% 0.155 75)',
        700: 'oklch(34% 0.135 75)',
        800: 'oklch(28% 0.115 75)',
        900: 'oklch(24% 0.095 75)',
        950: 'oklch(22% 0.070 75)',
      },
      // Deep burgundy
      error: {
        50: 'oklch(94% 0.010 20)',
        100: 'oklch(88% 0.022 20)',
        200: 'oklch(76% 0.055 20)',
        300: 'oklch(66% 0.085 20)',
        400: 'oklch(58% 0.110 20)',
        500: 'oklch(50% 0.120 20)',
        600: 'oklch(42% 0.105 20)',
        700: 'oklch(34% 0.090 20)',
        800: 'oklch(28% 0.078 20)',
        900: 'oklch(24% 0.062 20)',
        950: 'oklch(22% 0.048 20)',
      },
      // Sapphire blue
      info: {
        50: 'oklch(94% 0.010 235)',
        100: 'oklch(88% 0.022 235)',
        200: 'oklch(76% 0.050 235)',
        300: 'oklch(66% 0.078 235)',
        400: 'oklch(58% 0.105 235)',
        500: 'oklch(50% 0.130 235)',
        600: 'oklch(42% 0.115 235)',
        700: 'oklch(34% 0.095 235)',
        800: 'oklch(28% 0.080 235)',
        900: 'oklch(24% 0.065 235)',
        950: 'oklch(22% 0.050 235)',
      },
      // Rich charcoal neutrals
      neutral: {
        50: 'oklch(94% 0.004 285)',
        100: 'oklch(90% 0.008 285)',
        200: 'oklch(80% 0.015 285)',
        300: 'oklch(68% 0.020 285)',
        400: 'oklch(56% 0.024 285)',
        500: 'oklch(44% 0.020 285)',
        600: 'oklch(32% 0.020 285)',
        700: 'oklch(28% 0.020 285)',
        800: 'oklch(24% 0.018 285)',
        900: 'oklch(20% 0.010 285)',
        950: 'oklch(16% 0.008 285)',
      },
    },
  },
];

export interface ColorPreset {
  id: string;
  name: string;
  description: string;
  mood: string;
}

// Generate presets from core themes
export const colorPresets: ColorPreset[] = coreThemes.map((theme) => ({
  id: theme.id,
  name: theme.name,
  description: theme.description,
  mood: theme.mood,
}));

export const useThemeColor = () => {
  // Global UI state
  const themeSlideoverOpen = useState<boolean>(
    'theme-slideover-open',
    () => false,
  );
  const currentPreset = useState<string>(
    'theme-current-preset',
    () => 'default',
  );

  // Get current theme definition
  const currentTheme = computed<ThemeDefinition>(
    () =>
      coreThemes.find((theme) => theme.id === currentPreset.value) ??
      coreThemes[0],
  );

  const activePreset = computed(
    () =>
      colorPresets.find((p) => p.id === currentPreset.value) || colorPresets[0],
  );

  // All colors are directly from theme definitions
  const allColors = computed(() => currentTheme.value.colors);

  // Apply preset function
  const applyPreset = (presetId: string) => {
    const preset = coreThemes.find((theme) => theme.id === presetId);
    if (!preset) return;

    currentPreset.value = presetId;

    // Apply CSS variables immediately
    if (import.meta.client) {
      colorFamilies.forEach((family) => {
        allSteps.forEach((step) => {
          const varName = `--color-${family}-${step}`;
          const color = preset.colors[family][step];
          document.documentElement.style.setProperty(varName, color);
        });
      });
    }
  };

  // Generate CSS for export
  const generatedCSS = computed(() => {
    const theme = currentTheme.value;
    let css = `/* ${theme.name} - ${theme.mood} */\n\n`;
    css += '@theme {\n';

    colorFamilies.forEach((family) => {
      css += `\n  /* ${family.toUpperCase()} */\n`;
      allSteps.forEach((step) => {
        css += `  --ui-color-${family}-${step}: ${theme.colors[family][step]};\n`;
      });
    });

    css += '\n  /* Semantic mappings */\n';
    colorFamilies.forEach((family) => {
      css += `  --ui-${family}: var(--ui-color-${family}-600);\n`;
    });
    css += '}';
    return css;
  });

  // Initialize CSS variables on mount
  onMounted(() => {
    if (import.meta.client) {
      const theme = currentTheme.value;
      colorFamilies.forEach((family) => {
        allSteps.forEach((step) => {
          const varName = `--color-${family}-${step}`;
          const color = theme.colors[family][step];
          document.documentElement.style.setProperty(varName, color);
        });
      });
    }
  });

  // Watch for preset changes
  watch(currentPreset, (newPreset) => {
    if (import.meta.client) {
      const theme = coreThemes.find((t) => t.id === newPreset);
      if (theme) {
        colorFamilies.forEach((family) => {
          allSteps.forEach((step) => {
            const varName = `--color-${family}-${step}`;
            const color = theme.colors[family][step];
            document.documentElement.style.setProperty(varName, color);
          });
        });
      }
    }
  });

  return {
    // Global UI
    themeSlideoverOpen,

    // Core state
    currentPreset,
    currentTheme,
    activePreset,

    // Computed
    allColors,
    generatedCSS,
    colorPresets,

    // Actions
    applyPreset,

    // Constants
    colorFamilies,
    allSteps,
    coreThemes, // Export for comparison view
  };
};
