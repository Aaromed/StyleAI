"use client"

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TabBar } from '@/components/navigation/TabBar';
import { User, Bell, Shield, LogOut, ChevronRight, Settings, Palette, Camera, Check, X, Edit2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alexander McQueen",
    style: "Urban Chic Enthusiast",
    avatar: "https://picsum.photos/seed/user1/200/200"
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    toast({
      title: "Perfil Actualizado",
      description: "Tus preferencias de estilo se han sincronizado con la IA.",
    });
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-8 bg-background">
      <header className="flex flex-col items-center pt-8 space-y-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-secondary rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity"></div>
          <Avatar className="h-28 w-28 border-4 border-background relative z-10">
            <AvatarImage src={isEditing ? tempProfile.avatar : profile.avatar} />
            <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 z-20 p-2 bg-primary text-white rounded-full shadow-lg border-2 border-background animate-in zoom-in"
            >
              <Camera className="h-4 w-4" />
            </button>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="text-center w-full max-w-xs space-y-2">
          {isEditing ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-1 text-left">
                <Label className="text-[10px] uppercase tracking-widest opacity-60">Nombre Público</Label>
                <Input 
                  value={tempProfile.name} 
                  onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                  className="bg-muted/50 border-none h-10 rounded-xl"
                />
              </div>
              <div className="space-y-1 text-left">
                <Label className="text-[10px] uppercase tracking-widest opacity-60">Bio de Estilo</Label>
                <Input 
                  value={tempProfile.style} 
                  onChange={(e) => setTempProfile({...tempProfile, style: e.target.value})}
                  className="bg-muted/50 border-none h-10 rounded-xl"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} className="flex-1 bg-primary rounded-xl h-10 font-bold">
                  <Check className="h-4 w-4 mr-2" /> Guardar
                </Button>
                <Button onClick={handleCancel} variant="ghost" className="rounded-xl h-10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold font-headline">{profile.name}</h1>
              <p className="text-sm text-muted-foreground font-medium">{profile.style}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsEditing(true)}
                className="rounded-full px-6 border-muted text-xs h-8 mt-4 hover:bg-primary/10 hover:border-primary/40 transition-all"
              >
                <Edit2 className="h-3 w-3 mr-2" /> Editar Perfil
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="space-y-6">
        <section className="space-y-1">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] px-1 mb-2">Motor de Estilo IA</p>
          <div className="bg-muted/30 rounded-2xl overflow-hidden border border-white/5">
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Palette className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">Preferencia de Estilo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Business Casual</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <Separator className="bg-white/5 mx-4" />
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                  <Settings className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">Configuración de IA</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </section>

        <section className="space-y-1">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] px-1 mb-2">Cuenta & Seguridad</p>
          <div className="bg-muted/30 rounded-2xl overflow-hidden border border-white/5">
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-muted text-muted-foreground">
                  <Bell className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">Notificaciones</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <Separator className="bg-white/5 mx-4" />
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-muted text-muted-foreground">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">Privacidad</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </section>

        <Button asChild variant="ghost" className="w-full h-14 text-destructive hover:bg-destructive/5 rounded-2xl justify-between px-4 group">
          <Link href="/login">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-destructive/10 text-destructive">
                <LogOut className="h-5 w-5" />
              </div>
              <span className="font-bold">Cerrar Sesión</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
          </Link>
        </Button>
      </div>

      <p className="text-[10px] text-center text-muted-foreground opacity-30 pt-4 uppercase tracking-[0.2em]">
        StyleAI v1.1.0 • Motor Optimizado en Ibagué
      </p>

      <TabBar />
    </div>
  );
}
