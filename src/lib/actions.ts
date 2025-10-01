'use server';

import { getExerciseSuggestions, GetExerciseSuggestionsInput } from '@/ai/flows/get-exercise-suggestions';
import { z } from 'zod';

const GetExerciseSuggestionsInputSchema = z.object({
  fitnessGoal: z.string(),
  currentWorkoutPlan: z.string(),
  experienceLevel: z.string(),
  availableEquipment: z.string(),
  timePerWorkout: z.string(),
});

export async function getSuggestions(input: GetExerciseSuggestionsInput) {
  const parsedInput = GetExerciseSuggestionsInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const result = await getExerciseSuggestions(parsedInput.data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { success: false, error: 'Failed to get suggestions from AI. Please try again later.' };
  }
}
