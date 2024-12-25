import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import { loggingMiddleware } from '@/app/middleware/loggingMiddleware';

export const config = {
  matcher: ['/api/dashboard/:path*','/api/trainer/dashboard/:path*'],
};
export default async function middleware(request: NextRequest) {
  const logResult = loggingMiddleware(request);
  const authResult = await authMiddleware(request);
  if (authResult.status !== 200) {
    console.log("Middleware: Authentication failed");
    return authResult;
  }
  // console.log("Middleware: Authentication successful");
  return authResult;
}