"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Mutu {
  id: string;
  subject: string;
  description: string;
  link_doc: string;
}

interface KebijakanMutuRes {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: Mutu[];
  last_page: number;
}

interface MutuDetail extends Mutu {
  created_at: string;
  updated_at: string;
}

export async function getKebijakanMutu(
  page: number = 1,
): Promise<KebijakanMutuRes> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listKebijakanMutu?page=${page}`,
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

export async function getDetailKebijakanMutuById(
  id: string,
): Promise<MutuDetail> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/detailKebijakanMutu/${id}`,
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

export async function addKebijakanMutu(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createKebijakanMutu`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      },
    );

    revalidatePath("/dashboard/mutu/kebijakan");
    redirect("/dashboard/mutu/kebijakan");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
