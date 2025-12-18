"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface NewsItem {
  id: string;
  title: string;
  type: string;
  content: string;
  image: string;
  slug: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface NewsResponse {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: NewsItem[];
  last_page: number;
}

export async function getNews(page: number = 1): Promise<NewsResponse> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listNews?page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
      cache: "no-store", // biar selalu fresh (SSR)
    },
  );

  const data = await res.json();

  return data;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/front/detailNews/${slug}`,
    {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
      cache: "no-store", // biar selalu fresh (SSR)
    },
  );

  const data = await res.json();

  return data.data;
}

export async function addNews(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createNews`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      },
    );

    revalidatePath("/dashboard/management/news");
    redirect("/dashboard/management/news");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
