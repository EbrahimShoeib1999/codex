import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if we're on a dashboard page
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // Allow access to login page
    if (req.nextUrl.pathname === '/dashboard/login') {
      // If user is already logged in, redirect to dashboard
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return res;
    }

    // Protect all other dashboard routes
    if (!session) {
      return NextResponse.redirect(new URL('/dashboard/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};