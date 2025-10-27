import type { ProcessFeature, ProcessStep } from '#types';

/**
 * {CONFIG}: PROCESS & VALIDATION STEPS
 *
 * 4-stage validation journey mapped to validation stages:
 * 1. Attention - Drive traffic & capture attention
 * 2. Conversion - Convert visitors to leads
 * 3. Engagement - Keep customers engaged
 * 4. Demand - Validate payment intent
 *
 * Each step includes:
 * - Title & description (stage overview)
 * - Metric with thresholds (validation criteria)
 */

export const features = [
  {
    title: '⚠️ Feature 1',
    description: '⚠️ Feature description',
    icon: 'i-lucide-rocket',
  },
  {
    title: '⚠️ Feature 2',
    description: '⚠️ Feature description',
    icon: 'i-lucide-target',
  },
  {
    title: '⚠️ Feature 3',
    description: '⚠️ Feature description',
    icon: 'i-lucide-bar-chart-3',
  },
] satisfies ProcessFeature[];

export const processSteps = [
  {
    id: 'step-1-attention',
    title: '⚠️ Stage 1: Title',
    duration: '⚠️ Time estimate',
    description: '⚠️ What are you validating in this stage?',
    card: {
      title: '⚠️ Metric Name',
      description: '⚠️ What this metric measures',
      icon: 'i-lucide-target',
      thresholds: {
        weak: {
          range: '⚠️ <X',
          meaning: '⚠️ What weak signal means → Action needed',
        },
        average: {
          range: '⚠️ X-Y',
          meaning: '⚠️ What average signal means → Next step',
        },
        strong: {
          range: '⚠️ >Y',
          meaning: '⚠️ What strong signal means → Validated',
        },
      },
    },
  },
  {
    id: 'step-2-conversion',
    title: '⚠️ Stage 2: Title',
    duration: '⚠️ Time estimate',
    description: '⚠️ What are you validating in this stage?',
    card: {
      title: '⚠️ Metric Name',
      description: '⚠️ What this metric measures',
      icon: 'i-lucide-mail',
      thresholds: {
        weak: {
          range: '⚠️ <X%',
          meaning: '⚠️ What weak signal means → Action needed',
        },
        average: {
          range: '⚠️ X-Y%',
          meaning: '⚠️ What average signal means → Next step',
        },
        strong: {
          range: '⚠️ >Y%',
          meaning: '⚠️ What strong signal means → Validated',
        },
      },
    },
  },
  {
    id: 'step-3-engagement',
    title: '⚠️ Stage 3: Title',
    duration: '⚠️ Time estimate',
    description: '⚠️ What are you validating in this stage?',
    card: {
      title: '⚠️ Metric Name',
      description: '⚠️ What this metric measures',
      icon: 'i-lucide-check-circle',
      thresholds: {
        weak: {
          range: '⚠️ <X%',
          meaning: '⚠️ What weak signal means → Action needed',
        },
        average: {
          range: '⚠️ X-Y%',
          meaning: '⚠️ What average signal means → Next step',
        },
        strong: {
          range: '⚠️ >Y%',
          meaning: '⚠️ What strong signal means → Validated',
        },
      },
    },
  },
  {
    id: 'step-4-demand',
    title: '⚠️ Stage 4: Title',
    duration: '⚠️ Time estimate',
    description: '⚠️ What are you validating in this stage?',
    card: {
      title: '⚠️ Metric Name',
      description: '⚠️ What this metric measures',
      icon: 'i-lucide-trending-up',
      thresholds: {
        weak: {
          range: '⚠️ <X%',
          meaning: '⚠️ What weak signal means → Action needed',
        },
        average: {
          range: '⚠️ X-Y%',
          meaning: '⚠️ What average signal means → Next step',
        },
        strong: {
          range: '⚠️ >Y%',
          meaning: '⚠️ What strong signal means → Validated',
        },
      },
    },
  },
] satisfies ProcessStep[];