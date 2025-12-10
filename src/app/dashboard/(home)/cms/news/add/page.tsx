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

export async function addNews(formData: FormData): Promise<void> {
  try {
    const title = formData.get("title");
    const type = formData.get("type");
    const content = formData.get("content");
    const image = formData.get("image");

    if (!title || !type || !content) {
      throw new Error("Semua field wajib diisi.");
    }

    if (!(image instanceof File)) {
      throw new Error("File gambar tidak valid.");
    }

    const token = (await cookies()).get("accessToken")?.value ?? "";
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

    revalidatePath("/dashboard/cms/news");
    redirect("/dashboard/cms/news");
  } catch (err: any) {
    // Jangan blok redirect
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;

    throw new Error(err.message || "Terjadi kesalahan.");
  }
}

async function AddNewsPage() {
  return (
    <>
      <Breadcrumb pageName="Tambahkan berita" />
      <ShowcaseSection title="Form berita">
        <form action={addNews} className="space-y-3">
          <InputGroup
            label="Judul"
            type="text"
            name="title"
            placeholder="Judul"
          />
          <InputGroup
            label="Type"
            type="text"
            name="type"
            placeholder="Berita"
          />
          <InputGroup label="Gambar" type="file" name="image" />

          <TextAreaGroup
            label="Konten"
            name="content"
            placeholder="Masukan konten.."
          />

          <div className="flex justify-end">
            <Button label="Luncurkan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default AddNewsPage;
