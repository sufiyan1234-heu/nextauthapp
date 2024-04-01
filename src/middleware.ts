import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; //to get current path

  const isPublic =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token");

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/aboutme", "/profile"],
};
