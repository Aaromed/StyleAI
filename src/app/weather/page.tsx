"use client"

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { TabBar } from '@/components/navigation/TabBar';
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, MapPin, Sparkles, Cpu, Brain } from 'lucide-react';

const hourlyForecast = [
  { time: '10 AM', temp: 24, icon: Sun },
  { time: '11 AM', temp: 25, icon: Sun },
  { time: '12 PM', temp: 26, icon: Cloud },
  { time: '01 PM', temp: 27, icon: Cloud },
  { time: '02 PM', temp: 27, icon: Cloud },
  { time: '03 PM', temp: 25, icon: CloudRain },
];

export default function WeatherPage() {
  const [city, setCity] = useState('Detectando ubicación...');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        setTimeout(() => setCity('Ibagué, Colombia'), 800);
      });
    } else {
      setCity('Ibagué, Colombia (Manual)');
    }
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-8 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/5 via-background to-background">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Atmósfera</h1>
          <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 ai-glow">
            <MapPin className="h-3 w-3 mr-1 animate-bounce" /> {city}
          </div>
        </div>
        <div className="p-2 bg-muted/50 rounded-xl border border-white/5">
          <Cpu className="h-5 w-5 text-primary animate-pulse" />
        </div>
      </header>

      <section className="text-center py-8 space-y-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
        <div className="flex justify-center">
          <div className="p-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full relative ai-glow border border-white/5 shadow-2xl">
            <Sun className="h-24 w-24 text-primary animate-spin-slow" />
            <div className="absolute -top-2 -right-2 p-3 bg-secondary text-secondary-foreground rounded-2xl shadow-xl">
              <Cloud className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="space-y-1 relative">
          <h2 className="text-7xl font-bold tracking-tighter">26°</h2>
          <p className="text-xl text-muted-foreground font-bold uppercase tracking-[0.2em]">Cálido & Húmedo</p>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <Card className="glass-morphism border-white/5 text-center p-4 rounded-3xl hover:border-primary/30 transition-all group">
          <div className="flex flex-col items-center gap-2">
            <Wind className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Viento</span>
            <span className="font-bold text-sm">12km/h</span>
          </div>
        </Card>
        <Card className="glass-morphism border-white/5 text-center p-4 rounded-3xl hover:border-primary/30 transition-all group">
          <div className="flex flex-col items-center gap-2">
            <Droplets className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Humedad</span>
            <span className="font-bold text-sm">65%</span>
          </div>
        </Card>
        <Card className="glass-morphism border-white/5 text-center p-4 rounded-3xl hover:border-primary/30 transition-all group">
          <div className="flex flex-col items-center gap-2">
            <Thermometer className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Sensación</span>
            <span className="font-bold text-sm">28°</span>
          </div>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-headline">Pronóstico Temporal IA</h3>
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {hourlyForecast.map((hour, i) => {
            const Icon = hour.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[85px] p-5 glass-morphism rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{hour.time}</span>
                <Icon className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform" />
                <span className="font-bold text-lg">{hour.temp}°</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-primary/10 border border-primary/20 rounded-[2rem] p-6 relative overflow-hidden group shadow-inner">
        <div className="absolute inset-0 shimmer opacity-5 pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary animate-pulse" />
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Stylist Insight (IA)</h3>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed font-medium">
            Dada la humedad actual en <span className="text-primary font-bold">Ibagué</span>, tu IA recomienda tejidos de lino o algodón. Evita capas oscuras hasta después de las 6:00 PM cuando baje la intensidad solar.
          </p>
        </div>
      </section>

      <TabBar />
    </div>
  );
}
