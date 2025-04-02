export interface Artwork {
  id: string;
  title: string;
  artist: string;
  date: string;
  description: string;
  imageUrl: string;
  location: string;
  museum: string;
  dimensions: string;
  likes: number;
}

export interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: (artwork: Artwork) => void;
  onLike?: (artwork: Artwork) => void;
  onShare?: (artwork: Artwork) => void;
  isLiked?: boolean;
  variant?: 'large' | 'small';
}