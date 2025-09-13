import { NextResponse } from 'next/server';
import { encodeRequestContext } from '@/utils/request-context';
import type { NextRequest } from 'next/server';

function isUserAuthenticated(request: NextRequest): boolean {
  return !!request.cookies.get('selectedAccountId')?.value;
}

function isValidRequestContext(segment: string): boolean {
  const jsonString = Buffer.from(segment, 'base64url').toString();
  const data = JSON.parse(jsonString);
  return typeof data === 'object' && typeof data.loggedIn === 'boolean';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check if this is already a requestContext path (internal rewrite)
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (firstSegment && isValidRequestContext(firstSegment)) {
    return NextResponse.next(); // Already internal path, continue
  }

  // This is a clean URL (like /about), rewrite to internal requestContext path
  const encodedContext = encodeRequestContext({
    loggedIn: isUserAuthenticated(request),
  });

  // Rewrite clean URL to internal requestContext path
  const internalPath = pathname === '/' ? `/${encodedContext}` : `/${encodedContext}${pathname}`;
  const url = new URL(internalPath, request.url);
  url.search = request.nextUrl.search;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
