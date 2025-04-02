import { Artwork } from '../types';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomArtworks(artworks: Artwork[], count: number, exclude?: Artwork): Artwork[] {
  const availableArtworks = exclude 
    ? artworks.filter(art => art.id !== exclude.id)
    : artworks;
  
  return shuffleArray(availableArtworks).slice(0, count);
}

// Cache for daily artwork to prevent re-calculation
let dailyArtworkCache: {
  date: string;
  artwork: Artwork;
} | null = null;

export function getDailyArtwork(artworks: Artwork[]): Artwork {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format

  // Return cached artwork if it's from today
  if (dailyArtworkCache && dailyArtworkCache.date === dateStr) {
    return dailyArtworkCache.artwork;
  }

  // Calculate day of year (1-366)
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / 86400000);
  
  // Use both year and day to ensure different artworks across years
  const seed = today.getFullYear() * 1000 + dayOfYear;
  
  // Use a more sophisticated selection method
  const shuffled = shuffleArray(artworks);
  const selectedIndex = seed % shuffled.length;
  const artwork = shuffled[selectedIndex];

  // Cache the result
  dailyArtworkCache = {
    date: dateStr,
    artwork
  };

  return artwork;
}
