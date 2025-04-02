import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getOptimizedImageUrl, generatePlaceholder } from '../utils/imageProcessor';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height
}) => {
  const [loadingStage, setLoadingStage] = useState<'placeholder' | 'low-quality' | 'high-quality'>('placeholder');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [lowQualitySrc, setLowQualitySrc] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef<boolean>(false);

  const loadImage = useCallback(async (url: string, quality: 'low' | 'high') => {
    try {
      const img = new Image();
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      img.src = url;
      await loadPromise;

      if (quality === 'low') {
        setLowQualitySrc(url);
        setLoadingStage('low-quality');
      } else {
        setImageSrc(url);
        setLoadingStage('high-quality');
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }, []);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    isVisible.current = entry.isIntersecting;

    if (entry.isIntersecting && loadingStage === 'placeholder') {
      // First load a low quality version
      const lowQualityUrl = getOptimizedImageUrl(src, 'thumbnail');
      loadImage(lowQualityUrl, 'low');

      // Then load the high quality version
      const highQualityUrl = getOptimizedImageUrl(src, width && width > 800 ? 'large' : 'medium');
      loadImage(highQualityUrl, 'high');
    }
  }, [loadingStage, src, width, loadImage]);

  useEffect(() => {
    // Reset state when src changes
    setLoadingStage('placeholder');
    setImageSrc('');
    setLowQualitySrc('');

    // Generate placeholder
    generatePlaceholder(src).then((placeholder) => {
      if (placeholder) setLowQualitySrc(placeholder);
    });

    // Set up intersection observer
    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    if (imageRef.current) {
      observer.current.observe(imageRef.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [src, handleIntersection]);

  // Default placeholder if generation fails
  const defaultPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`;

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden ${className}`} 
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {/* Placeholder or low quality image */}
      <img
        src={lowQualitySrc || defaultPlaceholder}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
        style={{
          opacity: loadingStage === 'high-quality' ? 0 : 1,
          filter: loadingStage === 'placeholder' ? 'blur(10px)' : 'blur(0px)'
        }}
      />
      
      {/* High quality image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
          style={{
            opacity: loadingStage === 'high-quality' ? 1 : 0
          }}
          loading="lazy"
        />
      )}
    </div>
  );
};
