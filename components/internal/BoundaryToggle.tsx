'use client';

import { Eye, EyeOff, Zap } from 'lucide-react';
import Button from '../ui/Button';
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
    <Button
      className="hidden gap-2 px-3 py-2 text-xs font-semibold tracking-wide md:flex"
      variant="secondary"
      onClick={toggleMode}
      title={`Switch to ${getNextMode(mode)} boundaries`}
    >
      {getIcon(mode)}
      {getLabel(mode).toUpperCase()}
    </Button>
  );
}
