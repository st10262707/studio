import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import SidebarNav from '@/components/dashboard/sidebar-nav';
import Logo from '@/components/logo';
import BottomNav from '@/components/dashboard/bottom-nav';

export const metadata: Metadata = {
  title: 'FlowState Dashboard',
  description: 'Your personal fitness dashboard.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                  <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" data-ai-hint="person portrait" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0" asChild>
                  <Link href="/">
                    <LogOut className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>>
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
          <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
            {children}
          </div>
          <BottomNav />
        </main>
      </div>
    </SidebarProvider>
  );
}
