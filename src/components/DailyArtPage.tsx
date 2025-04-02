import React, { useEffect, useState } from 'react';
import { ArtworkCard } from './ArtworkCard';
import type { Artwork } from '../types';
import { getDailyArtwork, getRandomArtworks } from '../utils/artworkUtils';

interface DailyArtPageProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onLike: (artwork: Artwork) => void;
  onShare: (artwork: Artwork) => void;
  likedArtworks: Set<string>;
}

export const DailyArtPage: React.FC<DailyArtPageProps> = ({
  artworks,
  onArtworkClick,
  onLike,
  onShare,
  likedArtworks
}) => {
  const [dailyArtwork, setDailyArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);

  // Function to get diverse related artworks
  const getDiverseRelatedArtworks = (baseArtworks: Artwork[], dailyArt: Artwork, count: number) => {
    // First, get random artworks excluding the daily one
    const random = getRandomArtworks(baseArtworks, count, dailyArt);
    
    // Filter for diversity based on multiple criteria
    const diverseArtworks = random.filter(art => 
      art.artist !== dailyArt.artist && // Different artist
      art.museum !== dailyArt.museum && // Different museum
      Math.abs(parseInt(art.date) - parseInt(dailyArt.date)) > 50 // Different time period (>50 years)
    );
    
    // If we don't have enough diverse artworks, add more with relaxed criteria
    if (diverseArtworks.length < count) {
      const remaining = count - diverseArtworks.length;
      const moreArtworks = getRandomArtworks(
        baseArtworks.filter(art => 
          art.id !== dailyArt.id && 
          !diverseArtworks.find(d => d.id === art.id) &&
          art.artist !== dailyArt.artist // Only enforce different artist
        ),
        remaining
      );
      return [...diverseArtworks, ...moreArtworks];
    }
    
    return diverseArtworks.slice(0, count);
  };

  useEffect(() => {
    if (artworks.length > 0) {
      const daily = getDailyArtwork(artworks);
      setDailyArtwork(daily);
      
      // Get diverse related artworks
      const diverse = getDiverseRelatedArtworks(artworks, daily, 6);
      setRelatedArtworks(diverse);
    }
  }, [artworks]);

  // Refresh related artworks periodically (every 5 minutes)
  useEffect(() => {
    if (!dailyArtwork) return;

    const refreshRelated = () => {
      const diverse = getDiverseRelatedArtworks(artworks, dailyArtwork, 6);
      setRelatedArtworks(diverse);
    };

    const intervalId = setInterval(refreshRelated, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [artworks, dailyArtwork]);

  if (!dailyArtwork) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Featured Daily Artwork */}
      <section className="space-y-4">
        <h1 className="text-3xl font-serif">Today's Masterpiece</h1>
        <div className="aspect-[16/9] sm:aspect-[2/1] md:aspect-[3/1] relative rounded-2xl overflow-hidden">
          <ArtworkCard
            artwork={dailyArtwork}
            variant="large"
            onClick={onArtworkClick}
            onLike={onLike}
            onShare={onShare}
            isLiked={likedArtworks.has(dailyArtwork.id)}
          />
        </div>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-serif mb-2">{dailyArtwork.title}</h2>
          <div className="text-gray-400 space-y-1">
            <p>{dailyArtwork.artist}, {dailyArtwork.date}</p>
            <p>{dailyArtwork.museum}</p>
            <p className="text-sm">{dailyArtwork.description}</p>
          </div>
        </div>
      </section>

      {/* More Artworks Grid */}
      <section>
        <h2 className="text-2xl font-serif mb-6">More to Explore</h2>
        <div className="grid grid-cols-2 gap-4">
          {relatedArtworks.map((artwork) => (
            <div key={artwork.id}>
              <ArtworkCard
                artwork={artwork}
                variant="small"
                onClick={onArtworkClick}
                onLike={onLike}
                onShare={onShare}
                isLiked={likedArtworks.has(artwork.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
