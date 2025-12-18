"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Staff {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
}

interface StaffResponse {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: Staff[];
  last_page: number;
}

interface StaffDetail extends Staff {
  created_at: string;
  updated_at: string;
}

export async function getStaff(page: number = 1): Promise<StaffResponse> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listStaff?page=${page}`,
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

export async function getStaffById(id: string): Promise<StaffDetail> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/detailStaff/${id}`,
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

export async function addStaff(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createStaff`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(await res.json())

    revalidatePath("/dashboard/management/staff");
    redirect("/dashboard/management/staff");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
