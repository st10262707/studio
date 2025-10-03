'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Bot, Dumbbell, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/workouts', label: 'Workouts', icon: Dumbbell },
  { href: '/dashboard/progress', label: 'Progress', icon: BarChart3 },
  { href: '/dashboard/recommendations', label: 'AI Coach', icon: Bot },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex justify-around">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 p-2 text-xs w-full',
              pathname === link.href
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
