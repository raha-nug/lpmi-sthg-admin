"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addKebijakanMutu } from "../actions";

async function AddKebijakanMutuPage() {
  return (
    <>
      <Breadcrumb pageName="Tambahkan Kebijakan Mutu" />
      <ShowcaseSection title="Form Kebijakan Mutu">
        <form action={addKebijakanMutu} className="space-y-3">
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

export default AddKebijakanMutuPage;
