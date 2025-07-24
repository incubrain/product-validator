// plugins/mermaid.client.ts
import mermaid from 'mermaid'
import type { Mermaid } from 'mermaid'

declare module '#app' {
  interface NuxtApp {
    $mermaid: Mermaid | undefined
  }
}

export default defineNuxtPlugin(() => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark', // Hardcode for now
  })

  return {
    provide: {
      mermaid: mermaid as Mermaid | undefined,
    },
  }
})
