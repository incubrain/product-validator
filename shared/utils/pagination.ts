// shared/utils/pagination.ts
export const PAGINATION_DEFAULTS = {
  blog: 12,
  projects: 9,
  products: 16,
  team: 8,
} as const

export const CONTENT_TYPE_LABELS = {
  blog: 'posts',
  projects: 'projects', 
  products: 'products',
  team: 'members',
} as const

export type ContentType = keyof typeof CONTENT_TYPE_LABELS