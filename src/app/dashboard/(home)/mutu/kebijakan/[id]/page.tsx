"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addKebijakanMutu, getDetailKebijakanMutuById } from "../actions";

async function DetailKebijakanMutuPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const kebijakan = await getDetailKebijakanMutuById(id);

  return (
    <>
      <Breadcrumb pageName="Edit Kebijakan Mutu" />
      <ShowcaseSection title="Form Kebijakan Mutu">
        <form action={addKebijakanMutu} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            required
            defaultValue={kebijakan?.id}
            name="id"
            placeholder="Id"
          />
          <InputGroup
            label="Subject"
            type="text"
            required
            defaultValue={kebijakan?.subject}
            name="subject"
            placeholder="Subject"
          />
          <InputGroup
            label="Link Doc"
            type="text"
            required
            defaultValue={kebijakan?.link_doc}
            name="link_doc"
            placeholder="Link Doc"
          />

          <TextAreaGroup
            label="Deskripsi"
            name="description"
            defaultValue={kebijakan.description}
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

export default DetailKebijakanMutuPage;
