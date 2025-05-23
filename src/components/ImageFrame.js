import React, { useRef } from 'react';

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

  return (
    <div
      className={`absolute image-frame ${
        image ? 'has-image' : ''
      } ${isSelected ? 'selected' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height
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
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={image.src}
            alt="Collage frame"
            className="absolute object-cover"
            style={{
              transform: `translate(${image.x || 0}px, ${image.y || 0}px) scale(${image.scale || 1})`,
              transformOrigin: 'top left',
              width: 'auto',
              height: 'auto',
              maxWidth: 'none',
              maxHeight: 'none'
            }}
            onLoad={handleImageLoad}
            draggable={false}
          />
        </div>
      ) : (
        <div className="upload-placeholder">
          <svg
            className="w-12 h-12 mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-sm font-medium">Click to upload</span>
          <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</span>
        </div>
      )}
      
      {isSelected && image && (
        <div className="absolute top-2 right-2">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            Selected
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageFrame;