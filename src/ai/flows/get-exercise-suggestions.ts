'use server';

/**
 * @fileOverview An AI agent to suggest exercises based on user fitness goals and current workout plan.
 *
 * - getExerciseSuggestions - A function that suggests exercises.
 * - GetExerciseSuggestionsInput - The input type for the getExerciseSuggestions function.
 * - GetExerciseSuggestionsOutput - The return type for the getExerciseSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetExerciseSuggestionsInputSchema = z.object({
  fitnessGoal: z
    .string()
    .describe('The primary fitness goal of the user (e.g., weight loss, muscle gain, endurance).'),
  currentWorkoutPlan: z
    .string()
    .describe('A description of the user\'s current workout plan, including exercises performed and frequency.'),
  experienceLevel: z
    .string()
    .describe("The user's experience level (beginner, intermediate, advanced)."),
  availableEquipment: z
    .string()
    .describe('The equipment that the user has access to (e.g., dumbbells, barbell, resistance bands, gym access).'),
  timePerWorkout: z
    .string()
    .describe('The amount of time the user typically spends on each workout (e.g. 30 minutes, 1 hour, 90 minutes).'),
});
export type GetExerciseSuggestionsInput = z.infer<typeof GetExerciseSuggestionsInputSchema>;

const GetExerciseSuggestionsOutputSchema = z.object({
  suggestedExercises: z
    .array(z.string())
    .describe('A list of suggested exercises relevant to the user\'s fitness goals and workout plan.'),
  explanation: z
    .string()
    .describe('An explanation of why the suggested exercises are suitable for the user.'),
});
export type GetExerciseSuggestionsOutput = z.infer<typeof GetExerciseSuggestionsOutputSchema>;

export async function getExerciseSuggestions(
  input: GetExerciseSuggestionsInput
): Promise<GetExerciseSuggestionsOutput> {
  return getExerciseSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getExerciseSuggestionsPrompt',
  input: {schema: GetExerciseSuggestionsInputSchema},
  output: {schema: GetExerciseSuggestionsOutputSchema},
  prompt: `You are a personal fitness trainer. Suggest exercises based on the user's fitness goals and current workout plan.

Fitness Goal: {{{fitnessGoal}}}
Current Workout Plan: {{{currentWorkoutPlan}}}
Experience Level: {{{experienceLevel}}}
Available Equipment: {{{availableEquipment}}}
Time per workout: {{{timePerWorkout}}}

Suggest exercises that are relevant to the user and explain why they are suitable.`,
});

const getExerciseSuggestionsFlow = ai.defineFlow(
  {
    name: 'getExerciseSuggestionsFlow',
    inputSchema: GetExerciseSuggestionsInputSchema,
    outputSchema: GetExerciseSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
