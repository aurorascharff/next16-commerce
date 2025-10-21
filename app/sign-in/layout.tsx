export default async function SignInLayout({ children }: LayoutProps<'/sign-in'>) {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">Welcome Back</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your account to continue shopping</p>
      </div>
      {children}
    </div>
  );
}
