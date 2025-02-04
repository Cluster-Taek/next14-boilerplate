// middleware.ts
import { NextResponse } from 'next/server';

export async function middleware(): Promise<NextResponse> {
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
