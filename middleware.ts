import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "pineup_token"
    );

  const isAuthPage =
    request.nextUrl.pathname.startsWith(
      "/login"
    ) ||
    request.nextUrl.pathname.startsWith(
      "/register"
    );

  if (
    !token &&
    !isAuthPage
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher:[
 "/feed/:path*",
 "/profile/:path*",
 "/bookmarks/:path*",
 "/notifications/:path*",
 "/settings/:path*",
 "/posts/:path*",
 "/search/:path*",
 "/suggestions/:path*"
]
};