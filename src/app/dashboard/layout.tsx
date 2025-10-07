'use client';

import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import SidebarNav from '@/components/dashboard/sidebar-nav';
import Logo from '@/components/logo';
import BottomNav from '@/components/dashboard/bottom-nav';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import MusicPlayer from '@/components/dashboard/music-player';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/login');
  };
  
  if (loading || !user) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="md:grid md:grid-cols-[auto_1fr]">
        <div className="hidden md:block">
          <Sidebar>
            <SidebarHeader>
              <Logo />
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || "https://picsum.photos/seed/avatar1/100/100"} data-ai-hint="person portrait" />
                  <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <p className="text-sm font-medium truncate">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
        </div>
        <main className="flex-1 flex flex-col h-screen">
            <header className="flex h-14 items-center gap-4 border-b bg-background/50 px-6 sticky top-0 z-10 backdrop-blur-sm md:hidden">
                <Logo />
                <div className="flex-1">
                </div>
                <Button asChild>
                    <Link href="/dashboard/workouts/new">Log Workout</Link>
                </Button>
            </header>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-40 md:pb-6">
            {children}
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur-sm md:relative md:z-auto md:border-0 md:bg-transparent md:backdrop-blur-none md:p-6 md:pt-0">
             <MusicPlayer />
          </div>
          <BottomNav />
        </main>
      </div>
    </SidebarProvider>
  );
}
