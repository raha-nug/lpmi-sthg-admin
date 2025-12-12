// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
    const { pathname } = req.nextUrl;

    console.log(pathname)

  // Redirect otomatis dari "/" ke "/auth/sign-in"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
  // kalau belum login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"], // halaman yang diproteksi
};
