import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const { pathname } = req.nextUrl
      // Add routes that require authentication here
      const protectedPaths = [
        // Add your protected routes here, for example:
        // "/dashboard",
        // "/profile",
      ]
      // Only check auth for protected paths
      return !protectedPaths.some(path => pathname.startsWith(path)) || !!req.auth
    }
  }
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth related paths
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|auth).*)",
  ],
} 