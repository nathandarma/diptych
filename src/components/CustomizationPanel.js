import React from 'react';
import { Slider, Button } from '@heroui/react';

const CustomizationPanel = ({
  backgroundColor,
  borderThickness,
  borderColor,
  onBackgroundColorChange,
  onBorderThicknessChange,
  onBorderColorChange
}) => {
  const presetColors = [
    '#ffffff', // White
    '#f8f9fa', // Light Gray
    '#e9ecef', // Gray
    '#000000', // Black
    '#212529', // Dark Gray
    '#f8f9fa', // Off White
    '#ffeaa7', // Light Yellow
    '#fab1a0', // Light Orange
    '#fd79a8', // Light Pink
    '#fdcb6e', // Light Peach
    '#6c5ce7', // Light Purple
    '#74b9ff', // Light Blue
    '#00b894', // Light Green
    '#e17055'  // Light Red
  ];

  const handleColorInputChange = (e, colorType) => {
    const color = e.target.value;
    if (colorType === 'background') {
      onBackgroundColorChange(color);
    } else if (colorType === 'border') {
      onBorderColorChange(color);
    }
  };

  return (
    <div className="space-y-6">
      {/* Background Color */}
      <div>
        <label className="text-sm font-medium mb-3 block">Background Color</label>
        <div className="space-y-3">
          {/* Color Input */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => handleColorInputChange(e, 'background')}
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
              placeholder="#ffffff"
            />
          </div>
          
          {/* Preset Colors */}
          <div className="grid grid-cols-7 gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded border-2 ${
                  backgroundColor === color ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onBackgroundColorChange(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Border Thickness */}
      <div>
        <label className="text-sm font-medium mb-3 block">
          Border Thickness: {borderThickness}px
        </label>
        <Slider
          size="sm"
          step={1}
          minValue={0}
          maxValue={50}
          value={borderThickness}
          onChange={onBorderThicknessChange}
          className="max-w-md"
        />
      </div>

      {/* Border Color */}
      {borderThickness > 0 && (
        <div>
          <label className="text-sm font-medium mb-3 block">Border Color</label>
          <div className="space-y-3">
            {/* Color Input */}
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={borderColor}
                onChange={(e) => handleColorInputChange(e, 'border')}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={borderColor}
                onChange={(e) => onBorderColorChange(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                placeholder="#ffffff"
              />
            </div>
            
            {/* Preset Colors */}
            <div className="grid grid-cols-7 gap-1">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded border-2 ${
                    borderColor === color ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onBorderColorChange(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div>
        <label className="text-sm font-medium mb-3 block">Quick Presets</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="bordered"
            onClick={() => {
              onBackgroundColorChange('#ffffff');
              onBorderThicknessChange(10);
              onBorderColorChange('#ffffff');
            }}
          >
            Clean White
          </Button>
          <Button
            size="sm"
            variant="bordered"
            onClick={() => {
              onBackgroundColorChange('#000000');
              onBorderThicknessChange(5);
              onBorderColorChange('#333333');
            }}
          >
            Dark Mode
          </Button>
          <Button
            size="sm"
            variant="bordered"
            onClick={() => {
              onBackgroundColorChange('#f8f9fa');
              onBorderThicknessChange(0);
              onBorderColorChange('#ffffff');
            }}
          >
            Seamless
          </Button>
          <Button
            size="sm"
            variant="bordered"
            onClick={() => {
              onBackgroundColorChange('#ffffff');
              onBorderThicknessChange(20);
              onBorderColorChange('#e9ecef');
            }}
          >
            Gallery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;