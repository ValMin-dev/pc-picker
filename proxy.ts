import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = new Set(["/", "/signup", "/login"]);
const AUTH_PAGES = new Set(["/signup", "/login"]);

function hasAuthCookie(request: NextRequest) {
  return Boolean(
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value,
  );
}

function isPublicPath(path: string) {
  if (PUBLIC_PATHS.has(path)) return true;
  if (path.startsWith("/api/")) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = hasAuthCookie(request);

  if (AUTH_PAGES.has(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
