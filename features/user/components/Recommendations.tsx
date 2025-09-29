import Boundary from '@/components/internal/Boundary';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import { getCurrentAccount } from '@/features/auth/auth-queries';
import { getRecommendedProducts } from '../../product/product-queries';

export default async function Recommendations() {
  const currentAccount = await getCurrentAccount();
  if (!currentAccount) {
    return null;
  }

  const recommendedProducts = await getRecommendedProducts(4);
  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <Boundary rendering="dynamic" hydration="server">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {recommendedProducts.map(product => {
          return (
            <ProductCard
              enableQuickPreview
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              badge="For You"
            />
          );
        })}
      </div>
    </Boundary>
  );
}

export function RecommendationsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => {
        return <ProductCardSkeleton key={i} />;
      })}
    </div>
  );
}
