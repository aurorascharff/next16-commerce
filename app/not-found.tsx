import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg text-center">
      <h1 className="text-primary text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl font-semibold">Page Not Found</p>
      <p className="text-gray dark:text-gray mt-4 max-w-md">
        The page you are looking for does not exist or has been moved to a different location.
      </p>
    </div>
  );
}
