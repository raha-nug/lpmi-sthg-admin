"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FormulirMutu {
  id: string;
  subject: string;
  year_doc: string;
  link_doc: string;
}

interface FormulirMutuRes {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: FormulirMutu[];
  last_page: number;
}

interface FormulirMutuDetail extends FormulirMutu {
  created_at: string;
  updated_at: string;
}

export async function getFormulirMutu(page: number = 1): Promise<FormulirMutuRes> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listFormulirMutu?page=${page}`,
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

export async function getDetailFormulirMutu(
  id: string,
): Promise<FormulirMutuDetail> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/detailFormulirMutu/${id}`,
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

export async function addFormulirMutu(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createFormulirMutu`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      },
    );

    revalidatePath("/dashboard/mutu/formulir");
    redirect("/dashboard/mutu/formulir");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
