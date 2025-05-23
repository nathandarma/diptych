import React, { forwardRef, useRef, useState } from 'react';
import ImageFrame from './ImageFrame';

const Canvas = forwardRef(({
  layout,
  aspectRatio,
  images,
  selectedFrame,
  backgroundColor,
  borderThickness,
  borderColor,
  onImageUpload,
  onImageTransform,
  onFrameSelect,
  onRemoveImage
}, ref) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Calculate aspect ratio dimensions
  const getAspectRatioDimensions = () => {
    const ratios = {
      '1:1': { width: 400, height: 400 },
      '3:4': { width: 400, height: 533 },
      '4:3': { width: 533, height: 400 },
      '4:5': { width: 400, height: 500 },
      '9:16': { width: 360, height: 640 },
      '16:9': { width: 640, height: 360 }
    };
    return ratios[aspectRatio] || ratios['1:1'];
  };

  // Get layout configuration
  const getLayoutConfig = () => {
    const { type, variant } = layout;
    const dimensions = getAspectRatioDimensions();
    const border = borderThickness;
    
    if (type === 'diptych') {
      if (variant === 'horizontal') {
        const frameWidth = (dimensions.width - border) / 2;
        return {
          frames: [
            { id: 'frame-1', x: 0, y: 0, width: frameWidth, height: dimensions.height },
            { id: 'frame-2', x: frameWidth + border, y: 0, width: frameWidth, height: dimensions.height }
          ],
          canvasWidth: dimensions.width,
          canvasHeight: dimensions.height
        };
      } else {
        const frameHeight = (dimensions.height - border) / 2;
        return {
          frames: [
            { id: 'frame-1', x: 0, y: 0, width: dimensions.width, height: frameHeight },
            { id: 'frame-2', x: 0, y: frameHeight + border, width: dimensions.width, height: frameHeight }
          ],
          canvasWidth: dimensions.width,
          canvasHeight: dimensions.height
        };
      }
    } else if (type === 'triptych') {
      if (variant === 'horizontal') {
        const frameWidth = (dimensions.width - 2 * border) / 3;
        return {
          frames: [
            { id: 'frame-1', x: 0, y: 0, width: frameWidth, height: dimensions.height },
            { id: 'frame-2', x: frameWidth + border, y: 0, width: frameWidth, height: dimensions.height },
            { id: 'frame-3', x: 2 * (frameWidth + border), y: 0, width: frameWidth, height: dimensions.height }
          ],
          canvasWidth: dimensions.width,
          canvasHeight: dimensions.height
        };
      } else if (variant === 'vertical') {
        const frameHeight = (dimensions.height - 2 * border) / 3;
        return {
          frames: [
            { id: 'frame-1', x: 0, y: 0, width: dimensions.width, height: frameHeight },
            { id: 'frame-2', x: 0, y: frameHeight + border, width: dimensions.width, height: frameHeight },
            { id: 'frame-3', x: 0, y: 2 * (frameHeight + border), width: dimensions.width, height: frameHeight }
          ],
          canvasWidth: dimensions.width,
          canvasHeight: dimensions.height
        };
      } else if (variant === 'left-large') {
        const largeWidth = dimensions.width * 0.6;
        const smallWidth = dimensions.width * 0.4 - border;
        const smallHeight = (dimensions.height - border) / 2;
        return {
          frames: [
            { id: 'frame-1', x: 0, y: 0, width: largeWidth, height: dimensions.height },
            { id: 'frame-2', x: largeWidth + border, y: 0, width: smallWidth, height: smallHeight },
            { id: 'frame-3', x: largeWidth + border, y: smallHeight + border, width: smallWidth, height: smallHeight }
          ],
          canvasWidth: dimensions.width,
          canvasHeight: dimensions.height
        };
      } else if (variant === 'right-large') {
        const smallWidth = dimensions.width * 0.4 - border;
        const largeWidth = dimensions.width * 0.6;
        const smallHeight = (dimensions.height - border) / 2;
        return {
          frames: [
            { id: 'frame-1', x: 0, y: 0, width: smallWidth, height: smallHeight },
            { id: 'frame-2', x: 0, y: smallHeight + border, width: smallWidth, height: smallHeight },
            { id: 'frame-3', x: smallWidth + border, y: 0, width: largeWidth, height: dimensions.height }
          ],
          canvasWidth: dimensions.width,
          canvasHeight: dimensions.height
        };
      }
    }
    
    return { frames: [], canvasWidth: 400, canvasHeight: 400 };
  };

  const layoutConfig = getLayoutConfig();

  const handleMouseDown = (e, frameId) => {
    if (!images[frameId]) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (images[frameId].x || 0),
      y: e.clientY - (images[frameId].y || 0)
    });
    onFrameSelect(frameId);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedFrame || !images[selectedFrame]) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    onImageTransform(selectedFrame, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="canvas-container">
      <div
        ref={containerRef}
        className="relative mx-auto border-2 border-gray-200 rounded-lg overflow-hidden"
        style={{
          width: layoutConfig.canvasWidth,
          height: layoutConfig.canvasHeight,
          backgroundColor: backgroundColor
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {layoutConfig.frames.map((frame) => (
          <ImageFrame
            key={frame.id}
            frameId={frame.id}
            x={frame.x}
            y={frame.y}
            width={frame.width}
            height={frame.height}
            image={images[frame.id]}
            isSelected={selectedFrame === frame.id}
            onImageUpload={onImageUpload}
            onMouseDown={(e) => handleMouseDown(e, frame.id)}
            onFrameSelect={onFrameSelect}
          />
        ))}
        
        {/* Border lines */}
        {borderThickness > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {layoutConfig.frames.map((frame, index) => {
              if (index === 0) return null;
              
              const prevFrame = layoutConfig.frames[index - 1];
              const isVerticalBorder = frame.x > prevFrame.x;
              
              if (isVerticalBorder) {
                return (
                  <div
                    key={`border-${index}`}
                    className="absolute"
                    style={{
                      left: frame.x - borderThickness,
                      top: 0,
                      width: borderThickness,
                      height: layoutConfig.canvasHeight,
                      backgroundColor: borderColor
                    }}
                  />
                );
              } else {
                return (
                  <div
                    key={`border-${index}`}
                    className="absolute"
                    style={{
                      left: 0,
                      top: frame.y - borderThickness,
                      width: layoutConfig.canvasWidth,
                      height: borderThickness,
                      backgroundColor: borderColor
                    }}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;