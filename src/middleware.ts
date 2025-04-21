// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  console.log('middleware', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  //
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
