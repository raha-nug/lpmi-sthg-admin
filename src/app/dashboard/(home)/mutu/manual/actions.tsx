"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ManualMutu {
  id: string;
  subject: string;
  year_doc: string;
  link_doc: string;
}

interface ManualMutuRes {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: ManualMutu[];
  last_page: number;
}

interface ManualMutuDetail extends ManualMutu {
  created_at: string;
  updated_at: string;
}

export async function getManualMutu(page: number = 1): Promise<ManualMutuRes> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listManualMutu?page=${page}`,
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

export async function getDetailManualMutu(
  id: string,
): Promise<ManualMutuDetail> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/detailManualMutu/${id}`,
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

export async function addManualMutu(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createManualMutu`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      },
    );

    revalidatePath("/dashboard/mutu/manual");
    redirect("/dashboard/mutu/manual");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
