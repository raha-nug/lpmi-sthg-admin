"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addProfil, getProfil } from "../actions";

async function AddProfilPage() {
  const profil = await getProfil();
  return (
    <>
      <Breadcrumb pageName="Tambahkan berita" />
      <ShowcaseSection title="Form berita">
        <form action={addProfil} className="space-y-3">
          <InputGroup
            required
            label="ID"
            type="text"
            name="id"
            defaultValue={profil?.id}
            className="hidden"
            placeholder="ID"
          />
          <InputGroup
            required
            label="Visi"
            type="text"
            name="visi"
            defaultValue={profil?.visi}
            placeholder="Visi"
          />

          <TextAreaGroup
            label="Misi"
            name="misi"
            placeholder="Masukan misi.."
            defaultValue={profil?.misi}
            required
          />
          <TextAreaGroup
            label="Tugas Fungsi"
            name="tugas_fungsi"
            placeholder="Masukan tugas dan fungsi.."
            defaultValue={profil?.tugas_fungsi}
            required
          />
          <InputGroup
            required
            label="Struktur"
            type="text"
            name="struktur"
            defaultValue={profil?.struktur}
            placeholder="Struktur"
          />

          <div className="flex justify-end">
            <Button label="Simpan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default AddProfilPage;
