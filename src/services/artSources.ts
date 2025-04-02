import { Artwork } from '../types';

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

interface MetArtwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  dimensions: string;
  primaryImage: string;
  GalleryNumber: string;
}

export async function fetchMetArtworks(page = 1, limit = 100): Promise<Artwork[]> {
  try {
    // First get a list of object IDs
    const response = await fetch(`${MET_BASE_URL}/search?hasImages=true&q=painting&medium=Paintings`);
    const data = await response.json();
    const objectIDs = data.objectIDs.slice((page - 1) * limit, page * limit);

    // Then fetch details for each object
    const artworkPromises = objectIDs.map(async (id: number) => {
      const detailResponse = await fetch(`${MET_BASE_URL}/objects/${id}`);
      const artwork: MetArtwork = await detailResponse.json();

      if (!artwork.primaryImage) return null;

      return {
        id: `met_${artwork.objectID}`,
        title: artwork.title || 'Untitled',
        artist: artwork.artistDisplayName || 'Unknown Artist',
        date: artwork.objectDate || 'Date Unknown',
        description: `${artwork.medium || 'Mixed media'}. ${artwork.GalleryNumber ? `Located in Gallery ${artwork.GalleryNumber}.` : ''}`,
        imageUrl: artwork.primaryImage,
        location: 'New York, USA',
        museum: 'The Metropolitan Museum of Art',
        dimensions: artwork.dimensions || 'Dimensions unknown',
        likes: Math.floor(Math.random() * 15000) + 5000
      } as const;
    });

    const artworks = await Promise.all(artworkPromises);
    return artworks.filter((artwork): artwork is Artwork => artwork !== null);
  } catch (error) {
    console.error('Error fetching MET artworks:', error);
    return [];
  }
}

// This function will help us fetch artworks in batches
export async function fetchAllArtworks(targetCount: number = 10000): Promise<Artwork[]> {
  const allArtworks: Artwork[] = [];
  let page = 1;
  const batchSize = 100;

  while (allArtworks.length < targetCount) {
    const newArtworks = await fetchMetArtworks(page, batchSize);
    if (newArtworks.length === 0) break;
    
    allArtworks.push(...newArtworks);
    page++;

    // Add a small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return allArtworks.slice(0, targetCount);
}
