import React, { createContext, useContext, useState, useEffect } from "react";

type TouchPoint = {
  x: number;
  y: number;
};

type ImageData = {
  id: string; // unique identifier for each image
  src: string;
  touchpoints: TouchPoint[];
};

type ImageContextType = {
  imagesData: ImageData[];
  addImage: (data: ImageData) => void;
  updateImageTouchpoints: (id: string, touchpoints: TouchPoint[]) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
interface ImageProviderProps {
    children: React.ReactNode;
  }
  
  export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imagesData, setImagesData] = useState<ImageData[]>(JSON.parse(localStorage.getItem("imagesData") || "[]"));

  const addImage = (data: ImageData) => {
    setImagesData((prev) => [...prev, data]);
  };

  const updateImageTouchpoints = (id: string, touchpoints: TouchPoint[]) => {
    setImagesData((prev) => 
      prev.map(img => img.id === id ? {...img, touchpoints } : img)
    );
  };

  useEffect(() => {
    localStorage.setItem("imagesData", JSON.stringify(imagesData));
  }, [imagesData]);

  return (
    <ImageContext.Provider value={{ imagesData, addImage, updateImageTouchpoints }}>
      {children}
    </ImageContext.Provider>
  );
};
