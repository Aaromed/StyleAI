"use client"

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { MOCK_WARDROBE } from "@/lib/mock-data";
import { TabBar } from '@/components/navigation/TabBar';
import Link from 'next/link';

const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const items = MOCK_WARDROBE;

  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-headline">My Wardrobe</h1>
          <Link href="/upload" className="h-10 w-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
            <Plus className="h-6 w-6" />
          </Link>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search items..." 
            className="pl-10 bg-muted/30 border-none rounded-full"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Badge 
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={`rounded-full px-4 py-1 text-xs cursor-pointer transition-all ${
                selectedCategory === cat ? "bg-primary text-white" : "text-muted-foreground border-muted-foreground/30"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative space-y-2 animate-in fade-in zoom-in-95 duration-500">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted relative border border-white/5">
              <img 
                src={item.imageUrl} 
                alt={item.clothingType} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 p-1 bg-black/50 backdrop-blur-md rounded-lg">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.mainColor }} />
              </div>
            </div>
            <div className="px-1">
              <p className="text-sm font-semibold capitalize">{item.clothingType}</p>
              <p className="text-xs text-muted-foreground capitalize">{item.style}</p>
            </div>
          </div>
        ))}
      </div>

      <TabBar />
    </div>
  );
}
