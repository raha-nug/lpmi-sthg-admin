"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addStandarMutu, getDetailStandarMutu } from "../actions";

async function DetailKebijakanMutuPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const standar = await getDetailStandarMutu(id);

  return (
    <>
      <Breadcrumb pageName="Edit Standar Mutu" />
      <ShowcaseSection title="Form Standar Mutu">
        <form action={addStandarMutu} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            required
            defaultValue={standar?.id}
            name="id"
            placeholder="Id"
          />
          <InputGroup
            label="Subject"
            type="text"
            required
            defaultValue={standar?.subject}
            name="subject"
            placeholder="Subject"
          />
          <InputGroup
            label="Link Doc"
            type="text"
            required
            defaultValue={standar?.link_doc}
            name="link_doc"
            placeholder="Link Doc"
          />
          <InputGroup
            label="Tahun Dokumen"
            type="text"
            required
            defaultValue={standar?.year_doc}
            name="year_doc"
            placeholder="Tahun Dokumen"
          />



          <div className="flex justify-end">
            <Button label="Simpan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default DetailKebijakanMutuPage;
