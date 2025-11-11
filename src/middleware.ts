import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isAdminLoginPage = req.nextUrl.pathname === '/admin/login';

  console.log('Middleware - Path:', req.nextUrl.pathname);
  console.log('Middleware - Token:', !!token);
  console.log('Middleware - Is Admin Route:', isAdminRoute);
  console.log('Middleware - User Role:', (token as any)?.role);

  // Allow access to admin login page without authentication
  if (isAdminLoginPage) {
    return NextResponse.next();
  }

  // If accessing admin routes
  if (isAdminRoute) {
    // No token - redirect to admin login
    if (!token) {
      console.log('Middleware - No token, redirecting to admin login');
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Has token but not admin role - redirect to admin login with error
    if ((token as any).role !== 'admin') {
      console.log('Middleware - Not admin, redirecting to admin login');
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      loginUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/',
    '/admin/login',
    '/admin/dashboard/:path*',
    '/admin/products/:path*',
    '/admin/orders/:path*',
    '/admin/users/:path*',
    '/admin/reviews/:path*',
    '/admin/blog/:path*',
    '/admin/test-image-gen/:path*',
  ],
};
