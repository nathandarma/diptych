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
    <div className="space-y-8">
      {/* Background Color */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block">Background Color</label>
        <div className="space-y-4">
          {/* Color Input */}
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => handleColorInputChange(e, 'background')}
              className="w-10 h-10 rounded-md border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="#ffffff"
            />
          </div>

          {/* Preset Colors */}
          <div className="grid grid-cols-7 gap-2">
            {presetColors.map((color) => (
              <button
                key={`bg-${color}`}
                className={`w-8 h-8 rounded-full border hover:opacity-80 ${
                  backgroundColor === color
                    ? 'ring-2 ring-offset-1 ring-primary-500 border-primary-500'
                    : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
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
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Border Thickness: <span className="font-normal">{borderThickness}px</span>
        </label>
        <Slider
          size="sm"
          step={1}
          minValue={0}
          maxValue={50}
          value={borderThickness}
          onChange={onBorderThicknessChange}
          className="max-w-md"
          color="primary"
        />
      </div>

      {/* Border Color */}
      {borderThickness > 0 && (
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-3 block">Border Color</label>
          <div className="space-y-4">
            {/* Color Input */}
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={borderColor}
                onChange={(e) => handleColorInputChange(e, 'border')}
                className="w-10 h-10 rounded-md border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={borderColor}
                onChange={(e) => onBorderColorChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="#000000"
              />
            </div>

            {/* Preset Colors */}
            <div className="grid grid-cols-7 gap-2">
              {presetColors.map((color) => (
                <button
                  key={`border-${color}`}
                  className={`w-8 h-8 rounded-full border hover:opacity-80 ${
                    borderColor === color
                      ? 'ring-2 ring-offset-1 ring-primary-500 border-primary-500'
                      : 'border-gray-300 hover:ring-1 hover:ring-gray-400'
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
        <label className="text-sm font-semibold text-gray-700 mb-3 block">Quick Presets</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="flat"
            className="hover:bg-gray-100"
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
            variant="flat"
            className="hover:bg-gray-100"
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
            variant="flat"
            className="hover:bg-gray-100"
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
            variant="flat"
            className="hover:bg-gray-100"
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