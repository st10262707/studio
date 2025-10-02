import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Share2, BarChart3, Bot, CheckCircle } from 'lucide-react';
import Logo from '@/components/logo';

const features = [
  {
    icon: <Dumbbell className="w-8 h-8 text-primary" />,
    title: 'Workout Tracking',
    description: 'Log your workouts with exercises, sets, reps, and weight. Keep track of your every move.',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: 'Progress Visualization',
    description: 'See your progress with intuitive charts and graphs. Understand your journey better.',
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'Personalized Recommendations',
    description: 'Get AI-powered exercise and routine suggestions tailored to your goals and progress.',
  },
  {
    icon: <Share2 className="w-8 h-8 text-primary" />,
    title: 'Social Sharing',
    description: 'Share your achievements and milestones with your friends and keep each other motivated.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-24 md:py-32 lg:py-40 text-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/hero/1920/1080"
              alt="Man working out"
              data-ai-hint="fitness workout"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
              Transform Your Fitness Journey
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
              FlowState helps you track workouts, visualize progress, and get
              AI-powered recommendations to achieve your goals faster.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Start Your Free Trial</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                Everything You Need to Succeed
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                FlowState is packed with features to help you stay motivated
                and on track.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-28 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                Ready to take control of your fitness?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of users who are already transforming their lives with FlowState.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/register">Sign Up Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
          <Logo />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FlowState. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
