
import type { IconProps } from '@nuxt/ui';

export const STATUS_ICONS: Record<string, IconProps & { class: string }> = {
  'status-available': { name: 'lucide:check', class: 'text-success' },
  'status-beta': { name: 'lucide:flask-conical', class: 'text-info' },
  'status-coming-soon': { name: 'lucide:clock', class: 'text-warning' },
};
