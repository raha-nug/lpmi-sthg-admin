"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteFunc(id: string, path:string, folder:string) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/delete${path}/${id}`,
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
    throw new Error(data.message || "Gagal menghapus data");
  }

  const cleanPath = path.replace(/mutu/gi, "").toLowerCase();

  redirect(`/dashboard/${folder}/${cleanPath}`);
}
