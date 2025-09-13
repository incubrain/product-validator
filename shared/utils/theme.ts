// shared/utils/theme.ts
export type ExtractVariants<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: keyof T[K]
    }
  : never

export type ExtractSlots<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: string | string[]
    }
  : never
