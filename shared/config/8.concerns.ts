// {CONFIG}: Address customer objections and common questions

export const concerns = {
  items: [
    {
      q: '⚠️ Question about time commitment?',
      a: '⚠️ Honest answer about effort required',
      type: 'warning',
    },
    {
      q: '⚠️ Why not use competitor X?',
      a: '⚠️ Your differentiation and trade-offs',
      type: 'objection',
    },
    {
      q: '⚠️ What support is available?',
      a: '⚠️ Your support channels and response times',
      type: 'support',
    },
    {
      q: '⚠️ General question about your product?',
      a: '⚠️ Clear factual answer',
      type: 'general',
    },
  ],
} satisfies ConcernsConfig;
