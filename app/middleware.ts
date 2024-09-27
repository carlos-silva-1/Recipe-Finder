import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Redirect to HTTPS if the request is using HTTP
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url);
  }

  // Continue processing the request as usual
  return NextResponse.next();
}

// Specify the paths the middleware should apply to
export const config = {
  matcher: ['/:path*'],  // Apply middleware to all paths
};
