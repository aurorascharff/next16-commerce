import { NextResponse } from 'next/server';
import { encodeRequestContext } from '@/utils/request-context';
import type { NextRequest } from 'next/server';

function isValidRequestContext(segment: string): boolean {
  try {
    const jsonString = Buffer.from(segment, 'base64url').toString();
    const data = JSON.parse(jsonString);
    return typeof data === 'object' && typeof data.loggedIn === 'boolean';
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    loggedIn: !!request.cookies.get('selectedAccountId')?.value,
  });

  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (firstSegment && isValidRequestContext(firstSegment)) {
    return NextResponse.next();
  }

  const internalPath = pathname === '/' ? `/${encodedContext}` : `/${encodedContext}${pathname}`;
  const url = new URL(internalPath, request.url);
  url.search = request.nextUrl.search;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
