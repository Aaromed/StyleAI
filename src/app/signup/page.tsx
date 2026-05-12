"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-8 pt-20 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-primary">Join StyleAI</h1>
        <p className="text-muted-foreground">The future of personal style is here.</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Alexander McQueen" 
              className="h-12 bg-muted/50 border-none rounded-xl"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="style@example.com" 
              className="h-12 bg-muted/50 border-none rounded-xl"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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
          {isLoading ? "Creating Profile..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-center space-y-4 pt-8">
        <p className="text-xs text-muted-foreground leading-relaxed px-8">
          By signing up, you agree to our <span className="text-foreground font-medium underline">Terms of Service</span> and <span className="text-foreground font-medium underline">Privacy Policy</span>.
        </p>
        <p className="text-sm text-muted-foreground mt-4">Already a member?</p>
        <Button asChild variant="ghost" className="w-full h-12 text-primary font-bold hover:bg-primary/5">
          <Link href="/login">Log In Instead</Link>
        </Button>
      </div>
    </div>
  );
}
