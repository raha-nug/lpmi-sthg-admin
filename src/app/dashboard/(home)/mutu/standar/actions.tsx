"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface StandarMutu {
  id: string;
  subject: string;
  year_doc: string;
  link_doc: string;
}

interface StandarMutuRes {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: StandarMutu[];
  last_page: number;
}

interface StandarMutuDetail extends StandarMutu {
  created_at: string;
  updated_at: string;
}

export async function getStandarMutu(
  page: number = 1,
): Promise<StandarMutuRes> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listStandarMutu?page=${page}`,
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

export async function getDetailStandarMutu(
  id: string,
): Promise<StandarMutuDetail> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/detailStandarMutu/${id}`,
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

export async function addStandarMutu(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createStandarMutu`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      },
    );

    console.log(await res.json())

    revalidatePath("/dashboard/mutu/standar");
    redirect("/dashboard/mutu/standar");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
