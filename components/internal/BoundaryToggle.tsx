'use client';

import { Eye, EyeOff, Zap } from 'lucide-react';
import React from 'react';
import { useBoundaryMode } from './BoundaryProvider';
import type { BoundaryMode } from './BoundaryProvider';

const getNextMode = (mode: BoundaryMode) => {
  if (mode === 'off') return 'rendering';
  if (mode === 'rendering') return 'hydration';
  return 'off';
};

const getIcon = (mode: BoundaryMode) => {
  switch (mode) {
    case 'off':
      return <EyeOff className="size-4" />;
    case 'rendering':
      return <Eye className="size-4" />;
    case 'hydration':
      return <Zap className="size-4" />;
    default:
      return <EyeOff className="size-4" />;
  }
};

const getLabel = (mode: BoundaryMode) => {
  switch (mode) {
    case 'off':
      return 'Off';
    case 'rendering':
      return 'Rendering';
    case 'hydration':
      return 'Hydration';
    default:
      return 'Off';
  }
};

export default function BoundaryToggle() {
  const { toggleMode, mode } = useBoundaryMode();

  return (
    <button
      onClick={toggleMode}
      className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      title={`Switch to ${getNextMode(mode)} boundaries`}
    >
      {getIcon(mode)}
      {getLabel(mode)}
    </button>
  );
}
