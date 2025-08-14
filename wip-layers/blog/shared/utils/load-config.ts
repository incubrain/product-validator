import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'

// Type definitions for our configs
export interface BusinessConfig {
  business: {
    name: string
    tagline: string
    description: string
    legal_name: string
    founder: {
      name: string
      title: string
      bio: string
      credentials: string[]
    }
    location: {
      city: string
      state: string
      country: string
      timezone: string
    }
  }
  contact: {
    email: string
    phone: string
    business_hours: string
    social: {
      github: string
      linkedin: string
      twitter: string
      discord: string
    }
  }
  services: {
    categories: string[]
    specialties: string[]
  }
}

// Cache for loaded configs
const configCache = new Map<string, any>()

/**
 * Load configuration from YAML files in content/config/
 * @param configName - Name of config file (without .yaml extension)
 * @returns Parsed configuration object
 */
export function loadConfig<T = any>(configName: string): T {
  // Check cache first
  if (configCache.has(configName)) {
    return configCache.get(configName)
  }

  try {
    // Resolve path relative to project root
    const configPath = resolve(process.cwd(), `content/config/${configName}.yml`)

    // Read and parse YAML
    const yamlContent = readFileSync(configPath, 'utf8')
    const config = parse(yamlContent)

    // Cache the result
    configCache.set(configName, config.data)

    return config.data as T
  } catch (error) {
    console.error(`Failed to load config: ${configName}`, error)
    throw new Error(`Configuration file not found: content/config/${configName}.yml`)
  }
}

// Typed convenience functions
export const loadBusinessConfig = (): BusinessConfig => loadConfig<BusinessConfig>('business')

// Future config loaders
// export const loadSeoConfig = () => loadConfig('seo')
// export const loadIntegrationsConfig = () => loadConfig('integrations')
