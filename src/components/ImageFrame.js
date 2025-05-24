import React, { useRef, useState, useEffect } from 'react';
import { Spinner } from '@heroui/react'; // Assuming Spinner is available in HeroUI

const ImageFrame = ({
  frameId,
  x,
  y,
  width,
  height,
  image,
  isSelected,
  onImageUpload,
  onMouseDown,
  onFrameSelect
}) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (image && image.src) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [image]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(frameId, file);
    }
  };

  const handleFrameClick = () => {
    if (!image) {
      fileInputRef.current?.click();
    } else {
      onFrameSelect(frameId);
    }
  };

  const handleImageLoad = (e) => {
    setIsLoading(false);
    // Ensure image fits within frame initially
    const img = e.target;
    const frameAspect = width / height;
    const imageAspect = img.naturalWidth / img.naturalHeight;
    
    let scale = 1;
    if (imageAspect > frameAspect) {
      // Image is wider than frame
      scale = height / img.naturalHeight;
    } else {
      // Image is taller than frame
      scale = width / img.naturalWidth;
    }
    
    // Center the image
    const scaledWidth = img.naturalWidth * scale;
    const scaledHeight = img.naturalHeight * scale;
    // const centerX = (width - scaledWidth) / 2;
    // const centerY = (height - scaledHeight) / 2;
    
    // Update image position if it's not already set
    if (image && (image.x === 0 && image.y === 0 && image.scale === 1)) {
      // This would need to be handled by parent component
      // For now, we'll just ensure the image displays correctly
    }
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`absolute image-frame ${image ? 'has-image' : ''} ${
        isSelected
          ? 'ring-4 ring-primary-500 ring-offset-2 ring-offset-gray-50'
          : 'border border-gray-300'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
      }}
      onClick={handleFrameClick}
      onMouseDown={image ? onMouseDown : undefined}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {image ? (
        <div className="relative w-full h-full overflow-hidden rounded-lg"> {/* Added rounded-lg here to ensure spinner container also respects it */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-10 rounded-lg">
              <Spinner color="primary" size="lg" />
            </div>
          )}
          <img
            src={image.src}
            alt="Collage frame"
            className={`absolute object-cover ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
            style={{
              transform: `translate(${image.x || 0}px, ${
                image.y || 0
              }px) scale(${image.scale || 1})`,
              transformOrigin: 'top left',
              width: 'auto',
              height: 'auto',
              maxWidth: 'none',
              maxHeight: 'none',
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            draggable={false}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100">
          <svg
            className="w-16 h-16 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="text-base font-semibold mt-2">
            Click or drag to upload
          </span>
          <span className="text-xs mt-1">PNG, JPG, WEBP</span>
        </div>
      )}
    </div>
  );
};

export default ImageFrame;