import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // If accessing admin routes, check if user has admin role
    if (isAdminRoute && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login?error=unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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
