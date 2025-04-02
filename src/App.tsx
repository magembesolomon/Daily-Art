import React, { useState } from 'react';
import { Palette, Compass, Heart } from 'lucide-react';
import { artworks } from './data/artworks';
import { ArtworkCard } from './components/ArtworkCard';
import { ArtworkModal } from './components/ArtworkModal';
import { DiscoverPage } from './components/DiscoverPage';
import { FavoritesPage } from './components/FavoritesPage';
import type { Artwork } from './types';

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentPage, setCurrentPage] = useState<'daily' | 'discover' | 'favorites'>('daily');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const featuredArtwork = artworks[0];
  const relatedArtworks = artworks.slice(1);

  const handleLike = (artwork: Artwork) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(artwork.id)) {
        newFavorites.delete(artwork.id);
      } else {
        newFavorites.add(artwork.id);
      }
      return newFavorites;
    });
  };

  const handleShare = async (artwork: Artwork) => {
    try {
      const response = await fetch(artwork.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${artwork.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'discover':
        return <DiscoverPage artworks={artworks} onArtworkClick={setSelectedArtwork} />;
      case 'favorites':
        return (
          <FavoritesPage
            artworks={artworks.filter(art => favorites.has(art.id))}
            onArtworkClick={setSelectedArtwork}
          />
        );
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
            <ArtworkCard 
              artwork={featuredArtwork}
              onClick={(artwork) => setSelectedArtwork(artwork)}
              onLike={handleLike}
              onShare={handleShare}
              isLiked={favorites.has(featuredArtwork.id)}
            />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Related Masterpieces</h2>
                <button 
                  className="text-blue-500 text-sm font-medium"
                  onClick={() => setCurrentPage('discover')}
                >
                  See All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedArtworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    variant="small"
                    onClick={(artwork) => setSelectedArtwork(artwork)}
                    onLike={handleLike}
                    onShare={handleShare}
                    isLiked={favorites.has(artwork.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {renderContent()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-4">
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => setCurrentPage('daily')}
            >
              <Palette className={`w-6 h-6 ${currentPage === 'daily' ? 'text-blue-500' : ''}`} />
              <span className="text-xs">DailyArt</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => setCurrentPage('discover')}
            >
              <Compass className={`w-6 h-6 ${currentPage === 'discover' ? 'text-blue-500' : ''}`} />
              <span className="text-xs">Discover</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => setCurrentPage('favorites')}
            >
              <Heart className={`w-6 h-6 ${currentPage === 'favorites' ? 'text-blue-500' : ''}`} />
              <span className="text-xs">Favorites</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Artwork Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onLike={handleLike}
          onShare={handleShare}
          isLiked={favorites.has(selectedArtwork.id)}
        />
      )}
    </div>
  );
}

export default App;