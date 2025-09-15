// shared/utils/theme.ts
export type ExtractVariants<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: T[K] extends Record<string | number, any>
        ? keyof T[K] extends string
          ? keyof T[K] extends 'true' | 'false'
            ? boolean // Convert "true"/"false" keys to boolean type
            : keyof T[K]
          : keyof T[K]
        : keyof T[K];
    }
  : never;

export type ExtractSlots<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: string | string[];
    }
  : never;
