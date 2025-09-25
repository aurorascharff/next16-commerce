'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { useBoundaryMode } from './BoundaryProvider';

type RenderingType = 'static' | 'dynamic' | 'hybrid';
type HydrationType = 'server' | 'client' | 'hybrid';

type Props = {
  children: React.ReactNode;
  rendering?: RenderingType;
  hydration?: HydrationType;
  label?: string;
  showLabel?: boolean;
  cached?: boolean;
};

const renderingColors = {
  dynamic: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20',
  hybrid: 'border-purple-500 bg-purple-50 dark:bg-purple-950/20',
  static: 'border-red-500 bg-red-50 dark:bg-red-950/20',
} as const;

const componentColors = {
  client: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20',
  hybrid: 'border-purple-500 bg-purple-50 dark:bg-purple-950/20',
  server: 'border-red-500 bg-red-50 dark:bg-red-950/20',
} as const;

export default function Boundary({ children, rendering, hydration, label, showLabel = true, cached = false }: Props) {
  const { mode } = useBoundaryMode();

  if (mode === 'off') {
    return <>{children}</>;
  }

  const showRendering = mode === 'rendering' && rendering;
  const showComponent = mode === 'hydration' && hydration;

  if (!showRendering && !showComponent) {
    return <>{children}</>;
  }

  let colorClasses = '';
  let labelText = '';
  let labelColor = '';

  if (showRendering) {
    colorClasses = renderingColors[rendering!];
    if (showLabel) {
      labelText = label || `${rendering} rendering`;
      labelColor =
        rendering === 'dynamic'
          ? 'text-blue-700 dark:text-blue-300'
          : rendering === 'hybrid'
            ? 'text-purple-700 dark:text-purple-300'
            : 'text-red-700 dark:text-red-300';
    }
  } else if (showComponent) {
    colorClasses = componentColors[hydration!];
    if (showLabel) {
      labelText = label || `${hydration} component`;
      labelColor =
        hydration === 'client'
          ? 'text-blue-700 dark:text-blue-300'
          : hydration === 'hybrid'
            ? 'text-purple-700 dark:text-purple-300'
            : 'text-red-700 dark:text-red-300';
    }
  }

  return (
    <div
      className={cn('relative rounded-md border-2 border-dashed', colorClasses)}
      style={{ padding: '2px 2px 2px 2px', paddingTop: '24px' }}
    >
      {showLabel && labelText && (
        <div className="absolute -top-2 left-2 flex gap-2">
          <div
            className={cn(
              'rounded border bg-white px-2 py-0.5 font-mono text-xs lowercase shadow-sm dark:bg-black',
              labelColor,
            )}
          >
            {labelText}
          </div>
          {cached && mode === 'rendering' && (
            <div className="rounded border border-green-500 bg-green-50 px-2 py-0.5 font-mono text-xs text-green-700 lowercase shadow-sm dark:bg-green-950/20 dark:text-green-300">
              cached
            </div>
          )}
        </div>
      )}
      <div className="contents" style={{ margin: '-2px -2px -2px -2px', marginTop: '-24px' }}>
        {children}
      </div>
    </div>
  );
}
