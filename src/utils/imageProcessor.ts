// Cache for validated URLs
const validUrlCache = new Map<string, boolean>();

// Function to check if an image URL is valid and accessible
export const checkImageUrl = async (url: string): Promise<boolean> => {
  // Check cache first
  if (validUrlCache.has(url)) {
    return validUrlCache.get(url)!;
  }

  try {
    // Use Promise.race to timeout after 5 seconds
    const timeoutPromise = new Promise<Response>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 5000);
    });

    const fetchPromise = fetch(url, { method: 'HEAD' });
    const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
    const contentType = response.headers.get('content-type');
    const isValid = response.ok && (contentType?.startsWith('image/') ?? false);
    
    // Cache the result
    validUrlCache.set(url, isValid);
    return isValid;
  } catch {
    validUrlCache.set(url, false);
    return false;
  }
};

// Cache for placeholders
const placeholderCache = new Map<string, string>();

// Function to generate a low-quality placeholder
export const generatePlaceholder = async (url: string): Promise<string> => {
  // Check cache first
  if (placeholderCache.has(url)) {
    return placeholderCache.get(url)!;
  }

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);
      img.onload = () => {
        clearTimeout(timeout);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create a tiny version for blur effect
    canvas.width = 20;
    canvas.height = (20 * img.height) / img.width;
    
    if (ctx) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const placeholder = canvas.toDataURL('image/jpeg', 0.1);
      placeholderCache.set(url, placeholder);
      return placeholder;
    }
    
    throw new Error('Could not get 2d context');
  } catch {
    const fallback = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`;
    placeholderCache.set(url, fallback);
    return fallback;
  }
};

export const ImageSize = {
  thumbnail: { width: 400, height: 400 },
  medium: { width: 800, height: 800 },
  large: { width: 1200, height: 1200 }
} as const;

// Cache for optimized URLs
const optimizedUrlCache = new Map<string, Map<string, string>>();

// Function to get the appropriate image size URL
export const getOptimizedImageUrl = (url: string, size: keyof typeof ImageSize): string => {
  // Check cache first
  const sizeCache = optimizedUrlCache.get(url);
  if (sizeCache?.has(size)) {
    return sizeCache.get(size)!;
  }

  let optimizedUrl = url;

  // Add size parameters for different museum APIs
  if (url.includes('metmuseum.org')) {
    optimizedUrl = url.replace('/original/', `/web-large/${size}/`);
  } else if (url.includes('artic.edu')) {
    optimizedUrl = `${url}/${ImageSize[size].width},/0/default.jpg`;
  } else if (url.includes('nga.gov')) {
    optimizedUrl = url.replace('nativeres', `${ImageSize[size].width}`);
  } else if (url.includes('getty.edu')) {
    optimizedUrl = `${url}/full/!${ImageSize[size].width},${ImageSize[size].height}/0/default.jpg`;
  }

  // Cache the result
  if (!optimizedUrlCache.has(url)) {
    optimizedUrlCache.set(url, new Map());
  }
  optimizedUrlCache.get(url)!.set(size, optimizedUrl);

  return optimizedUrl;
};
