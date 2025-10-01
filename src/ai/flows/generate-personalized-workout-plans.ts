'use server';

/**
 * @fileOverview Generates personalized workout plans based on user fitness goals, progress, and past workout data.
 *
 * - generatePersonalizedWorkoutPlan - A function that generates a personalized workout plan.
 * - GeneratePersonalizedWorkoutPlanInput - The input type for the generatePersonalizedWorkoutPlan function.
 * - GeneratePersonalizedWorkoutPlanOutput - The return type for the generatePersonalizedWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedWorkoutPlanInputSchema = z.object({
  fitnessGoals: z.string().describe('The fitness goals of the user.'),
  currentProgress: z.string().describe('The current progress of the user.'),
  pastWorkoutData: z.string().describe('The past workout data of the user.'),
});

export type GeneratePersonalizedWorkoutPlanInput = z.infer<
  typeof GeneratePersonalizedWorkoutPlanInputSchema
>;

const GeneratePersonalizedWorkoutPlanOutputSchema = z.object({
  workoutPlan: z.string().describe('The personalized workout plan.'),
});

export type GeneratePersonalizedWorkoutPlanOutput = z.infer<
  typeof GeneratePersonalizedWorkoutPlanOutputSchema
>;

export async function generatePersonalizedWorkoutPlan(
  input: GeneratePersonalizedWorkoutPlanInput
): Promise<GeneratePersonalizedWorkoutPlanOutput> {
  return generatePersonalizedWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedWorkoutPlanPrompt',
  input: {schema: GeneratePersonalizedWorkoutPlanInputSchema},
  output: {schema: GeneratePersonalizedWorkoutPlanOutputSchema},
  prompt: `You are a personal fitness trainer who generates personalized workout plans based on the user's fitness goals, current progress, and past workout data.

  Fitness Goals: {{{fitnessGoals}}}
  Current Progress: {{{currentProgress}}}
  Past Workout Data: {{{pastWorkoutData}}}

  Generate a personalized workout plan that will help the user achieve their fitness goals, considering their current progress and past workout data.
  Workout Plan:`,
});

const generatePersonalizedWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedWorkoutPlanFlow',
    inputSchema: GeneratePersonalizedWorkoutPlanInputSchema,
    outputSchema: GeneratePersonalizedWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
