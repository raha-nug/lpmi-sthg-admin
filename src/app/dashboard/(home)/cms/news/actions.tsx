"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteNews(id: string) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/deleteNews/${id}`,
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
    throw new Error(data.message || "Gagal menghapus berita");
  }

  redirect("/dashboard/cms/news");
}
