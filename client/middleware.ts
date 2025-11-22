import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // The user has requested to remove Supabase authentication.
  // The dashboard routes are currently unprotected.
  // You can add your own authentication logic here in the future.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
