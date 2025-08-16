import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filePath = query.path as string

  if (!filePath) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File path is required',
    })
  }

  try {
    // Security: Only allow reading from specific directories
    const allowedPaths = ['theme/', 'components/', 'composables/']
    const isAllowed = allowedPaths.some((allowed) => filePath.startsWith(allowed))

    if (!isAllowed) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied to this file path',
      })
    }

    // Read file from project root
    const fullPath = resolve(process.cwd(), filePath)
    const content = await readFile(fullPath, 'utf-8')
    console.log(`Read file: ${fullPath}`, content)
    return content
  } catch (error) {
    console.error('File read error:', error)
    throw createError({
      statusCode: 404,
      statusMessage: `File not found: ${filePath}`,
    })
  }
})
