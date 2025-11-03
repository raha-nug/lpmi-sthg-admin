"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNews(formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const image = formData.get("image") as File;
  const content = formData.get("content") as string;

  // Contoh kirim ke API atau database
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/news`, {
    method: "POST",
    body: formData,
  });

  // Misal mau redirect atau revalidate
  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}
