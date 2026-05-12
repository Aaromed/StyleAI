"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-8 pt-20 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-headline">Welcome Back</h1>
        <p className="text-muted-foreground">Log in to your fashion hub.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="vogue@example.com" 
              className="h-12 bg-muted/50 border-none rounded-xl"
              required 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary font-medium">Forgot?</Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="h-12 bg-muted/50 border-none rounded-xl"
              required 
            />
          </div>
        </div>

        <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-bold text-lg" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Log In"}
        </Button>
      </form>

      <div className="text-center space-y-4 pt-12">
        <p className="text-sm text-muted-foreground">Don't have an account?</p>
        <Button asChild variant="outline" className="w-full h-14 border-muted hover:bg-white/5 rounded-2xl font-semibold">
          <Link href="/signup">Create New Account</Link>
        </Button>
      </div>
    </div>
  );
}
