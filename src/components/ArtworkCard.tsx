import React from 'react';
import { Heart, Share2 } from 'lucide-react';
import { ArtworkCardProps } from '../types';

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ 
  artwork, 
  onClick, 
  onLike,
  onShare,
  isLiked,
  variant = 'large' 
}) => {
  const isLarge = variant === 'large';

  return (
    <div 
      onClick={() => onClick?.(artwork)}
      className={`relative overflow-hidden rounded-2xl bg-black cursor-pointer transition-transform duration-300 hover:scale-[1.02] ${
        isLarge ? 'aspect-[3/4]' : 'aspect-square'
      }`}
    >
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute top-4 right-4 flex gap-3">
        <button 
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onLike?.(artwork);
          }}
        >
          <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
        </button>
        <button 
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onShare?.(artwork);
          }}
        >
          <Share2 className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="space-y-2">
          {artwork.date && (
            <div className="text-sm text-gray-300 font-medium">
              {artwork.date}
            </div>
          )}
          <h2 className="text-2xl font-serif text-white">{artwork.title}</h2>
          {isLarge && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-400" />
                <span className="text-white">{artwork.artist}</span>
              </div>
              <p className="text-gray-300 line-clamp-2">{artwork.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};