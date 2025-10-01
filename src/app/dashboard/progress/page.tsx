'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const weeklyVolumeData = [
  { week: 'Week 1', volume: 12500 },
  { week: 'Week 2', volume: 13200 },
  { week: 'Week 3', volume: 11800 },
  { week: 'Week 4', volume: 14500 },
  { week: 'This Week', volume: 8900 },
];

const chartConfig: ChartConfig = {
  volume: {
    label: 'Volume (kg)',
    color: 'hsl(var(--primary))',
  },
  weight: {
    label: 'Weight (kg)',
    color: 'hsl(var(--accent))',
  },
};

const benchPressProgress = [
    { date: 'Jan', weight: 80 },
    { date: 'Feb', weight: 82.5 },
    { date: 'Mar', weight: 85 },
    { date: 'Apr', weight: 85 },
    { date: 'May', weight: 87.5 },
    { date: 'Jun', weight: 90 },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold font-headline">Your Progress</h1>
                <p className="text-muted-foreground">
                    Visualize your hard work and achievements over time.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                </Button>
            </div>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Workout Volume</CardTitle>
          <CardDescription>
            Total weight lifted per week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={weeklyVolumeData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(value) => `${value / 1000}k kg`}
               />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <Bar dataKey="volume" fill="var(--color-volume)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bench Press 1-Rep Max (Est.)</CardTitle>
          <CardDescription>
            Estimated one-rep max progress for a key lift.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <LineChart accessibilityLayer data={benchPressProgress}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(value) => `${value} kg`}
               />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="var(--color-weight)"
                strokeWidth={3}
                dot={{
                  fill: 'var(--color-weight)',
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
