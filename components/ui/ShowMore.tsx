'use client';

import React, { Children, useState } from 'react';
import Boundary from '../internal/Boundary';

type Props = {
  children: React.ReactNode[];
  className?: string;
  initial?: number;
};

export default function ShowMore({ children, className, initial = 5 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? children : Children.toArray(children).slice(0, initial);
  const remaining = Children.count(children) - initial;

  return (
    <Boundary hydration="client">
      <div>
        <div className={className}>{items}</div>
        {remaining > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                return setExpanded(!expanded);
              }}
              className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
            >
              {expanded ? 'Show Less' : `Show More (${remaining})`}
            </button>
          </div>
        )}
      </div>
    </Boundary>
  );
}
