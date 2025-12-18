"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ContactItem {
  address: string;
  email: string;
  phone: string;
  map_url: string;
  id: string;
}

export async function getContact(): Promise<ContactItem> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/kontak`,
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

export async function addContact(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const payload = {
      id: formData.get("id"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      map_url: formData.get("map_url"),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createAndUpdateKontak`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    revalidatePath("/dashboard/management/kontak");
    redirect("/dashboard/management/kontak");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
