'use server';
/**
 * @fileOverview Agente de IA que analiza fotos de prendas para identificar tipo, color y estilo.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeClothingItemInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "Foto de la prenda en formato data URI (Base64)."
    ),
  description: z.string().optional().describe('Descripción opcional proporcionada por el usuario.'),
});
export type AnalyzeClothingItemInput = z.infer<typeof AnalyzeClothingItemInputSchema>;

const AnalyzeClothingItemOutputSchema = z.object({
  clothingType: z.string().describe('Tipo de prenda (ej: camiseta, pantalones, zapatos).'),
  mainColor: z.string().describe('Color dominante.'),
  style: z.string().describe('Estilo o vibra (ej: casual, formal, urbano).'),
  confidence: z.number().optional().describe('Nivel de confianza del análisis.'),
});
export type AnalyzeClothingItemOutput = z.infer<typeof AnalyzeClothingItemOutputSchema>;

const analyzeClothingItemPrompt = ai.definePrompt({
  name: 'analyzeClothingItemPrompt',
  input: { schema: AnalyzeClothingItemInputSchema },
  output: { schema: AnalyzeClothingItemOutputSchema },
  prompt: `Actúa como un experto en moda digital. Analiza la siguiente imagen de una prenda de ropa.
  
Identifica:
1. 'clothingType': ¿Qué es exactamente? (Camisa, Jean, Chaqueta, Tenis, etc.)
2. 'mainColor': El color que más resalta.
3. 'style': ¿A qué estilo pertenece? (Urbano, Minimalista, Elegante, Deportivo).

Si el usuario dio una descripción, úsala: {{{description}}}

Foto: {{media url=photoDataUri}}

IMPORTANTE: Responde solo con el objeto JSON solicitado.`,
});

export async function analyzeClothingItem(input: AnalyzeClothingItemInput): Promise<AnalyzeClothingItemOutput> {
  try {
    const { output } = await analyzeClothingItemPrompt(input);
    if (!output) {
      throw new Error('No se pudo procesar la imagen. Asegúrate de que sea una foto clara de una sola prenda.');
    }
    return output;
  } catch (error) {
    console.error('Error in analyzeClothingItem flow:', error);
    throw error;
  }
}
