"use client"

import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, MapPin, Sparkles, RefreshCcw, Loader2, Cpu, Shirt, ThermometerSun, BrainCircuit } from "lucide-react";
import { generateOutfitRecommendation } from "@/ai/flows/generate-outfit-recommendation-flow";
import { TabBar } from '@/components/navigation/TabBar';
import { useToast } from "@/hooks/use-toast";
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';

export default function RecommendationsPage() {
  const [recommendation, setRecommendation] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [location, setLocation] = useState({ city: 'Ibagué, Tolima', temp: 26, isRaining: false });
  const { toast } = useToast();
  const db = useFirestore();

  // Detección de ubicación real
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // En una app real usaríamos reverse geocoding aquí
        // Por ahora confirmamos que el usuario está en su zona
        setLocation(prev => ({ ...prev, city: 'Ibagué (Localizado)' }));
      });
    }
  }, []);

  // Consulta real de Firestore
  const wardrobeQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'wardrobe'), orderBy('createdAt', 'desc'), limit(30));
  }, [db]);

  const { data: wardrobeItems, loading: loadingWardrobe } = useCollection(wardrobeQuery);

  const getRecommendations = async () => {
    if (!wardrobeItems || wardrobeItems.length === 0) {
      toast({
        title: "Motor de IA en espera",
        description: "Necesito al menos una prenda en tu armario para procesar el estilo.",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateOutfitRecommendation({
        preferredStyle: 'urban-modern',
        temperatureCelsius: location.temp,
        isRaining: location.isRaining,
        wardrobe: wardrobeItems.map(i => ({
          id: i.id,
          clothingType: i.clothingType,
          mainColor: i.mainColor,
          style: i.style
        }))
      });
      setRecommendation(result.recommendedOutfit);
      toast({
        title: "Análisis Completado",
        description: "He optimizado tu outfit para el clima actual de Ibagué.",
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        variant: "destructive",
        title: "Error de Sincronización",
        description: "No pude conectar con el núcleo de la IA."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (wardrobeItems && wardrobeItems.length > 0 && !recommendation && !isGenerating) {
      getRecommendations();
    }
  }, [wardrobeItems]);

  return (
    <div className="min-h-screen p-6 space-y-8 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/20 text-primary ai-glow">
            <Cpu className="h-4 w-4 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">IA Style Engine Active</span>
        </div>
        <h1 className="text-3xl font-bold font-headline">Recomendación IA</h1>
        <p className="text-muted-foreground text-sm">Procesando {wardrobeItems?.length || 0} elementos para {location.city}.</p>
      </header>

      {/* Weather Insights con efecto Shimmer */}
      <Card className="glass-morphism border-primary/20 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 shimmer opacity-10 pointer-events-none" />
        <CardContent className="p-5 flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center text-secondary text-xs font-bold">
              <MapPin className="h-3 w-3 mr-1" /> IBAGUÉ, COLOMBIA
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tighter">{location.temp}°C</span>
              <span className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Humedad 68%</span>
            </div>
          </div>
          <div className="text-right">
            <ThermometerSun className="h-8 w-8 text-primary ml-auto mb-1 animate-bounce" />
            <p className="text-[10px] font-bold text-primary uppercase">Condiciones Tropicales</p>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendation Section */}
      <section className="space-y-4 pb-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold font-headline flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" /> Outfit del Día
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={getRecommendations} 
            disabled={isGenerating || loadingWardrobe}
            className="rounded-full bg-white/5 hover:bg-primary/10 border border-white/5"
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          </Button>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative h-28 w-28">
              <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
              <div className="absolute inset-4 rounded-full border-4 border-secondary/10 border-b-secondary animate-spin [animation-duration:3s]" />
              <BrainCircuit className="h-10 w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Analizando Armario...</p>
              <p className="text-[10px] text-muted-foreground mt-1">Calculando coherencia estética para 26°C</p>
            </div>
          </div>
        ) : recommendation ? (
          <div className="grid gap-4">
            {recommendation.map((item: any, idx: number) => {
              const originalItem = wardrobeItems?.find(i => i.id === item.id);
              return (
                <Card key={idx} className="bg-muted/40 border-white/5 overflow-hidden flex hover:border-primary/40 transition-all group animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="w-24 h-24 shrink-0 bg-muted relative">
                    <img 
                      src={originalItem?.imageUrl || 'https://picsum.photos/seed/clothing/100'} 
                      alt={item.clothingType} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest">{item.clothingType}</p>
                        <h4 className="font-bold text-sm capitalize">{item.style} Choice</h4>
                      </div>
                      <div className="h-3 w-3 rounded-full shadow-sm border border-white/40" style={{ backgroundColor: item.mainColor }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 italic leading-relaxed">
                      "{item.reason}"
                    </p>
                  </div>
                </Card>
              );
            })}
            <Button className="w-full h-14 bg-primary text-white font-bold rounded-2xl ai-glow hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
              Confirmar Outfit del Día
            </Button>
          </div>
        ) : (
          <Card className="p-8 text-center border-dashed border-primary/20 bg-primary/5 rounded-[2rem]">
            <Shirt className="h-10 w-10 mx-auto text-primary/40 mb-3" />
            <p className="text-sm text-muted-foreground font-medium">Escanéa tus prendas para que la IA pueda procesar tu estilo según el clima de Ibagué.</p>
            <Button asChild variant="link" className="text-primary text-xs mt-2 font-bold uppercase tracking-widest">
              <a href="/upload">Comenzar Escaneo →</a>
            </Button>
          </Card>
        )}
      </section>

      <TabBar />
    </div>
  );
}
