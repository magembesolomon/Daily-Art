import React from 'react';
import { ArtworkCard } from './ArtworkCard';
import type { Artwork } from '../types';

interface DiscoverPageProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({ artworks, onArtworkClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Discover Masterpieces</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artworks.map((artwork) => (
          <div 
            key={artwork.id}
            className={`${
              artwork.id === '1' ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <ArtworkCard
              artwork={artwork}
              variant={artwork.id === '1' ? 'large' : 'small'}
              onClick={onArtworkClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};