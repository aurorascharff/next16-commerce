export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h1 className="text-primary text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-xl font-semibold">Product Not Found</h2>
      <p className="text-gray mt-4 max-w-md dark:text-gray-400">
        The product you are looking for does not exist or has been moved.
      </p>
    </div>
  );
}
