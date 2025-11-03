import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import { addNews } from "@/utils/actions";
import React from "react";
import Swal from "sweetalert2";

function AddNewsPage() {
  

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

          <TextAreaGroup label="Konten" placeholder="Masukan konten.." />

          <div className="flex justify-end">
            <Button label="Luncurkan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default AddNewsPage;
