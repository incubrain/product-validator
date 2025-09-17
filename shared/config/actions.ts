import type { ButtonProps } from '@nuxt/ui';

type ActionVariantEmotion = 'urgency' | 'value' | 'trust' | 'curiosity';

export interface ActionVariant {
  id: ActionVariantEmotion;
  label: string;
  labelMobile?: string;
  icon?: string;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
}

export interface Action {
  id: string;
  target: string;
  variants: ActionVariant[];
  disabled?: boolean;
}

export interface ActionConfig {
  paid: Action;
  free?: Action;
  social?: Action;
}

// CTA Configuration
export const actionConfig = {
  paid: {
    id: 'purchase_course',
    target: 'https://whop.com/incubrain-community/product-validator',
    disabled: false,
    variants: [
      {
        id: 'urgency',
        label: 'Get Course ($50 early-bird)',
        labelMobile: 'Get Course',
        icon: 'i-lucide-play',
        variant: 'solid',
        color: 'primary',
      },
      {
        id: 'value',
        label: 'Start Validating Today',
        labelMobile: 'Start Now',
        icon: 'i-lucide-rocket',
        variant: 'solid',
        color: 'secondary',
      },
    ],
  },

  free: {
    id: 'use_template',
    target: 'https://github.com/incubrain/nuxt-launch-kit',
    disabled: false,
    variants: [
      {
        id: 'urgency',
        label: 'Use Template (Free)',
        labelMobile: 'Use Template',
        icon: 'i-lucide-layout-panel-top',
        variant: 'outline',
        color: 'neutral',
      },
      {
        id: 'value',
        label: 'Clone & Launch Today',
        labelMobile: 'Clone Now',
        icon: 'i-lucide-download',
        variant: 'outline',
        color: 'primary',
      },
    ],
  },

  social: {
    id: 'watch_critique',
    target: 'https://www.youtube.com/@Incubrain',
    disabled: false,
    variants: [
      {
        id: 'curiosity',
        label: 'Watch Critiques',
        labelMobile: 'Watch',
        icon: 'i-lucide-youtube',
        variant: 'ghost',
        color: 'error',
      },
      {
        id: 'value',
        label: 'See Real Examples',
        labelMobile: 'Examples',
        icon: 'i-lucide-play-circle',
        variant: 'ghost',
        color: 'error',
      },
    ],
  },
} satisfies ActionConfig;

export type ActionKey = keyof typeof actionConfig;

// Helper functions
export function getActionType(target: string): string {
  if (target.startsWith('#')) return 'scroll';
  if (target.startsWith('tel:')) return 'phone';
  if (target.startsWith('mailto:')) return 'email';
  if (target.startsWith('http')) return 'external';
  return 'modal'; // fallback
}
export const getActionConfig = () => actionConfig;
export const getAction = (key: keyof ActionConfig) => actionConfig[key];
