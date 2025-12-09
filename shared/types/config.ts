// shared/types/config.ts
import type { ButtonProps } from '@nuxt/ui';

export type ConfigSource = 'validator' | 'founder-funnel' | 'root';

export interface SectionCta {
  headline: string;
  message: string;
  button: {
    to: ButtonProps['to'];
    icon?: ButtonProps['icon'];
    color?: ButtonProps['color'];
    variant?: ButtonProps['variant'];
    label: ButtonProps['label'];
    note?: string;
    disabled?: ButtonProps['disabled'];
  };
  primary?: boolean;
}

