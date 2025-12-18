"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addNews } from "../actions";

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
            required
          />
          <InputGroup
            label="Type"
            className="hidden"
            type="text"
            name="type"
            defaultValue="berita"
            placeholder="Berita"
            required
          />
          <InputGroup label="Gambar" type="file" name="image" required />

          <TextAreaGroup
            label="Konten"
            name="content"
            placeholder="Masukan konten.."
            required
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
