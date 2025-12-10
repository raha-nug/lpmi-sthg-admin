import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    // jika backend login gagal
    if (!data.status) {
      return NextResponse.json(
        { status: false, message: data.message ?? "Login gagal" },
        { status: 401 }
      );
    }

    const token = data.token;
    const role = data.role;

    const response = NextResponse.json(
      { success: true, message: "Login berhasil" }
    );

    // set cookie token
    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.set("role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
        error: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
