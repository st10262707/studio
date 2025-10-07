'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useFirestore, useUser } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const workoutFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Workout name must be at least 2 characters.',
  }),
  date: z.date({
    required_error: 'A date for the workout is required.',
  }),
  exercises: z.array(
    z.object({
      name: z.string().min(2, 'Exercise name is required.'),
      sets: z.coerce.number().min(1, 'At least 1 set is required.'),
      reps: z.coerce.number().min(1, 'At least 1 rep is required.'),
      weight: z.coerce.number().min(0, 'Weight cannot be negative.'),
    })
  ).min(1, 'Add at least one exercise.'),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

export default function NewWorkoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      exercises: [{ name: '', sets: 1, reps: 1, weight: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'exercises',
  });

  async function onSubmit(data: WorkoutFormValues) {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'You must be logged in to save a workout.'
        });
        return;
    }
    try {
        const workoutData = {
            ...data,
            duration: 0, // This can be calculated or manually entered later
        };
        const workoutCollectionRef = collection(firestore, 'users', user.uid, 'workouts');
        addDoc(workoutCollectionRef, workoutData).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: workoutCollectionRef.path,
                operation: 'create',
                requestResourceData: workoutData,
            });
            errorEmitter.emit('permission-error', permissionError);
        })

        toast({
        title: 'Workout Logged!',
        description: `Your workout "${data.name}" has been saved.`,
        });
        router.push('/dashboard/workouts');

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.message || 'Could not save workout.'
        });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log New Workout</CardTitle>
        <CardDescription>
          Fill in the details of your workout session.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Full Body Friday" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Exercises</h3>
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-9 gap-2 items-end p-4 border rounded-lg relative">
                    <FormField
                      control={form.control}
                      name={`exercises.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel>Exercise Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Bench Press" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`exercises.${index}.sets`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Sets</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`exercises.${index}.reps`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Reps</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`exercises.${index}.weight`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
               <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => append({ name: '', sets: 1, reps: 1, weight: 0 })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
              <FormMessage>
                {form.formState.errors.exercises?.message}
              </FormMessage>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Save Workout'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
