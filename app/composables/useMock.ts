// composables/useMock.ts
export const useMock = () => {
  // ✅ LOREM GENERATOR
  const loremWords = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ]

  const generateLorem = (wordCount: number): string => {
    const words = Array.from({ length: wordCount }, (_, i) => 
      loremWords[i % loremWords.length]
    )
    return words.join(' ') + '.'
  }

  // ✅ HEADING GENERATORS
  const headingWords = [
    'Amazing', 'Powerful', 'Simple', 'Modern', 'Advanced', 'Beautiful', 'Elegant',
    'Smart', 'Fast', 'Reliable', 'Innovative', 'Creative', 'Professional',
    'Product', 'Solution', 'Platform', 'System', 'Framework', 'Tool', 'Service',
    'Experience', 'Interface', 'Design', 'Dashboard', 'Application', 'Website'
  ]

  const generateHeading = (wordCount: number = 3): string => {
    const words = Array.from({ length: wordCount }, () => 
      headingWords[Math.floor(Math.random() * headingWords.length)]
    )
    return words.join(' ')
  }

  // ✅ SMART TEXT PROCESSOR - handles both lorem and heading patterns
  const processMockText = (text?: string): string | undefined => {
    if (!text) return undefined

    // Lorem pattern: lorem, lorem-50, lorem_short, etc.
    const loremPattern = /^lorem[-_\s]?(\d+|short|long)?$/i
    const loremMatch = text.match(loremPattern)
    
    if (loremMatch) {
      const modifier = loremMatch[1]?.toLowerCase()
      
      if (modifier === 'short') return generateLorem(20)
      if (modifier === 'long') return generateLorem(100)
      
      if (modifier && /^\d+$/.test(modifier)) {
        const count = parseInt(modifier, 10)
        return generateLorem(Math.max(1, Math.min(1000, count)))
      }
      
      return generateLorem(50) // Default
    }

    // Heading pattern: heading, heading-2, heading_short, etc.
    const headingPattern = /^heading[-_\s]?(\d+|short|long)?$/i
    const headingMatch = text.match(headingPattern)
    
    if (headingMatch) {
      const modifier = headingMatch[1]?.toLowerCase()
      
      if (modifier === 'short') return generateHeading(2)
      if (modifier === 'long') return generateHeading(5)
      
      if (modifier && /^\d+$/.test(modifier)) {
        const count = parseInt(modifier, 10)
        return generateHeading(Math.max(1, Math.min(10, count)))
      }
      
      return generateHeading(3) // Default
    }

    // Return original text if no patterns match
    return text
  }

  return {
    // Core generators
    generateLorem,
    generateHeading,
    
    // Smart processor
    processMockText,
    
    // Direct access to word arrays (for extensions)
    loremWords,
    headingWords,
  }
}