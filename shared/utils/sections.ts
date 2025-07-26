// utils/sections.ts - GENERIC TYPE-SAFE MAPPING
import type { Section, SectionMap } from '../types/sections'

export const mapSectionsToObject = (sections: Section[]): SectionMap => {
  const sectionMap: SectionMap = {}

  sections.forEach((section, index) => {
    const { type, ...data } = section
    // Add sectionIndex to each section's data
    ;(sectionMap as any)[type] = {
      ...data,
      sectionIndex: index,
    }
  })

  return sectionMap
}

// Keep existing helper functions - they're fine
export const hasSection = (
  sectionMap: SectionMap,
  sectionType: keyof SectionMap,
): boolean => {
  return !!sectionMap[sectionType]
}
