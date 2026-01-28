import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/', '/users'];
const publicRoutes = ['/login'];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 홈 경로는 정확히 매칭
  const isProtectedRoute = protectedRoutes.some((route) => (route === '/' ? path === '/' : path.startsWith(route)));
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  // 낙관적 검사: JWT 토큰 존재 여부만 확인 (DB 조회 X)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 보호 페이지에 비인증 사용자 접근 시
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 공개 페이지에 인증 사용자 접근 시
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
