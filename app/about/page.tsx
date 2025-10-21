import { ArrowRight, Award, Gift, Package, RefreshCw, Shield, Truck } from 'lucide-react';
import React from 'react';
import Card from '@/components/ui/Card';
import Divider from '@/components/ui/Divider';
import LinkButton from '@/components/ui/LinkButton';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16">
      <div className="space-y-6 text-center">
        <span className="mb-4 inline-block w-fit bg-black px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase dark:bg-white dark:text-black">
          About Us
        </span>
        <h1 className="text-4xl font-bold tracking-tight uppercase md:text-5xl">Premium Electronics & Services</h1>
        <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-400">
          Your trusted partner for cutting-edge technology and exceptional service.
        </p>
        <LinkButton variant="primary" href="/">
          Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
        </LinkButton>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={<Award className="h-8 w-8" />}
          title="Price Match Guarantee"
          description="Found a lower price? We'll match it and beat it by 5%."
          badge="Best Price"
        />
        <ServiceCard
          icon={<Truck className="h-8 w-8" />}
          title="Free Delivery"
          description="Complimentary shipping on orders over $50 with same-day processing."
          badge="Free Shipping"
        />
        <ServiceCard
          icon={<RefreshCw className="h-8 w-8" />}
          title="Trade-In Program"
          description="Get instant credit towards your next purchase with our certified appraisal."
          badge="Instant Credit"
        />
        <ServiceCard
          icon={<Shield className="h-8 w-8" />}
          title="24/7 Support"
          description="Expert technical support available around the clock."
          badge="Expert Help"
        />
        <ServiceCard
          icon={<Package className="h-8 w-8" />}
          title="Easy Returns"
          description="30-day hassle-free returns with free return shipping."
          badge="30-Day Policy"
        />
        <ServiceCard
          icon={<Gift className="h-8 w-8" />}
          title="Gift Cards"
          description="Perfect for tech enthusiasts. No expiration date, digital delivery available."
          badge="No Expiry"
        />
      </div>
      <Divider variant="dotted" />
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight uppercase">Built for Excellence</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Our platform leverages Next.js 15 with advanced caching for lightning-fast performance and seamless shopping
            experiences.
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <StatCard number="50K+" label="Happy Customers" />
            <StatCard number="99.9%" label="Uptime" />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight uppercase">Our Promise</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Quality products, exceptional service, and customer satisfaction are the pillars of our business.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <LinkButton href="/all" variant="primary">
              Browse Products
            </LinkButton>
            <LinkButton href="/user" variant="secondary">
              Contact Support
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <Card className="relative overflow-hidden pt-12">
      <div className="absolute top-4 right-4">
        <span className="bg-accent/20 text-accent-foreground rounded px-2 py-1 text-xs font-medium">{badge}</span>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-lg bg-black/5 p-3 dark:bg-white/10">{icon}</div>
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold tracking-tight">{number}</div>
      <div className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">{label}</div>
    </div>
  );
}
