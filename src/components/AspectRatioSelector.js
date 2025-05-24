import React from 'react';
import { Button } from '@heroui/react';

const AspectRatioSelector = ({ selectedRatio, onRatioChange }) => {
  const aspectRatios = [
    {
      value: '1:1',
      name: 'Square',
      description: 'Instagram Post',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      value: '3:4',
      name: 'Portrait',
      description: 'Standard Photo',
      icon: (
        <svg className="w-5 h-6" viewBox="0 0 20 24" fill="currentColor">
          <rect x="2" y="0" width="16" height="24" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      value: '4:3',
      name: 'Landscape',
      description: 'Standard Photo',
      icon: (
        <svg className="w-6 h-5" viewBox="0 0 24 20" fill="currentColor">
          <rect x="0" y="2" width="24" height="16" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      value: '4:5',
      name: 'Portrait+',
      description: 'Instagram Portrait',
      icon: (
        <svg className="w-5 h-6" viewBox="0 0 20 25" fill="currentColor">
          <rect x="2" y="0" width="16" height="25" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      value: '9:16',
      name: 'Story',
      description: 'Instagram/TikTok',
      icon: (
        <svg className="w-4 h-7" viewBox="0 0 16 28" fill="currentColor">
          <rect x="2" y="0" width="12" height="28" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      value: '16:9',
      name: 'Widescreen',
      description: 'YouTube/TV',
      icon: (
        <svg className="w-7 h-4" viewBox="0 0 28 16" fill="currentColor">
          <rect x="0" y="2" width="28" height="12" rx="2" className="fill-gray-300" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {aspectRatios.map((ratio) => (
        <Button
          key={ratio.value}
          variant={selectedRatio === ratio.value ? 'solid' : 'flat'}
          color={selectedRatio === ratio.value ? 'primary' : 'default'}
          className={`h-auto p-3 flex flex-col items-center gap-2 ${selectedRatio === ratio.value ? 'hover:opacity-90' : 'hover:bg-gray-100'}`}
          onClick={() => onRatioChange(ratio.value)}
        >
          <div className="flex items-center justify-center">
            {ratio.icon}
          </div>
          <div className="text-center">
            <div className={`text-sm font-medium ${selectedRatio === ratio.value ? 'text-primary-700' : 'text-gray-900'}`}>{ratio.name}</div>
            <div className={`text-xs ${selectedRatio === ratio.value ? 'text-primary-600' : 'text-gray-500'}`}>{ratio.value}</div>
            <div className={`text-xs ${selectedRatio === ratio.value ? 'text-primary-500' : 'text-gray-400'}`}>{ratio.description}</div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default AspectRatioSelector;