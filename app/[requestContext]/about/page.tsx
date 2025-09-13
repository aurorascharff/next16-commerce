import Link from 'next/link';
import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { encodeRequestContext, getRequestContext, type RequestContextData } from '@/utils/request-context';
import type { Route } from 'next';

export async function generateStaticParams() {
  const contexts: RequestContextData[] = [{ loggedIn: false }, { loggedIn: true }];

  return contexts.map(context => {
    return {
      requestContext: encodeRequestContext(context),
    };
  });
}

export default async function AboutPage({ params }: { params: Promise<{ requestContext: string }> }) {
  const { loggedIn } = getRequestContext(await params);

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1>About Our Store</h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Welcome to our modern e-commerce experience</p>
          </div>
          <div className="text-center">
            <Link href={loggedIn ? ('/' as Route) : ('/sign-in' as Route)}>
              <Button>Start Shopping</Button>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <h2>Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We&apos;re dedicated to providing high-quality products with an exceptional shopping experience. Our
                platform combines modern technology with user-friendly design to make your shopping journey as smooth as
                possible.
              </p>
            </Card>
            <Card>
              <h2>What We Offer</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>• Curated selection of premium products</p>
                <p>• Fast and reliable shipping</p>
                <p>• Excellent customer support</p>
                <p>• Secure payment processing</p>
                <p>• User-friendly browsing and search features</p>
              </div>
            </Card>
            <Card>
              <h2>Technology</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Built with Next.js 15, our platform leverages the latest web technologies including React Server
                Components, advanced caching with the &quot;use cache&quot; directive, and modern database management
                with Prisma. This ensures fast loading times and a seamless user experience.
              </p>
            </Card>
            <Card>
              <h2>Get in Touch</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Have questions or feedback? We&apos;d love to hear from you. Feel free to browse our products or reach
                out to our support team for assistance.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
