import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check for admin credentials in the request headers
  const authHeader = request.headers.get('authorization')
  
  // For API routes, enforce authentication
  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    // In a real app, you would validate against stored credentials
    // For this example, we'll use a hardcoded admin token
    const validAdminToken = process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || 'admin-token-secret'
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
    
    const token = authHeader.split(' ')[1]
    
    if (token !== validAdminToken) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid authentication token' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
  }
  
  // For non-API routes (UI pages), we could implement session-based auth
  // For this example, we'll allow access to all UI pages
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Apply middleware to all API routes except webhooks
    '/api/v1/:path*',
    // Exclude webhooks from authentication
    '/((?!api/webhooks).*)',
  ],
}