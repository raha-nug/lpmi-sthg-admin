import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addGaleri, getGaleriById } from "../actions";
interface PageProps {
  params: Promise<{ id: string }>;
}
async function DetailGaleriPage({ params }: PageProps) {
  const { id } = await params;
  const galeri = await getGaleriById(id);

  return (
    <>
      <Breadcrumb pageName="Edit Galeri" />
      <ShowcaseSection title="Form galeri">
        <form action={addGaleri} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            required
            defaultValue={galeri.id}
            name="id"
            placeholder="Id"
          />
          <InputGroup
            label="Judul"
            type="text"
            required
            defaultValue={galeri.title}
            name="title"
            placeholder="Judul"
          />
          <InputGroup
            label="Type"
            type="date"
            required
            defaultValue={galeri.event_date}
            name="event_date"
            placeholder="Galeri"
          />
          <InputGroup label="Gambar" type="file" name="image" required />

          <TextAreaGroup
            label="Konten"
            name="description"
            defaultValue={galeri.description}
            placeholder="Masukan konten.."
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

export default DetailGaleriPage;
