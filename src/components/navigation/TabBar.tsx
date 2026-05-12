"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Shirt, Cloud, User, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Outfits', icon: Home },
  { href: '/wardrobe', label: 'Wardrobe', icon: Shirt },
  { href: '/upload', label: 'Add', icon: PlusCircle, isCenter: true },
  { href: '/weather', label: 'Weather', icon: Cloud },
  { href: '/profile', label: 'Profile', icon: User },
];

export function TabBar() {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/login' || pathname === '/signup') return null;

  return (
    <nav className="tab-bar px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-300",
              item.isCenter ? "relative -top-4" : "flex-1",
              isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "p-2 rounded-full transition-all duration-300",
              item.isCenter && "bg-primary text-primary-foreground shadow-lg shadow-primary/30 p-4",
              isActive && !item.isCenter && "bg-primary/10"
            )}>
              <Icon className={cn(item.isCenter ? "h-7 w-7" : "h-6 w-6")} />
            </div>
            {!item.isCenter && (
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
