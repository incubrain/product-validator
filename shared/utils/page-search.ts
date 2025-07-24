import { kebabCase } from 'lodash-es'

export function findComponentData(body: any, componentName: string): any {
  let found = null

  function deepSearch(obj: any): void {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (Array.isArray(item) && item[0] === 'dynamic-section') {
          const props = item[1]
          if (props?.component === componentName) {
            found = item
            return
          }
        }
        deepSearch(item)
      })
    } else if (typeof obj === 'object' && obj !== null) {
      Object.values(obj).forEach(deepSearch)
    }
  }

  deepSearch(body.value)
  return found
}

export function extractComponentProps(component: any): Record<string, any> {
  if (!Array.isArray(component) || component.length < 2) return {}

  // Structure: ['dynamic-section', { component: 'Name', title: 'X', intent: 'Y' }, yamlContent]
  const inlineProps = component[1] || {}
  const yamlContent = component[2] || {}

  return {
    // Inline props (component, title, subtitle, intent)
    ...inlineProps,
    // YAML content prop
    content: yamlContent,
  }
}

export function extractMDCComponents(body: any): string[] {
  if (!body?.value) return []

  const components: string[] = []

  function deepSearch(obj: any, path = ''): void {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        if (Array.isArray(item)) {
          // Check for both dynamic-section AND section-wrapper
          if (item[0] === 'dynamic-section') {
            const props = item[1]
            if (props?.component) {
              console.log(`🔍 Found dynamic-section at ${path}[${index}]:`, props.component)
              components.push(props.component)
            }
          } else if (item[0] === 'section-wrapper') {
            console.log(`🔍 Found section-wrapper at ${path}[${index}], searching deeper...`)
            // Continue searching inside section-wrapper
            deepSearch(item, `${path}[${index}]`)
          }
        }
        // Always search recursively
        deepSearch(item, `${path}[${index}]`)
      })
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => {
        deepSearch(obj[key], `${path}.${key}`)
      })
    }
  }

  console.log(`🔍 Deep searching body structure...`)
  deepSearch(body.value)
  console.log(`🔍 Total components found: ${components.length}`)
  console.log(`🔍 Components:`, components)

  return [...new Set(components)]
}

export function extractSearchFromProps(componentName: string, props: any) {
  // Extract from inline props first, then content
  const title = props.title || props.content?.title || componentName
  const subtitle = props.subtitle || props.content?.subtitle || ''

  // Extract searchable text from content payload
  const contentText = extractTextFromContent(props.content)

  const searchContent = [subtitle, contentText].filter(Boolean).join(' ').slice(0, 200)

  return {
    title,
    content: searchContent,
    sectionId: kebabCase(title),
    intent: props.intent,
    context: inferSimpleContext(componentName, searchContent, props.intent),
  }
}

function extractTextFromContent(content: any): string {
  if (!content) return ''

  // Extract common patterns from your content structure
  const texts = []

  if (content.cards) {
    content.cards.forEach((card: any) => {
      texts.push(card.title, card.description, ...(card.bullets || []))
    })
  }

  if (content.headline) {
    texts.push(content.headline.main, content.headline.accent)
  }

  if (content.badge) {
    texts.push(content.badge.text)
  }

  // Fallback: stringify and clean
  if (texts.length === 0) {
    texts.push(JSON.stringify(content).replace(/[{}":\[\]]/g, ' '))
  }

  return texts.filter(Boolean).join(' ')
}

function inferSimpleContext(componentName: string, content: string, intent?: string): string[] {
  const contexts = []

  if (componentName.includes('CTA')) contexts.push('conversion')
  if (componentName.includes('Hero')) contexts.push('value_proposition')
  if (componentName.includes('News')) contexts.push('urgency')

  if (intent) contexts.push(`intent_${intent}`)

  const text = content.toLowerCase()
  if (text.includes('automation') || text.includes('ai')) contexts.push('ai_automation')
  if (text.includes('team') || text.includes('join')) contexts.push('recruitment')

  return contexts
}
