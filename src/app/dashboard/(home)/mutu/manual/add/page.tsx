"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addManualMutu } from "../actions";

async function AddManualMutuPage() {
  return (
    <>
      <Breadcrumb pageName="Tambahkan Manual Mutu" />
      <ShowcaseSection title="Form Manual Mutu">
        <form action={addManualMutu} className="space-y-3">
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

export default AddManualMutuPage;
