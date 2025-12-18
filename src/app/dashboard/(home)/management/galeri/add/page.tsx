"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addGaleri } from "../actions";

async function AddGaleriPage() {
  return (
    <>
      <Breadcrumb pageName="Tambahkan berita" />
      <ShowcaseSection title="Form berita">
        <form action={addGaleri} className="space-y-3">
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

          <div className="flex justify-end">
            <Button label="Simpan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default AddGaleriPage;
