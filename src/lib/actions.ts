'use server';

import { getExerciseSuggestions } from '@/ai/flows/get-exercise-suggestions';
import { z } from 'zod';

const GetExerciseSuggestionsInputSchema = z.object({
  fitnessGoal: z.string(),
  currentWorkoutPlan: z.string(),
  experienceLevel: z.string(),
  availableEquipment: z.string(),
  timePerWorkout: z.string(),
});

type SuggestionsState = {
  success: boolean;
  error?: string;
  data?: any;
}

export async function getSuggestions(prevState: SuggestionsState, formData: FormData): Promise<SuggestionsState> {
    const rawFormData = {
        fitnessGoal: formData.get('fitnessGoal'),
        currentWorkoutPlan: formData.get('currentWorkoutPlan'),
        experienceLevel: formData.get('experienceLevel'),
        availableEquipment: formData.get('availableEquipment'),
        timePerWorkout: formData.get('timePerWorkout'),
    }

  const parsedInput = GetExerciseSuggestionsInputSchema.safeParse(rawFormData);

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
