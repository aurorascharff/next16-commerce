import { NextResponse } from 'next/server';
import { encodeRequestContext } from '@/utils/request-context';
import type { NextRequest } from 'next/server';

function isUserAuthenticated(request: NextRequest): boolean {
  return !!request.cookies.get('selectedAccountId')?.value;
}

export function middleware(request: NextRequest) {
  /**
   * Examples of other data you could include in the encoded context:
   *
   *   locale?: string;              // 'en', 'no', 'sv' - for internationalization
   *   theme?: 'light' | 'dark';     // user theme preference
   *   userType?: 'b2c' | 'b2b';     // business vs consumer
   *   debugMode?: boolean;          // for development/testing
   *   featureFlags?: string[];      // ['newCheckout', 'betaFeatures']
   *   region?: string;              // 'eu', 'us', 'asia' - for regional content
   *   currency?: string;            // 'USD', 'EUR', 'NOK' - for pricing
   *   experiments?: Record<string, string>; // A/B testing variants
   */
  const encodedContext = encodeRequestContext({
    loggedIn: isUserAuthenticated(request),
  });

  // Rewrites the request to include the encoded context
  const nextUrl = new URL(`/${encodedContext}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url);

  return NextResponse.rewrite(nextUrl, { request });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any file with an extension
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
