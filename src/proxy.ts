// proxy.ts

import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/home",
    "/auth/signin",
    "/auth/register",
    "/examples",
    "/examples/accessibility",
    "/examples/seo",
    "/examples/web-vitals",
  ]
  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/examples/")

  // Define auth routes (signin, register)
  const authRoutes = ["/auth/signin", "/auth/register"]
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // If user is logged in and tries to access auth routes, redirect to dashboard
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  // If user is not logged in and tries to access protected routes, redirect to signin
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl))
  }

  // Allow the request to proceed
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}