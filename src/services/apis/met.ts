import { checkImageUrl } from '../../utils/imageProcessor';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

interface MetObject {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  dimensions: string;
  department: string;
  objectURL: string;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  culture: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistNationality: string;
  objectBeginDate: number;
  objectEndDate: number;
  objectWikidata_URL: string;
  repository: string;
  GalleryNumber: string;
}

export interface MetArtwork {
  id: string;
  title: string;
  artist: string;
  date: string;
  description: string;
  movement: string;
  museum: string;
  location: string;
  dimensions: string;
  imageUrl: string;
  thumbnailUrl: string;
  additionalImages: string[];
  sourceUrl: string;
  artistInfo: {
    nationality: string;
    birthYear: string;
    deathYear: string;
  };
}

export const searchMetArtworks = async (query: string): Promise<MetArtwork[]> => {
  try {
    const searchResponse = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&hasImages=true`);
    const searchData = await searchResponse.json();
    
    const objectIds = searchData.objectIDs?.slice(0, 20) || [];
    const artworks = await Promise.all(
      objectIds.map(async (id: number) => {
        try {
          const response = await fetch(`${BASE_URL}/objects/${id}`);
          const data: MetObject = await response.json();
          
          // Skip if no primary image or if image URL is invalid
          if (!data.primaryImage || !(await checkImageUrl(data.primaryImage))) {
            return null;
          }

          return {
            id: data.objectID.toString(),
            title: data.title,
            artist: data.artistDisplayName || 'Unknown Artist',
            date: data.objectDate || 'Date Unknown',
            description: [data.medium, data.culture, data.period, data.dynasty].filter(Boolean).join(', '),
            movement: data.department,
            museum: 'The Metropolitan Museum of Art',
            location: data.GalleryNumber ? `Gallery ${data.GalleryNumber}` : 'Not on view',
            dimensions: data.dimensions,
            imageUrl: data.primaryImage,
            thumbnailUrl: data.primaryImageSmall,
            additionalImages: data.additionalImages,
            sourceUrl: data.objectURL,
            artistInfo: {
              nationality: data.artistNationality || 'Unknown',
              birthYear: data.artistBeginDate || 'Unknown',
              deathYear: data.artistEndDate || 'Unknown'
            }
          };
        } catch {
          return null;
        }
      })
    );

    return artworks.filter((artwork): artwork is MetArtwork => artwork !== null);
  } catch (error) {
    console.error('Error fetching Met artworks:', error);
    return [];
  }
};

export const getRandomMetArtwork = async (): Promise<MetArtwork | null> => {
  try {
    // Get a list of all object IDs with images
    const response = await fetch(`${BASE_URL}/search?hasImages=true&q=*`);
    const data = await response.json();
    
    if (!data.objectIDs?.length) {
      return null;
    }

    // Get a random object ID
    const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
    const randomId = data.objectIDs[randomIndex];

    // Fetch the artwork details
    const objectResponse = await fetch(`${BASE_URL}/objects/${randomId}`);
    const objectData: MetObject = await objectResponse.json();

    // Skip if no primary image or if image URL is invalid
    if (!objectData.primaryImage || !(await checkImageUrl(objectData.primaryImage))) {
      return null;
    }

    return {
      id: objectData.objectID.toString(),
      title: objectData.title,
      artist: objectData.artistDisplayName || 'Unknown Artist',
      date: objectData.objectDate || 'Date Unknown',
      description: [objectData.medium, objectData.culture, objectData.period, objectData.dynasty].filter(Boolean).join(', '),
      movement: objectData.department,
      museum: 'The Metropolitan Museum of Art',
      location: objectData.GalleryNumber ? `Gallery ${objectData.GalleryNumber}` : 'Not on view',
      dimensions: objectData.dimensions,
      imageUrl: objectData.primaryImage,
      thumbnailUrl: objectData.primaryImageSmall,
      additionalImages: objectData.additionalImages,
      sourceUrl: objectData.objectURL,
      artistInfo: {
        nationality: objectData.artistNationality || 'Unknown',
        birthYear: objectData.artistBeginDate || 'Unknown',
        deathYear: objectData.artistEndDate || 'Unknown'
      }
    };
  } catch (error) {
    console.error('Error fetching random Met artwork:', error);
    return null;
  }
};
