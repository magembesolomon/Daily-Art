import React from 'react';
import { ArtworkCard } from './ArtworkCard';
import type { Artwork } from '../types';

interface FavoritesPageProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ artworks, onArtworkClick }) => {
  if (artworks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
        <p className="text-gray-400">
          You haven't added any artworks to your favorites yet.
          Explore the collection and tap the heart icon to save your favorite pieces.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
      <div className="grid grid-cols-2 gap-4">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            variant="small"
            onClick={onArtworkClick}
          />
        ))}
      </div>
    </div>
  );
};