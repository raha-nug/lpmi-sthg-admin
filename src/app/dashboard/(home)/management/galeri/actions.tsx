"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface GaleriItem {
  id: string;
  title: string;
  image: string;
  description: string;
  event_date: string;
}

interface galeriResponse {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: GaleriItem[];
  last_page: number;
}

interface GaleriDetail extends GaleriItem {
  created_at: string;
  updated_at: string;
}

export async function getGaleri(page: number = 1): Promise<galeriResponse> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listGaleri?page=${page}`,
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

export async function getGaleriById(id: string): Promise<GaleriDetail> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/detailGaleri/${id}`,
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

export async function addGaleri(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createGaleri`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      },
    );

    revalidatePath("/dashboard/management/galeri");
    redirect("/dashboard/management/galeri");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
