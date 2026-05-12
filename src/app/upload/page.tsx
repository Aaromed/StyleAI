"use client"

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Loader2, Sparkles, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { analyzeClothingItem } from "@/ai/flows/analyze-clothing-item";
import { TabBar } from '@/components/navigation/TabBar';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const db = useFirestore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setErrorStatus(null);
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Imagen pesada",
          description: "Por favor, usa una foto de menos de 2MB para el análisis IA.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;

    setIsAnalyzing(true);
    setResult(null);
    setErrorStatus(null);

    try {
      const analysis = await analyzeClothingItem({
        photoDataUri: preview,
        description: "Análisis de prenda para armario en zona tropical"
      });
      
      if (analysis) {
        setResult(analysis);
        toast({
          title: "Análisis IA Completado",
          description: `Identificado: ${analysis.clothingType} estilo ${analysis.style}.`,
        });
      }
    } catch (error: any) {
      console.error('Analysis Engine Error:', error);
      setErrorStatus("La IA no pudo procesar esta foto. Prueba con una imagen más iluminada.");
      toast({
        variant: "destructive",
        title: "Fallo de Procesamiento",
        description: "El motor de IA está experimentando alta carga o la imagen no es clara.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (!db || !result || !preview) return;

    setIsSaving(true);
    const data = {
      userId: 'demo-user',
      clothingType: result.clothingType,
      mainColor: result.mainColor,
      style: result.style,
      imageUrl: preview,
      createdAt: Date.now()
    };

    const wardrobeRef = collection(db, 'wardrobe');
    
    addDoc(wardrobeRef, data)
      .then(() => {
        toast({
          title: "Guardado con éxito",
          description: "La prenda ya es parte de tu armario digital.",
        });
        router.push('/dashboard');
      })
      .catch(async (err) => {
        console.error('Error saving item to Firestore:', err);
        const permissionError = new FirestorePermissionError({
          path: wardrobeRef.path,
          operation: 'create',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-background">
      <header className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">IA Style Engine</p>
          <h1 className="text-2xl font-bold font-headline">Nuevo Escaneo</h1>
        </div>
        <div className="p-3 rounded-2xl bg-primary/10 text-primary ai-glow">
          <Camera className="h-5 w-5" />
        </div>
      </header>

      <Card className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all flex flex-col items-center justify-center bg-card/40 backdrop-blur-xl group">
        {preview ? (
          <div className="relative w-full h-full">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <div className="scanning-line" />
                <div className="bg-primary/20 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 border border-primary/30 shadow-2xl">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">IA Analizando...</span>
                </div>
              </div>
            )}
            {!isAnalyzing && !result && (
              <button 
                onClick={() => { setPreview(null); setErrorStatus(null); }} 
                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-muted-foreground p-8 text-center cursor-pointer w-full h-full justify-center" onClick={() => fileInputRef.current?.click()}>
            <div className="p-8 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all scale-110">
              <Upload className="h-10 w-10 text-primary/60" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-foreground">Subir Fotografía</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Sincronización instantánea con IA</p>
            </div>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </Card>

      {errorStatus && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive animate-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-medium">{errorStatus}</p>
        </div>
      )}

      {!result && preview && !isAnalyzing && (
        <Button 
          onClick={handleAnalyze} 
          className="w-full h-16 bg-primary hover:bg-primary/90 font-bold ai-glow rounded-2xl text-lg shadow-lg shadow-primary/20 transition-transform active:scale-95"
        >
          <Sparkles className="mr-2 h-6 w-6" /> Iniciar Análisis IA
        </Button>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-muted/40 rounded-3xl border border-white/5 text-center">
              <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Detección</p>
              <p className="text-xs font-bold capitalize text-primary">{result.clothingType}</p>
            </div>
            <div className="p-4 bg-muted/40 rounded-3xl border border-white/5 text-center">
              <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Color</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full border border-white/20" style={{ backgroundColor: result.mainColor }} />
                <p className="text-xs font-bold capitalize">{result.mainColor}</p>
              </div>
            </div>
            <div className="p-4 bg-muted/40 rounded-3xl border border-white/5 text-center">
              <p className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Vibe</p>
              <p className="text-xs font-bold capitalize text-secondary">{result.style}</p>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full h-16 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold rounded-[2rem] shadow-xl shadow-secondary/20 transition-all active:scale-95"
          >
            {isSaving ? <Loader2 className="h-6 w-6 animate-spin" /> : <CheckCircle2 className="mr-2 h-6 w-6" />}
            Confirmar y Guardar
          </Button>
        </div>
      )}

      <TabBar />
    </div>
  );
}
