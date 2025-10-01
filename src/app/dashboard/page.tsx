import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dumbbell, PlusCircle, Activity, Target } from 'lucide-react';

const recentWorkouts = [
  { id: 1, name: 'Full Body Strength', date: 'Yesterday' },
  { id: 2, name: 'Morning Cardio', date: '3 days ago' },
  { id: 3, name: 'Leg Day', date: '5 days ago' },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500 kg</div>
            <p className="text-xs text-muted-foreground">Total weight lifted this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Build Muscle</div>
            <p className="text-xs text-muted-foreground">75% progress to next level</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of your most recent workouts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentWorkouts.map((workout) => (
                <li key={workout.id} className="flex items-center gap-4">
                  <div className="p-2 bg-secondary rounded-md">
                    <Dumbbell className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{workout.name}</p>
                    <p className="text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/workouts">View</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/workouts">View All Workouts</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center justify-center text-center p-6 bg-primary/5">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <PlusCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>Start a New Workout</CardTitle>
            <CardDescription>
              Ready to sweat? Log your next session now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild>
              <Link href="/dashboard/workouts/new">Log Workout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
