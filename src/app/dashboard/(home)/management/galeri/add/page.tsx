"use client"; // Gunakan Client Component untuk interaksi Swal

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import React from "react";
import { addGaleri } from "../actions";
import { SubmitButton } from "@/components/FormElements/SubmitButton";
import Swal from "sweetalert2";

export default function AddGaleriPage() {
  // Wrapper Action untuk Client-side handling
  async function handleSubmit(formData: FormData) {
    const result = await addGaleri(formData);

    if (result?.success) {
      Swal.fire({
        icon: "success",
        title: "Tersimpan!",
        text: "Data galeri berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Redirect manual setelah sukses
        window.location.href = "/dashboard/management/galeri";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result?.message || "Terjadi kesalahan saat menyimpan data.",
      });
    }
  }

  return (
    <>
      <Breadcrumb pageName="Tambahkan Galeri" />
      <ShowcaseSection title="Form Galeri">
        <form action={handleSubmit} className="space-y-3">
          <InputGroup
            required
            label="Judul"
            type="text"
            name="title"
            placeholder="Judul"
          />
          <InputGroup
            required
            label="Tanggal"
            type="date"
            name="event_date"
            placeholder="Tanggal"
          />
          <InputGroup label="Gambar" type="file" name="image" required />

          <TextAreaGroup
            label="Deskripsi"
            name="description"
            placeholder="Masukan deskripsi.."
            required
          />

          <div className="flex justify-end pt-4">
            <SubmitButton />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}
