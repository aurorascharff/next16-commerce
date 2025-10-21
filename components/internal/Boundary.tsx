'use client';

import React, { useRef, useEffect, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setIsSmall(width < 60 || height < 60);
      }
    };

    checkSize();
    const resizeObserver = new ResizeObserver(checkSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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

  // If the content is small, show just a small dashed circle
  if (isSmall) {
    let circleColorClasses = '';

    if (showRendering) {
      circleColorClasses =
        rendering === 'dynamic' ? 'border-blue-500' : rendering === 'hybrid' ? 'border-purple-500' : 'border-red-500';
    } else if (showComponent) {
      circleColorClasses =
        hydration === 'client' ? 'border-blue-500' : hydration === 'hybrid' ? 'border-purple-500' : 'border-red-500';
    }

    return (
      <div className="relative">
        <div ref={containerRef}>{children}</div>
        <div
          className={cn('absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-dashed', circleColorClasses)}
          title={labelText || 'Boundary indicator'}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('relative rounded-md border-2 border-dashed', colorClasses)}>
      {showLabel && labelText && (
        <div className="absolute -top-2 left-2 z-10 flex gap-2">
          <div
            className={cn(
              'rounded border bg-white px-2 py-0.5 font-mono text-xs font-normal lowercase shadow-sm dark:bg-black',
              labelColor,
            )}
          >
            {labelText}
          </div>
          {cached && mode === 'rendering' && (
            <div className="rounded border border-green-500 bg-green-50 px-2 py-0.5 font-mono text-xs font-normal text-green-700 lowercase shadow-sm dark:bg-green-950/20 dark:text-green-300">
              cached
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
