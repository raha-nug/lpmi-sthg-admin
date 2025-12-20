"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addStandarMutu } from "../actions";

async function AddStandarMutuPage() {
  return (
    <>
      <Breadcrumb pageName="Tambahkan Standar Mutu" />
      <ShowcaseSection title="Form Standar Mutu">
        <form action={addStandarMutu} className="space-y-3">
          <InputGroup
            required
            label="Subject"
            type="text"
            name="subject"
            placeholder="Subject"
          />
          <InputGroup
            required
            label="Link Doc"
            type="text"
            name="link_doc"
            placeholder="Link Doc"
          />
          <InputGroup
            required
            label="Tahun Dokumen"
            type="text"
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

export default AddStandarMutuPage;
