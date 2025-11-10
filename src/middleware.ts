import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    console.log('Middleware - Path:', req.nextUrl.pathname);
    console.log('Middleware - Token:', token);
    console.log('Middleware - Is Admin Route:', isAdminRoute);
    console.log('Middleware - User Role:', token?.role);

    // If accessing admin routes, check if user has admin role
    if (isAdminRoute && token?.role !== 'admin') {
      console.log('Middleware - Redirecting to login (unauthorized)');
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('error', 'unauthorized');
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Middleware - Authorized callback, token:', !!token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/products/:path*',
    '/admin/orders/:path*',
    '/admin/users/:path*',
    '/admin/reviews/:path*',
    '/admin/blog/:path*',
  ],
};
