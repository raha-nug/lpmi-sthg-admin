"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function addGaleri(formData: FormData): Promise<void> {
  try {
    const title = formData.get("title");
    const event_date = formData.get("event_date");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!title || !event_date || !description) {
      throw new Error("Semua field wajib diisi.");
    }

    if (!(image instanceof File)) {
      throw new Error("File gambar tidak valid.");
    }

    const token = (await cookies()).get("accessToken")?.value ?? "";
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

    revalidatePath("/dashboard/cms/galeri");
    redirect("/dashboard/cms/galeri");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}

async function AddGaleriPage() {
  return (
    <>
      <Breadcrumb pageName="Tambahkan berita" />
      <ShowcaseSection title="Form berita">
        <form action={addGaleri} className="space-y-3">
          <InputGroup
            label="Judul"
            type="text"
            name="title"
            placeholder="Judul"
          />
          <InputGroup
            label="Tanggal"
            type="date"
            name="event_date"
            placeholder="Tanggal"
          />
          <InputGroup label="Gambar" type="file" name="image" />

          <TextAreaGroup
            label="Deskripsi"
            name="description"
            placeholder="Masukan deskripsi.."
          />

          <div className="flex justify-end">
            <Button label="Luncurkan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default AddGaleriPage;
