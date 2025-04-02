import React, { useState, useEffect } from 'react';
import { ArtworkCard } from './ArtworkCard';
import type { Artwork } from '../types';
import { loadMoreArtworks } from '../data/artworks';

interface DiscoverPageProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onLike: (artwork: Artwork) => void;
  onShare: (artwork: Artwork) => void;
  likedArtworks: Set<string>;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({ 
  artworks: initialArtworks, 
  onArtworkClick,
  onLike,
  onShare,
  likedArtworks 
}) => {
  const [randomizedArtworks, setRandomizedArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadInitialArtworks = async () => {
      setLoading(true);
      try {
        // Start with initial artworks shuffled
        const shuffled = [...initialArtworks].sort(() => Math.random() - 0.5);
        setRandomizedArtworks(shuffled);
        
        // Load more artworks in the background
        const loadedArtworks = await loadMoreArtworks(100);
        // Update randomized artworks with the full set
        setRandomizedArtworks(loadedArtworks.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error('Error loading artworks:', error);
      }
      setLoading(false);
    };

    loadInitialArtworks();
  }, [initialArtworks]);

  const handleLoadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    setPage(prev => prev + 1);
    
    try {
      // Load 20 new artworks each time
      const loadedArtworks = await loadMoreArtworks(20 * page);
      const newArtworks = loadedArtworks.slice(-20); // Get only the new ones
      
      setRandomizedArtworks(prev => {
        // Combine previous artworks with new ones
        const combined = [...prev, ...newArtworks];
        // Ensure no duplicates by ID
        const unique = Array.from(new Map(combined.map(art => [art.id, art])).values());
        // Randomize the order
        return unique.sort(() => Math.random() - 0.5);
      });
    } catch (error) {
      console.error('Error loading more artworks:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Discover Masterpieces</h1>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {randomizedArtworks.map((artwork) => (
          <div 
            key={artwork.id}
            className={`${loading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
          >
            <div className="space-y-2">
              <ArtworkCard
                artwork={artwork}
                variant="small"
                onClick={() => onArtworkClick(artwork)}
                onLike={() => onLike(artwork)}
                onShare={() => onShare(artwork)}
                isLiked={likedArtworks.has(artwork.id)}
              />
              <div className="p-2">
                <h3 className="font-serif text-lg truncate">{artwork.title}</h3>
                <p className="text-gray-400 text-sm">{artwork.artist}, {artwork.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <button
        onClick={handleLoadMore}
        className="w-full py-4 mt-8 text-center text-blue-500 hover:text-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load More Artworks'}
      </button>
    </div>
  );
};