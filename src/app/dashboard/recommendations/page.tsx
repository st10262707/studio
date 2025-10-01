'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Bot, Check, Dumbbell, Loader2 } from 'lucide-react';
import { getSuggestions } from '@/lib/actions';
import { GetExerciseSuggestionsOutput } from '@/ai/flows/get-exercise-suggestions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const recommendationsFormSchema = z.object({
  fitnessGoal: z.string().min(1, 'Please select a fitness goal.'),
  experienceLevel: z.string().min(1, 'Please select your experience level.'),
  timePerWorkout: z.string().min(2, 'Please enter your available time.'),
  availableEquipment: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  currentWorkoutPlan: z.string().optional(),
});

type RecommendationsFormValues = z.infer<typeof recommendationsFormSchema>;

const equipmentItems = [
  { id: 'full-gym', label: 'Full Gym Access' },
  { id: 'dumbbells', label: 'Dumbbells' },
  { id: 'barbell', label: 'Barbell' },
  { id: 'resistance-bands', label: 'Resistance Bands' },
  { id: 'bodyweight', label: 'Bodyweight Only' },
];

type State = {
  success: boolean;
  error?: string;
  data?: GetExerciseSuggestionsOutput;
} | null;

export default function RecommendationsPage() {
  const [state, formAction] = useFormState<State, FormData>(getSuggestions, null);

  const form = useForm<RecommendationsFormValues>({
    resolver: zodResolver(recommendationsFormSchema),
    defaultValues: {
      fitnessGoal: 'muscle-gain',
      experienceLevel: 'intermediate',
      timePerWorkout: '60 minutes',
      availableEquipment: ['full-gym'],
      currentWorkoutPlan: 'I do a Push/Pull/Legs split, 4 times a week.',
    },
  });

  const onSubmit = (data: RecommendationsFormValues) => {
    const formData = new FormData();
    formData.append('fitnessGoal', data.fitnessGoal);
    formData.append('experienceLevel', data.experienceLevel);
    formData.append('timePerWorkout', data.timePerWorkout);
    formData.append('availableEquipment', data.availableEquipment.join(', '));
    formData.append('currentWorkoutPlan', data.currentWorkoutPlan || '');
    formAction(formData);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Exercise Coach</CardTitle>
          <CardDescription>
            Tell us about yourself and we&apos;ll suggest some exercises.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="fitnessGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Fitness Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="endurance">Endurance</SelectItem>
                        <SelectItem value="general-fitness">General Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timePerWorkout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Per Workout</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 60 minutes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableEquipment"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Available Equipment</FormLabel>
                      <FormDescription>
                        Select all that apply.
                      </FormDescription>
                    </div>
                    {equipmentItems.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="availableEquipment"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentWorkoutPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Plan (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your current routine..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The more details you provide, the better the recommendations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Suggestions
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Recommendations</CardTitle>
          <CardDescription>
            Here are some exercises tailored for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {form.formState.isSubmitting ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Bot className="h-12 w-12 text-primary animate-bounce" />
                <p className="mt-4 text-muted-foreground">Our AI Coach is thinking...</p>
            </div>
          ) : state?.success && state.data ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Suggested Exercises:</h3>
                <ul className="space-y-2">
                  {state.data.suggestedExercises.map((exercise, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-primary" />
                      <span>{exercise}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Why These Work For You:</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{state.data.explanation}</p>
              </div>
            </div>
          ) : state?.error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Check className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                    Your recommendations will appear here.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
