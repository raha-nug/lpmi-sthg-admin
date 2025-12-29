"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import Swal from "sweetalert2";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Button } from "@/components/ui-elements/button";
import { addGaleri } from "../actions";

// Komponen tombol untuk anti-double click
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      label="Simpan"
      shape="rounded"
      type="submit"
      loading={pending}
    />
  );
}

export default function GaleriEditForm({ galeri }: { galeri: any }) {
  const router = useRouter();

  async function handleClientAction(formData: FormData) {
    const result = await addGaleri(formData);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data galeri telah diperbarui.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/dashboard/management/galeri");
        router.refresh();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: result.message || "Terjadi kesalahan.",
      });
    }
  }

  return (
    <form action={handleClientAction} className="space-y-4">
      {/* Hidden ID */}
      <input type="hidden" name="id" defaultValue={galeri.id} />

      <InputGroup
        label="Judul"
        type="text"
        required
        defaultValue={galeri.title}
        name="title"
        placeholder="Masukkan judul galeri"
      />

      <InputGroup
        label="Tanggal Event"
        type="date"
        required
        defaultValue={galeri.event_date}
        name="event_date"
      />

      <div className="space-y-3">
        <label className="block font-medium text-black dark:text-white">
          Gambar Galeri
        </label>

        {galeri.image && (
          <div className="dark:border-strokedark relative mb-3 inline-block overflow-hidden rounded-lg border border-stroke">
            <div className="bg-gray-100 p-2 text-xs font-semibold text-gray-500">
              Gambar Saat Ini:
            </div>
            <div className="relative h-40 w-64">
              <Image
                src={galeri.image}
                alt={galeri.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <InputGroup
          label="Ganti Gambar"
          type="file"
          name="image"
          required
        />

      </div>

      <TextAreaGroup
        label="Deskripsi"
        name="description"
        defaultValue={galeri.description}
        placeholder="Masukkan deskripsi galeri.."
        required
      />

      <div className="flex justify-end pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
