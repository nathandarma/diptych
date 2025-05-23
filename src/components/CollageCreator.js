import React, { useState, useRef } from 'react';
import { Card, CardBody, Button, Slider } from '@heroui/react';
import Canvas from './Canvas';
import LayoutSelector from './LayoutSelector';
import AspectRatioSelector from './AspectRatioSelector';
import CustomizationPanel from './CustomizationPanel';
import ExportPanel from './ExportPanel';

const CollageCreator = () => {
  const [layout, setLayout] = useState({ type: 'diptych', variant: 'horizontal' });
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [images, setImages] = useState({});
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [borderThickness, setBorderThickness] = useState(10);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const canvasRef = useRef(null);

  const handleImageUpload = (frameId, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImages(prev => ({
            ...prev,
            [frameId]: {
              src: e.target.result,
              file: file,
              scale: 1,
              x: 0,
              y: 0,
              width: img.width,
              height: img.height
            }
          }));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageTransform = (frameId, transform) => {
    setImages(prev => ({
      ...prev,
      [frameId]: {
        ...prev[frameId],
        ...transform
      }
    }));
  };

  const removeImage = (frameId) => {
    setImages(prev => {
      const newImages = { ...prev };
      delete newImages[frameId];
      return newImages;
    });
    if (selectedFrame === frameId) {
      setSelectedFrame(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Canvas Area */}
      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardBody className="p-6">
            <Canvas
              ref={canvasRef}
              layout={layout}
              aspectRatio={aspectRatio}
              images={images}
              selectedFrame={selectedFrame}
              backgroundColor={backgroundColor}
              borderThickness={borderThickness}
              borderColor={borderColor}
              onImageUpload={handleImageUpload}
              onImageTransform={handleImageTransform}
              onFrameSelect={setSelectedFrame}
              onRemoveImage={removeImage}
            />
          </CardBody>
        </Card>
      </div>

      {/* Control Panel */}
      <div className="lg:col-span-1 space-y-4">
        {/* Layout Selection */}
        <Card>
          <CardBody className="p-4">
            <h3 className="text-lg font-semibold mb-4">Layout</h3>
            <LayoutSelector
              selectedLayout={layout}
              onLayoutChange={setLayout}
            />
          </CardBody>
        </Card>

        {/* Aspect Ratio Selection */}
        <Card>
          <CardBody className="p-4">
            <h3 className="text-lg font-semibold mb-4">Aspect Ratio</h3>
            <AspectRatioSelector
              selectedRatio={aspectRatio}
              onRatioChange={setAspectRatio}
            />
          </CardBody>
        </Card>

        {/* Image Controls */}
        {selectedFrame && images[selectedFrame] && (
          <Card>
            <CardBody className="p-4">
              <h3 className="text-lg font-semibold mb-4">Image Controls</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Scale</label>
                  <Slider
                    size="sm"
                    step={0.1}
                    minValue={0.1}
                    maxValue={3}
                    value={images[selectedFrame].scale}
                    onChange={(value) => handleImageTransform(selectedFrame, { scale: value })}
                    className="max-w-md"
                  />
                </div>
                <Button
                  color="danger"
                  variant="flat"
                  size="sm"
                  onClick={() => removeImage(selectedFrame)}
                  className="w-full"
                >
                  Remove Image
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Customization Panel */}
        <Card>
          <CardBody className="p-4">
            <h3 className="text-lg font-semibold mb-4">Customization</h3>
            <CustomizationPanel
              backgroundColor={backgroundColor}
              borderThickness={borderThickness}
              borderColor={borderColor}
              onBackgroundColorChange={setBackgroundColor}
              onBorderThicknessChange={setBorderThickness}
              onBorderColorChange={setBorderColor}
            />
          </CardBody>
        </Card>

        {/* Export Panel */}
        <Card>
          <CardBody className="p-4">
            <h3 className="text-lg font-semibold mb-4">Export</h3>
            <ExportPanel
              canvasRef={canvasRef}
              layout={layout}
              aspectRatio={aspectRatio}
              images={images}
              backgroundColor={backgroundColor}
              borderThickness={borderThickness}
              borderColor={borderColor}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CollageCreator;