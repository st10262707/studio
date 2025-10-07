export type Exercise = {
  id?: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type Workout = {
  id: string;
  name: string;
  date: any; // Using any for Firestore Timestamp compatibility
  duration: number; // in minutes
  exercises: Exercise[];
};
