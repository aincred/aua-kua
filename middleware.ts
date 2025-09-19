import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken } from './lib/auth';
import { setSecurityHeaders } from './lib/headers';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value || request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const payload = await validateToken(token);
    const requestedPath = request.nextUrl.pathname;
    const rolePath = `/dashboard/${payload.role}`;

    // Ensure users can only access their role-specific dashboard
    if (!requestedPath.startsWith(rolePath)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.next();
    response.headers.delete('X-Powered-By');
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return setSecurityHeaders(response);
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*'
}