// server/api/content/metadata.ts
interface ContentMetadataResponse {
  items: Array<{
    stem?: string
    category?: string
    featured?: boolean
    title?: string
    path?: string
    date?: string
    description?: string
  }>
  pagination: {
    totalItems: number
  }
  categories: Record<string, number>
  collection: string
  category: string
  lastUpdated: string
}

export default defineEventHandler(async (event): Promise<ContentMetadataResponse> => {
  const query = getQuery(event)
  const collection = query.collection as string
  const category = query.category as string

  if (!collection) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Collection parameter is required',
    })
  }

  try {
    let baseQuery = queryCollection(event, collection as any)
      .select('stem', 'category', 'featured', 'title', 'path', 'date', 'description')
      .order('date', 'DESC')

    // Filter by category if provided and not 'all'
    if (category && category !== 'all') {
      baseQuery = baseQuery.where('category', '=', category)
    }

    const items = await baseQuery.all()

    // Category counts (for all items)
    const allItemsForCounts = await queryCollection(event, collection as any)
      .select('category')
      .all()

    const categories: Record<string, number> = { all: allItemsForCounts.length }
    allItemsForCounts.forEach((item) => {
      const cat = item.category || 'uncategorized'
      categories[cat] = (categories[cat] || 0) + 1
    })

    return {
      items,
      pagination: {
        totalItems: items.length,
      },
      categories,
      collection,
      category: category || 'all',
      lastUpdated: new Date().toISOString(),
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch ${collection} metadata: ${error.message}`,
    })
  }
})
