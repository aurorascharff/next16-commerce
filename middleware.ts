import { NextResponse } from 'next/server';
import { encodeRequestContext } from '@/utils/request-context';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const encodedContext = encodeRequestContext({
    loggedIn: !!request.cookies.get('selectedAccountId')?.value,
  });

  const internalPath = pathname === '/' ? `/${encodedContext}` : `/${encodedContext}${pathname}`;
  const url = new URL(internalPath, request.url);
  url.search = request.nextUrl.search;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
