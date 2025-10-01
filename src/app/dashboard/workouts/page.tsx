import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Workout } from '@/types';

const workouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Strength',
    date: new Date('2024-07-20'),
    duration: 60,
    exercises: [
      { id: 'e1', name: 'Squats', sets: 3, reps: 10, weight: 100 },
      { id: 'e2', name: 'Bench Press', sets: 3, reps: 8, weight: 80 },
    ],
  },
  {
    id: '2',
    name: 'Morning Cardio',
    date: new Date('2024-07-18'),
    duration: 30,
    exercises: [{ id: 'e3', name: 'Running', sets: 1, reps: 1, weight: 0 }],
  },
  {
    id: '3',
    name: 'Leg Day Annihilation',
    date: new Date('2024-07-16'),
    duration: 75,
    exercises: [
        { id: 'e1', name: 'Squats', sets: 5, reps: 5, weight: 120 },
        { id: 'e4', name: 'Deadlifts', sets: 3, reps: 5, weight: 150 },
    ],
  },
    {
    id: '4',
    name: 'Upper Body Pump',
    date: new Date('2024-07-15'),
    duration: 55,
    exercises: [
        { id: 'e2', name: 'Bench Press', sets: 4, reps: 6, weight: 85 },
        { id: 'e5', name: 'Pull Ups', sets: 4, reps: 8, weight: 0 },
    ],
  },
];

export default function WorkoutsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
        <CardDescription>
          A log of all your completed workouts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workout</TableHead>
              <TableHead>Exercises</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell className="font-medium">{workout.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{workout.exercises.length} exercises</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{workout.duration} min</TableCell>
                <TableCell className="hidden md:table-cell">
                  {workout.date.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
