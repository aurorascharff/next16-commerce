'use client';

import React, { Children, useState } from 'react';
import Boundary from '../internal/Boundary';

type ShowMoreProps = {
  children: React.ReactNode[];
  initial?: number;
};

export default function ShowMore({ children, initial = 5 }: ShowMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? children : Children.toArray(children).slice(0, initial);
  const remaining = Children.count(children) - initial;

  return (
    <Boundary hydration="client">
      <div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">{items}</div>
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
