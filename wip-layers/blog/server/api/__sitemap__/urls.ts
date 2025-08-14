// server/api/__sitemap__/urls.ts
import type { SitemapUrlInput } from '#sitemap/types'
import { queryCollection } from '#imports'

type URLPriority = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1 | undefined

export default defineSitemapEventHandler(async (event) => {
  // Get all blog posts with sitemap data
  const posts = await queryCollection(event, 'blog')
    .select('path', 'title', 'date', 'sitemap')
    .all()

  const blogUrls: SitemapUrlInput[] = posts.map((post) => ({
    loc: post.path,
    lastmod: post.sitemap?.lastmod || post.date,
    changefreq: post.sitemap?.changefreq || 'monthly',
    priority: (post.sitemap?.priority ?? 0.7) as URLPriority,
  }))

  // Add static pages
  const staticUrls: SitemapUrlInput[] = [
    {
      loc: '/',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: '/blog',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    },
  ]

  return [...staticUrls, ...blogUrls]
})
