// {CONFIG}: Outline your process features and step-by-step flow
import type { ProcessFeature, ProcessStep } from '#types';

export const features = [
  {
    title: '⚠️ Feature headline',
    description: '⚠️ What this feature provides and why it matters',
    icon: 'i-lucide-rocket',
  },
] satisfies ProcessFeature[];

export const flow = [
  {
    slot: 'step-1',
    title: '⚠️ First step name',
    description: '⚠️ What happens in this step',
    duration: '⚠️ Time estimate',

    actions: [
      {
        task: '⚠️ Specific action to take',
        estimated_time: '⚠️ Time estimate',
      },
      {
        task: '⚠️ Specific action to take',
        estimated_time: '⚠️ Time estimate',
      },
      {
        task: '⚠️ Specific action to take',
        estimated_time: '⚠️ Time estimate',
      },
    ],

    content: [
      {
        type: 'text',
        value: `⚠️ **Start with a text block here.**:

  - This can uses the MDC component so write in markdown
  - Use this for an overview of each step
  - Later you can change the 'type' property to image or video if it suites your usecase
  `,
      },
    ],
  },
] satisfies ProcessStep[];
