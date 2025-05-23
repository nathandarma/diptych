import React, { useState } from 'react';
import { Button, Select, SelectItem, Slider } from '@heroui/react';

const ExportPanel = ({
  canvasRef,
  layout,
  aspectRatio,
  images,
  backgroundColor,
  borderThickness,
  borderColor
}) => {
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState(0.9);
  const [exportSize, setExportSize] = useState('high');
  const [isExporting, setIsExporting] = useState(false);

  const getExportDimensions = () => {
    const baseDimensions = {
      '1:1': { width: 1080, height: 1080 },
      '3:4': { width: 1080, height: 1440 },
      '4:3': { width: 1440, height: 1080 },
      '4:5': { width: 1080, height: 1350 },
      '9:16': { width: 1080, height: 1920 },
      '16:9': { width: 1920, height: 1080 }
    };

    const base = baseDimensions[aspectRatio] || baseDimensions['1:1'];
    
    const sizeMultipliers = {
      'medium': 0.5,
      'high': 1,
      'ultra': 2
    };

    const multiplier = sizeMultipliers[exportSize] || 1;
    
    return {
      width: Math.round(base.width * multiplier),
      height: Math.round(base.height * multiplier)
    };
  };

  const getLayoutFrames = (canvasWidth, canvasHeight) => {
    const { type, variant } = layout;
    const border = borderThickness * (canvasWidth / 400); // Scale border relative to canvas size
    
    if (type === 'diptych') {
      if (variant === 'horizontal') {
        const frameWidth = (canvasWidth - border) / 2;
        return [
          { id: 'frame-1', x: 0, y: 0, width: frameWidth, height: canvasHeight },
          { id: 'frame-2', x: frameWidth + border, y: 0, width: frameWidth, height: canvasHeight }
        ];
      } else {
        const frameHeight = (canvasHeight - border) / 2;
        return [
          { id: 'frame-1', x: 0, y: 0, width: canvasWidth, height: frameHeight },
          { id: 'frame-2', x: 0, y: frameHeight + border, width: canvasWidth, height: frameHeight }
        ];
      }
    } else if (type === 'triptych') {
      if (variant === 'horizontal') {
        const frameWidth = (canvasWidth - 2 * border) / 3;
        return [
          { id: 'frame-1', x: 0, y: 0, width: frameWidth, height: canvasHeight },
          { id: 'frame-2', x: frameWidth + border, y: 0, width: frameWidth, height: canvasHeight },
          { id: 'frame-3', x: 2 * (frameWidth + border), y: 0, width: frameWidth, height: canvasHeight }
        ];
      } else if (variant === 'vertical') {
        const frameHeight = (canvasHeight - 2 * border) / 3;
        return [
          { id: 'frame-1', x: 0, y: 0, width: canvasWidth, height: frameHeight },
          { id: 'frame-2', x: 0, y: frameHeight + border, width: canvasWidth, height: frameHeight },
          { id: 'frame-3', x: 0, y: 2 * (frameHeight + border), width: canvasWidth, height: frameHeight }
        ];
      } else if (variant === 'left-large') {
        const largeWidth = canvasWidth * 0.6;
        const smallWidth = canvasWidth * 0.4 - border;
        const smallHeight = (canvasHeight - border) / 2;
        return [
          { id: 'frame-1', x: 0, y: 0, width: largeWidth, height: canvasHeight },
          { id: 'frame-2', x: largeWidth + border, y: 0, width: smallWidth, height: smallHeight },
          { id: 'frame-3', x: largeWidth + border, y: smallHeight + border, width: smallWidth, height: smallHeight }
        ];
      } else if (variant === 'right-large') {
        const smallWidth = canvasWidth * 0.4 - border;
        const largeWidth = canvasWidth * 0.6;
        const smallHeight = (canvasHeight - border) / 2;
        return [
          { id: 'frame-1', x: 0, y: 0, width: smallWidth, height: smallHeight },
          { id: 'frame-2', x: 0, y: smallHeight + border, width: smallWidth, height: smallHeight },
          { id: 'frame-3', x: smallWidth + border, y: 0, width: largeWidth, height: canvasHeight }
        ];
      }
    }
    
    return [];
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const exportCollage = async () => {
    setIsExporting(true);
    
    try {
      const dimensions = getExportDimensions();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      
      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const frames = getLayoutFrames(canvas.width, canvas.height);
      const scaleFactor = canvas.width / 400; // Scale factor from preview to export
      
      // Draw borders first
      if (borderThickness > 0) {
        ctx.fillStyle = borderColor;
        
        frames.forEach((frame, index) => {
          if (index === 0) return;
          
          const prevFrame = frames[index - 1];
          const isVerticalBorder = frame.x > prevFrame.x;
          const scaledBorder = borderThickness * scaleFactor;
          
          if (isVerticalBorder) {
            ctx.fillRect(frame.x - scaledBorder, 0, scaledBorder, canvas.height);
          } else {
            ctx.fillRect(0, frame.y - scaledBorder, canvas.width, scaledBorder);
          }
        });
      }
      
      // Draw images
      for (const frame of frames) {
        const imageData = images[frame.id];
        if (imageData) {
          try {
            const img = await loadImage(imageData.src);
            
            // Save context
            ctx.save();
            
            // Create clipping path for frame
            ctx.beginPath();
            ctx.rect(frame.x, frame.y, frame.width, frame.height);
            ctx.clip();
            
            // Calculate image position and scale
            const scale = (imageData.scale || 1) * scaleFactor;
            const x = frame.x + (imageData.x || 0) * scaleFactor;
            const y = frame.y + (imageData.y || 0) * scaleFactor;
            
            // Draw image
            ctx.drawImage(
              img,
              x,
              y,
              img.width * scale,
              img.height * scale
            );
            
            // Restore context
            ctx.restore();
          } catch (error) {
            console.error('Error loading image for export:', error);
          }
        }
      }
      
      // Export canvas
      const mimeType = exportFormat === 'jpg' ? 'image/jpeg' : 'image/png';
      const quality = exportFormat === 'jpg' ? exportQuality : undefined;
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `collage-${Date.now()}.${exportFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsExporting(false);
      }, mimeType, quality);
      
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  const hasImages = Object.keys(images).length > 0;
  const exportDimensions = getExportDimensions();

  return (
    <div className="space-y-4">
      {/* Export Size */}
      <div>
        <label className="text-sm font-medium mb-2 block">Export Size</label>
        <Select
          size="sm"
          selectedKeys={[exportSize]}
          onSelectionChange={(keys) => setExportSize(Array.from(keys)[0])}
        >
          <SelectItem key="medium" value="medium">
            Medium ({Math.round(exportDimensions.width * 0.5)} × {Math.round(exportDimensions.height * 0.5)})
          </SelectItem>
          <SelectItem key="high" value="high">
            High ({exportDimensions.width} × {exportDimensions.height})
          </SelectItem>
          <SelectItem key="ultra" value="ultra">
            Ultra ({exportDimensions.width * 2} × {exportDimensions.height * 2})
          </SelectItem>
        </Select>
      </div>

      {/* Export Format */}
      <div>
        <label className="text-sm font-medium mb-2 block">Format</label>
        <Select
          size="sm"
          selectedKeys={[exportFormat]}
          onSelectionChange={(keys) => setExportFormat(Array.from(keys)[0])}
        >
          <SelectItem key="png" value="png">
            PNG (Lossless, supports transparency)
          </SelectItem>
          <SelectItem key="jpg" value="jpg">
            JPG (Smaller file size)
          </SelectItem>
        </Select>
      </div>

      {/* Quality Slider for JPG */}
      {exportFormat === 'jpg' && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            Quality: {Math.round(exportQuality * 100)}%
          </label>
          <Slider
            size="sm"
            step={0.1}
            minValue={0.1}
            maxValue={1}
            value={exportQuality}
            onChange={setExportQuality}
            className="max-w-md"
          />
        </div>
      )}

      {/* Export Button */}
      <Button
        color="primary"
        size="lg"
        className="w-full"
        onClick={exportCollage}
        isLoading={isExporting}
        isDisabled={!hasImages || isExporting}
      >
        {isExporting ? 'Exporting...' : 'Export Collage'}
      </Button>

      {!hasImages && (
        <p className="text-sm text-gray-500 text-center">
          Add images to enable export
        </p>
      )}
    </div>
  );
};

export default ExportPanel;