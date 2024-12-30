// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(`${request.nextUrl.origin}/notifications`);
  }

  return NextResponse.next();
}

export const config = {
  //
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
