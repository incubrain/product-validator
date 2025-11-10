// shared/config/process.ts

import type { ProcessStep } from '#types';

/**
 * {CONFIG}: PROCESS & VALIDATION STAGES
 *
 * Define 3-5 stages that guide users through your product's value journey.
 * Each stage should answer: "What does the user accomplish here?"
 *
 * INSTRUCTIONS:
 * 1. Map your customer's journey from discovery to outcome
 * 2. Each stage = one clear milestone they achieve
 * 3. Result = measurable proof they completed this stage
 * 4. Duration = realistic time estimate for completion
 *
 * EXAMPLES:
 * - Fitness app: Setup Profile → Complete First Workout → Build 7-Day Streak
 * - Course platform: Watch Intro → Complete Module 1 → Submit Final Project
 * - SaaS tool: Connect Account → Configure Settings → Generate First Report
 *
 * Start with 3 stages, add more as your process clarifies.
 */

export const productSteps = [
  {
    id: 'stage-1-setup',
    title: 'Stage 1: Initial Setup',
    icon: 'i-lucide-circle-play',
    duration: '5-10 minutes',
    description:
      'User completes account setup and connects necessary integrations. Example: "Connect your Stripe account and set your first product price."',
    result: 'Account configured + first integration connected',
  },
  {
    id: 'stage-2-first-action',
    title: 'Stage 2: First Meaningful Action',
    icon: 'i-lucide-zap',
    duration: '30-60 minutes',
    description:
      'User completes their first core action that delivers immediate value. Example: "Generate your first analytics report and identify one growth opportunity."',
    result: 'First core action completed + immediate value received',
  },
  {
    id: 'stage-3-habit-formation',
    title: 'Stage 3: Habit Formation',
    icon: 'i-lucide-repeat',
    duration: '1-2 weeks',
    description:
      'User repeats core actions enough times to form a habit and see compounding results. Example: "Complete 7 daily check-ins and track week-over-week improvement."',
    result: 'Repeated action 5-7 times + measurable progress shown',
  },
] satisfies ProcessStep[];
