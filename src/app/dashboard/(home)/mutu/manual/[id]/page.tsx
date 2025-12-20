"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addManualMutu, getDetailManualMutu } from "../actions";

async function DetailManualMutuPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const manual = await getDetailManualMutu(id);

  return (
    <>
      <Breadcrumb pageName="Edit Manual Mutu" />
      <ShowcaseSection title="Form Manual Mutu">
        <form action={addManualMutu} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            required
            defaultValue={manual?.id}
            name="id"
            placeholder="Id"
          />
          <InputGroup
            label="Subject"
            type="text"
            required
            defaultValue={manual?.subject}
            name="subject"
            placeholder="Subject"
          />
          <InputGroup
            label="Link Doc"
            type="text"
            required
            defaultValue={manual?.link_doc}
            name="link_doc"
            placeholder="Link Doc"
          />
          <InputGroup
            label="Tahun Dokumen"
            type="text"
            required
            defaultValue={manual?.year_doc}
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

export default DetailManualMutuPage;
