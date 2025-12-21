// actions.ts
"use server";

import { cookies } from "next/headers";

export async function resetPassword(formData: FormData) {
  try {
    const payload = {
      password: formData.get("password"),
      old_password: formData.get("old_password"),
      password_confirmation: formData.get("password_confirmation"),
    };

    const token = (await cookies()).get("accessToken")?.value ?? "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/auth/resetPassword`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message };
    }

    return { success: true, message: "Password berhasil diubah" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
