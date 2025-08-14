// server/api/blog/metadata.get.ts
export default defineEventHandler(async (event) => {
  try {
    const posts = await queryCollection(event, 'blog').select('stem', 'category', 'featured').all()

    const categories: Record<string, number> = {}
    let totalPosts = 0
    let featuredCount = 0

    if (posts && Array.isArray(posts)) {
      posts.forEach((post) => {
        // ENHANCED: Use multiple extraction methods
        let category = post.category

        // Method 1: Extract from stem pattern /blog/category/post-name
        if (!category && post.stem) {
          const pathSegments = post.stem.split('/').filter(Boolean)
          if (pathSegments.length >= 3 && pathSegments[0] === 'blog') {
            category = pathSegments[1] // ai-automation, case-studies, etc.
          }
        }

        // Method 2: Validate against known categories
        const validCategory = Object.keys(CATEGORY_NAMES).includes(category)
          ? category
          : 'uncategorized'

        categories[validCategory] = (categories[validCategory] || 0) + 1
        totalPosts++
        if (post.featured) featuredCount++
      })
    }

    return {
      categories,
      totalPosts,
      featuredCount,
      lastUpdated: new Date().toISOString(),
    }
  } catch (error: any) {
    console.error('Metadata API error:', error)
    return {
      categories: {},
      totalPosts: 0,
      featuredCount: 0,
      lastUpdated: new Date().toISOString(),
      error: error.message,
    }
  }
})
