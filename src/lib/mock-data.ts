import { WardrobeItem, WeatherData } from './types';

export const MOCK_WARDROBE: WardrobeItem[] = [
  {
    id: '1',
    clothingType: 'shirt',
    mainColor: 'white',
    style: 'casual',
    imageUrl: 'https://picsum.photos/seed/shirt1/400/400',
    createdAt: Date.now() - 1000000,
  },
  {
    id: '2',
    clothingType: 'jeans',
    mainColor: 'blue',
    style: 'casual',
    imageUrl: 'https://picsum.photos/seed/pants1/400/400',
    createdAt: Date.now() - 2000000,
  },
  {
    id: '3',
    clothingType: 'sneaker',
    mainColor: 'black',
    style: 'sporty',
    imageUrl: 'https://picsum.photos/seed/shoes1/400/400',
    createdAt: Date.now() - 3000000,
  },
  {
    id: '4',
    clothingType: 'jacket',
    mainColor: 'beige',
    style: 'chic',
    imageUrl: 'https://picsum.photos/seed/jacket1/400/400',
    createdAt: Date.now() - 4000000,
  },
];

export const MOCK_WEATHER: WeatherData = {
  temp: 22,
  condition: 'Partly Cloudy',
  isRaining: false,
  city: 'Paris',
};
