"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ProfileItem {
  id: string;
  visi: string;
  misi: string;
  tugas_fungsi: string;
  struktur: string;
}

export async function getProfil(): Promise<ProfileItem> {
  const token = (await cookies()).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/profilLPMI`,
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

export async function addProfil(formData: FormData): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value ?? "";

  try {
    const payload = {
      id: formData.get("id"),
      visi: formData.get("visi"),
      misi: formData.get("misi"),
      tugas_fungsi: formData.get("tugas_fungsi"),
      struktur: formData.get("struktur"),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/createAndUpdateProfilLPMI`,
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

    revalidatePath("/dashboard/management/profil");
    redirect("/dashboard/management/profil");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}
