import Link from 'next/link';
import Boundary from './internal/Boundary';
import LinkStatus from './ui/LinkStatus';
import type { SearchParams } from 'next/dist/server/request/search-params';

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: SearchParams;
}) {
  const createPageUrl = (page: number) => {
    const query: Record<string, string> = {};
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) {
        query[key] = value.toString();
      }
    });
    if (page > 1) {
      query.page = page.toString();
    }
    return {
      pathname: '/all',
      query,
    };
  };

  return (
    <Boundary>
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
