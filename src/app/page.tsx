"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/stylebg/1200/1800"
          alt="StyleAI Background"
          fill
          className="object-cover opacity-40 blur-[2px]"
          priority
          data-ai-hint="fashion background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tighter text-foreground font-headline">
            STYLE<span className="text-primary">AI</span>
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Your personal digital closet and AI fashion consultant.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-12">
          <Button asChild className="h-14 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
            <Link href="/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="h-14 text-lg font-medium text-foreground hover:bg-white/5">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-xs text-muted-foreground opacity-50 uppercase tracking-[0.2em]">
        High Fashion meets AI Intelligence
      </div>
    </div>
  );
}
