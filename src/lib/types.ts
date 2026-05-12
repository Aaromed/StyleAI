export type ClothingType = 'shirt' | 'pants' | 'shoes' | 'jacket' | 'dress' | 'skirt' | 'outerwear' | 'accessory' | 'sportswear' | 'swimwear' | 'underwear' | 'suit' | 'blazer' | 'hoodie' | 'sweater' | 'vest' | 'shorts' | 'jeans' | 'leggings' | 'jumpsuit' | 'romper' | 'sandal' | 'boot' | 'sneaker' | 'heel' | 'flat' | 'hat' | 'scarf' | 'glove' | 'belt' | 'jewelry' | 'bag' | 'other';

export type ClothingStyle = 'casual' | 'formal' | 'sporty' | 'bohemian' | 'vintage' | 'business-casual' | 'chic' | 'minimalist' | 'streetwear' | 'gothic' | 'preppy' | 'classic' | 'punk' | 'military' | 'western' | 'urban' | 'holiday' | 'lounge' | 'athleisure' | 'glamorous' | 'classic-chic';

export interface WardrobeItem {
  id: string;
  clothingType: ClothingType;
  mainColor: string;
  style: ClothingStyle;
  imageUrl: string;
  createdAt: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  isRaining: boolean;
  city: string;
}
