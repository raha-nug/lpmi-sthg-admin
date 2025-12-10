"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteGaleri(id: string) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/deleteGaleri/${id}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Gagal menghapus galeri");
  }

  redirect("/dashboard/cms/galeri");
}
