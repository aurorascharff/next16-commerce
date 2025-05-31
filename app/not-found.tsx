import React from 'react';

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Page Not Found</p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
    </div>
  );
}
