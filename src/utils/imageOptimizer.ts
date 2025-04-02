interface ImageOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
}

function supportsWebp(): boolean {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

function supportsAvif(): boolean {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

const imageCache = new Map<string, string>();

export function optimizeImageUrl(url: string, options: ImageOptions = {}): string {
  const cacheKey = `${url}-${options.width}-${options.format}-${options.quality}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  let optimizedUrl = url;
  const width = options.width || 800;
  const quality = options.quality || 80;

  // For Wikimedia images
  if (url.includes('wikipedia.org') || url.includes('wikimedia.org')) {
    const filename = url.split('/').pop();
    optimizedUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${url.slice(-2, -1)}/${url.slice(-1)}/${filename}/${width}px-${filename}`;
    
    // Try to use WebP if supported
    if (supportsWebp()) {
      optimizedUrl = optimizedUrl.replace(/\.[^\.]+$/, '.webp');
    }
  }

  // For Unsplash images
  else if (url.includes('unsplash.com')) {
    // Format: https://images.unsplash.com/photo-id?q=80&w=800&auto=format
    const baseUrl = url.split('?')[0];
    const format = supportsAvif() ? 'avif' : supportsWebp() ? 'webp' : 'jpeg';
    optimizedUrl = `${baseUrl}?q=${quality}&w=${width}&fm=${format}&auto=compress`;
  }

  // For Met Museum images
  else if (url.includes('metmuseum.org')) {
    // Met Museum API already provides optimized versions
    optimizedUrl = url;
  }

  // For other images, try to use a CDN or image optimization service
  else {
    // You could integrate with imgix, Cloudinary, or similar services here
    optimizedUrl = url;
  }

  // Cache the optimized URL
  imageCache.set(cacheKey, optimizedUrl);
  return optimizedUrl;
}

export function getImageDimensions(variant: 'small' | 'large' | 'modal'): { width: number; height: number } {
  switch (variant) {
    case 'small':
      return { width: 300, height: 300 };
    case 'large':
      return { width: 600, height: 600 };
    case 'modal':
      return { width: 1200, height: 800 };
    default:
      return { width: 300, height: 300 };
  }
}
