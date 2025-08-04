import React from 'react';

interface ImageColorContextType {
  isImageLight: boolean;
  isImageLoading: boolean;
  setImageColor: (isLight: boolean, isLoading: boolean) => void;
}

const ImageColorContext = React.createContext<
  ImageColorContextType | undefined
>(undefined);

export const useImageColor = () => {
  const context = React.useContext(ImageColorContext);
  if (!context) {
    throw new Error('useImageColor must be used within an ImageColorProvider');
  }
  return context;
};

export const ImageColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isImageLight, setIsImageLight] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const setImageColor = React.useCallback(
    (isLight: boolean, isLoading: boolean) => {
      setIsImageLight(isLight);
      setIsImageLoading(isLoading);
    },
    []
  );

  const value = React.useMemo(
    () => ({
      isImageLight,
      isImageLoading,
      setImageColor,
    }),
    [isImageLight, isImageLoading, setImageColor]
  );

  return (
    <ImageColorContext.Provider value={value}>
      {children}
    </ImageColorContext.Provider>
  );
};
