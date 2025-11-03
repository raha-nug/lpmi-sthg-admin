// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // forward ke backend
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json(data);
    }

    // ambil token dari backend response
    const token = data.token;
    const role = data.role;

    // bikin response dan set cookie HttpOnly
    const response = NextResponse.json({ success: true });
    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 jam
    });
    response.cookies.set("role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 jam
    });

    return response;
  } catch (error) {
    NextResponse.json(error);
  }
}
