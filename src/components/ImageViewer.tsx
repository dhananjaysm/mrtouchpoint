import React from "react";
import { TouchPoint } from "../types";

type ImageViewerProps = {
  imageSrc: string | null;
  onImageClick: (event: React.MouseEvent<HTMLImageElement>) => void;
  touchpoints: Record<string, TouchPoint>;
};


const ImageViewer: React.FC<ImageViewerProps> = ({
  imageSrc,
  onImageClick,
  touchpoints,
}) => {
  return (
    <div
      style={{
        position: "relative",
        //We have set the maximum width and height to able to fit on mobile screen
        maxWidth: "375px",
        maxHeight: "667px",
        overflow: "hidden",
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: "crosshair",
          }}
          onClick={onImageClick}
        />
      )}
      
      {Object.entries(touchpoints).map(([key, point], index) => (
        <div
          key={key}
          style={{
            position: "absolute",
            top: point.top,
            left: point.left,
            transform: "translate(-50%, -50%)",
            backgroundColor: "red",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            color: "white",
            textAlign: "center",
            lineHeight: "20px",
            zIndex: 10,
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default ImageViewer;
