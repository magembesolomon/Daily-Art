import React from 'react';
import { X, Heart, Share2 } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
  onLike?: (artwork: Artwork) => void;
  onShare?: (artwork: Artwork) => void;
  isLiked?: boolean;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ 
  artwork, 
  onClose,
  onLike,
  onShare,
  isLiked 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full aspect-[4/3] object-cover"
        />
        
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-serif text-white mb-2">{artwork.title}</h2>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-400" />
                <span className="text-white">{artwork.artist}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => onLike?.(artwork)}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
              </button>
              <button 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => onShare?.(artwork)}
              >
                <Share2 className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-300">{artwork.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            {artwork.location && (
              <div>
                <div className="text-gray-400">Location</div>
                <div className="text-white">{artwork.location}</div>
              </div>
            )}
            {artwork.museum && (
              <div>
                <div className="text-gray-400">Museum</div>
                <div className="text-white">{artwork.museum}</div>
              </div>
            )}
            {artwork.date && (
              <div>
                <div className="text-gray-400">Date</div>
                <div className="text-white">{artwork.date}</div>
              </div>
            )}
            {artwork.dimensions && (
              <div>
                <div className="text-gray-400">Dimensions</div>
                <div className="text-white">{artwork.dimensions}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};