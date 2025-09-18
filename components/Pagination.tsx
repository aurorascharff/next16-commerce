import Link from 'next/link';
import Boundary from './internal/Boundary';
import LinkStatus from './ui/LinkStatus';

export default function Pagination({
  currentPage,
  totalPages,
  searchQuery,
  sort,
  category,
}: {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  sort?: 'asc' | 'desc';
  category?: string;
}) {
  const createPageUrl = (page: number) => {
    return {
      pathname: '/all',
      query: {
        ...(searchQuery && { q: searchQuery }),
        ...(sort && { sort }),
        ...(category && { category }),
        ...(page > 1 && { page: page.toString() }),
      },
    };
  };

  return (
    <Boundary hydration="hybrid">
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <Link
            scroll={false}
            href={createPageUrl(currentPage - 1)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium"
          >
            <LinkStatus>Previous</LinkStatus>
          </Link>
        )}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => {
            return i + 1;
          }).map(page => {
            return (
              <Link scroll={false} key={page} href={createPageUrl(page)}>
                <LinkStatus
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                    page === currentPage
                      ? 'bg-primary text-white dark:text-black'
                      : 'text-primary hover:text-primary-dark'
                  }`}
                  variant="background"
                >
                  {page}
                </LinkStatus>
              </Link>
            );
          })}
        </div>
        {currentPage < totalPages && (
          <Link
            scroll={false}
            href={createPageUrl(currentPage + 1)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium"
          >
            <LinkStatus>Next</LinkStatus>
          </Link>
        )}
      </div>
    </Boundary>
  );
}
