'use client';

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
import { MoreHorizontal, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Workout } from '@/types';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemo } from 'react';

export default function WorkoutsPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const workoutsQuery = useMemo(() => {
        if (!user) return null;
        return query(collection(firestore, 'users', user.uid, 'workouts'), orderBy('date', 'desc'));
    }, [user, firestore]);

    const { data: workouts, loading } = useCollection<Workout>(workoutsQuery);

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
            {loading ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center">
                        <div className="flex justify-center items-center p-8">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    </TableCell>
                </TableRow>
            ) : workouts && workouts.length > 0 ? (
                workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell className="font-medium">{workout.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{workout.exercises.length} exercises</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{workout.duration || 'N/A'} min</TableCell>
                <TableCell className="hidden md:table-cell">
                  {workout.date ? new Date(workout.date.seconds * 1000).toLocaleDateString() : 'No date'}
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
            ))
        ) : (
            <TableRow>
                <TableCell colSpan={5} className="text-center">
                    <div className="p-8">
                        <p className="mb-2">No workouts found.</p>
                        <Button asChild>
                            <Link href="/dashboard/workouts/new">Log your first workout</Link>
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
