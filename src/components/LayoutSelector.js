import React from 'react';
import { Button } from '@heroui/react';

const LayoutSelector = ({ selectedLayout, onLayoutChange }) => {
  const layouts = [
    {
      type: 'diptych',
      variant: 'horizontal',
      name: 'Diptych - Side by Side',
      icon: (
        <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
          <rect x="0" y="0" width="15" height="24" rx="2" className="fill-gray-300" />
          <rect x="17" y="0" width="15" height="24" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      type: 'diptych',
      variant: 'vertical',
      name: 'Diptych - Stacked',
      icon: (
        <svg className="w-6 h-8" viewBox="0 0 24 32" fill="currentColor">
          <rect x="0" y="0" width="24" height="15" rx="2" className="fill-gray-300" />
          <rect x="0" y="17" width="24" height="15" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      type: 'triptych',
      variant: 'horizontal',
      name: 'Triptych - Three Horizontal',
      icon: (
        <svg className="w-12 h-6" viewBox="0 0 48 24" fill="currentColor">
          <rect x="0" y="0" width="15" height="24" rx="2" className="fill-gray-300" />
          <rect x="16.5" y="0" width="15" height="24" rx="2" className="fill-gray-300" />
          <rect x="33" y="0" width="15" height="24" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      type: 'triptych',
      variant: 'vertical',
      name: 'Triptych - Three Vertical',
      icon: (
        <svg className="w-6 h-12" viewBox="0 0 24 48" fill="currentColor">
          <rect x="0" y="0" width="24" height="15" rx="2" className="fill-gray-300" />
          <rect x="0" y="16.5" width="24" height="15" rx="2" className="fill-gray-300" />
          <rect x="0" y="33" width="24" height="15" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      type: 'triptych',
      variant: 'left-large',
      name: 'Triptych - Large Left',
      icon: (
        <svg className="w-10 h-8" viewBox="0 0 40 32" fill="currentColor">
          <rect x="0" y="0" width="24" height="32" rx="2" className="fill-gray-300" />
          <rect x="26" y="0" width="14" height="15" rx="2" className="fill-gray-300" />
          <rect x="26" y="17" width="14" height="15" rx="2" className="fill-gray-300" />
        </svg>
      )
    },
    {
      type: 'triptych',
      variant: 'right-large',
      name: 'Triptych - Large Right',
      icon: (
        <svg className="w-10 h-8" viewBox="0 0 40 32" fill="currentColor">
          <rect x="0" y="0" width="14" height="15" rx="2" className="fill-gray-300" />
          <rect x="0" y="17" width="14" height="15" rx="2" className="fill-gray-300" />
          <rect x="16" y="0" width="24" height="32" rx="2" className="fill-gray-300" />
        </svg>
      )
    }
  ];

  const isSelected = (layout) => {
    return selectedLayout.type === layout.type && selectedLayout.variant === layout.variant;
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {layouts.map((layout) => (
        <Button
          key={`${layout.type}-${layout.variant}`}
          variant={isSelected(layout) ? 'solid' : 'flat'}
          color={isSelected(layout) ? 'primary' : 'default'}
          className={`h-auto p-3 flex flex-col items-center gap-2 ${isSelected(layout) ? 'hover:opacity-90' : 'hover:bg-gray-100'}`}
          onClick={() => onLayoutChange({ type: layout.type, variant: layout.variant })}
        >
          <div className="flex items-center justify-center">
            {layout.icon}
          </div>
          <span className="text-xs text-center leading-tight">
            {layout.name}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default LayoutSelector;