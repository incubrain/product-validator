// shared/utils/blog.ts
export const CATEGORY_NAMES = {
  'blog-examples': 'Blog Examples',
  'documentation': 'Template Documentation',
} as const

export const CATEGORY_DESCRIPTIONS = {
  'blog-examples': 'In-depth examples of our blog posts and content strategies',
  'documentation': 'Comprehensive guides and documentation for using our template',
} as const

export const getCategoryName = (category: string | null | undefined): string => {
  if (!category) return 'Uncategorized'
  return (
    CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES]
    || category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  )
}

export const getCategoryDescription = (category: string | null | undefined): string => {
  if (!category) return 'Latest posts and updates'
  return (
    CATEGORY_DESCRIPTIONS[category as keyof typeof CATEGORY_DESCRIPTIONS]
    || `Latest posts in ${getCategoryName(category).toLowerCase()}`
  )
}

export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 12,
  FEATURED_POSTS_COUNT: 1,
  SEARCH_RESULTS_LIMIT: 8,
} as const

// Updated: More flexible generic function
export function groupByCategory<T extends Record<string, any>>(
  items: T[] | null | undefined,
): Record<string, T[]> {
  if (!items) return {}

  return items.reduce((grouped: Record<string, T[]>, item) => {
    // Use 'category' property if it exists, otherwise 'uncategorized'
    const category = (item.category as string) || 'uncategorized'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(item)
    return grouped
  }, {})
}
