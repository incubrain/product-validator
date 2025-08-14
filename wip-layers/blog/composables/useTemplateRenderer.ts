// composables/useTemplateRenderer.ts
import Handlebars from 'handlebars'

export const useTemplateRenderer = () => {
  const config = useConfig('business')

  // Register helpful Handlebars helpers
  Handlebars.registerHelper('year', () => new Date().getFullYear())
  Handlebars.registerHelper('uppercase', (str: string) => str.toUpperCase())
  Handlebars.registerHelper('lowercase', (str: string) => str.toLowerCase())

  const processTemplate = (content: string): string => {
    try {
      const template = Handlebars.compile(content)
      return template(config)
    } catch (error) {
      console.warn('Template processing error:', error)
      return content // Return original if processing fails
    }
  }

  const processObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return processTemplate(obj)
    }

    if (Array.isArray(obj)) {
      return obj.map(processObject)
    }

    if (obj && typeof obj === 'object') {
      const result: any = {}
      for (const [key, value] of Object.entries(obj)) {
        result[key] = processObject(value)
      }
      return result
    }

    return obj
  }

  return {
    processTemplate,
    processObject,
    config,
  }
}
