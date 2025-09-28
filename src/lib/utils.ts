import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**Luxury, elegant, timeless interiors with premium materials and golden accents.

Cozy, warm, rustic interiors with natural wood textures and soft ambient lighting.

Futuristic, sleek, high-tech interiors with neon accents and bold geometry.

Scandinavian, bright, airy interiors with clean lines and neutral tones.

Industrial, raw, edgy interiors with exposed brick, steel, and concrete.

Traditional, rich, classic interiors with ornate detailing and balanced symmetry.

Bohemian, colorful, eclectic interiors with layered textures and vibrant patterns.

Japandi, minimalist, nature-inspired interiors with earthy palettes and organic shapes.

Mediterranean, sunlit, breezy interiors with stone textures and soft curves.

Contemporary, dynamic, functional interiors with open spaces and modern furniture. */