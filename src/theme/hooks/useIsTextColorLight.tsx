import React from 'react';

const isColorLight = (r: number, g: number, b: number) => {
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 128;
};

const useIsTextColorLight = (image: string) => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [isLight, setIsColorLight] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const { data } = imageData;
      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const pixelCount = data.length / 4;
      r = Math.round(r / pixelCount);
      g = Math.round(g / pixelCount);
      b = Math.round(b / pixelCount);

      setIsColorLight(isColorLight(r, g, b));
      setIsLoading(false);
    };

    img.onerror = (error) => {
      console.error('Image failed to load', error);
      setIsLoading(false);
    };
  }, [image]);

  return { isLoading, isLight };
};

export default useIsTextColorLight;