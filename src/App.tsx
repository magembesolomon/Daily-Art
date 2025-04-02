import { useState, useEffect } from 'react';
import { Palette, Compass, Heart } from 'lucide-react';
import { artworks, curatedArtworks } from './data/artworks';
import { DailyArtPage } from './components/DailyArtPage';
import { ArtworkCard } from './components/ArtworkCard';
import { ArtworkModal } from './components/ArtworkModal';
import { DiscoverPage } from './components/DiscoverPage';

import type { Artwork } from './types';

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('likedArtworks');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [currentPage, setCurrentPage] = useState<'daily' | 'discover' | 'favorites'>('daily');

  
  useEffect(() => {
    localStorage.setItem('likedArtworks', JSON.stringify([...likedArtworks]));
  }, [likedArtworks]);

  const handleLike = (artwork: Artwork) => {
    setLikedArtworks(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(artwork.id)) {
        newLiked.delete(artwork.id);
      } else {
        newLiked.add(artwork.id);
      }
      return newLiked;
    });
  };

  const handleShare = (artwork: Artwork) => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: `Check out "${artwork.title}" by ${artwork.artist}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      // Show copy dialog with share URL
      window.prompt('Copy this link to share:', window.location.href);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'discover':
        return (
          <DiscoverPage
            artworks={artworks}
            onArtworkClick={setSelectedArtwork}
            onLike={handleLike}
            onShare={handleShare}
            likedArtworks={likedArtworks}
          />
        );
      case 'favorites':
        return (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-serif mb-6">Your Favorites</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {artworks
                .filter(artwork => likedArtworks.has(artwork.id))
                .map(artwork => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    variant="small"
                    onClick={setSelectedArtwork}
                    onLike={handleLike}
                    onShare={handleShare}
                    isLiked={true}
                  />
                ))}
            </div>
            {likedArtworks.size === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No favorites yet. Like some artworks to see them here!
              </p>
            )}
          </div>
        );
      default:
        return (
          <DailyArtPage
            artworks={curatedArtworks}
            onArtworkClick={setSelectedArtwork}
            onLike={handleLike}
            onShare={handleShare}
            likedArtworks={likedArtworks}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setCurrentPage('daily')}
              className="flex flex-col items-center p-2"
            >
              <Palette className={`w-6 h-6 ${currentPage === 'daily' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="text-xs mt-1">Daily Art</span>
            </button>
            <button
              onClick={() => setCurrentPage('discover')}
              className="flex flex-col items-center p-2"
            >
              <Compass className={`w-6 h-6 ${currentPage === 'discover' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="text-xs mt-1">Discover</span>
            </button>
            <button
              onClick={() => setCurrentPage('favorites')}
              className="flex flex-col items-center p-2"
            >
              <Heart className={`w-6 h-6 ${currentPage === 'favorites' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="text-xs mt-1">Favorites</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {renderContent()}
      </main>

      {/* Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onLike={handleLike}
          onShare={handleShare}
          isLiked={likedArtworks.has(selectedArtwork.id)}
        />
      )}
    </div>
  );
}

export default App;