"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addFormulirMutu, getDetailFormulirMutu } from "../actions";
interface PageProps {
  params: Promise<{ id: string }>;
}
async function DetailFormulirMutuPage({ params }: PageProps) {
  const { id } = await params;
  const formulir = await getDetailFormulirMutu(id);

  return (
    <>
      <Breadcrumb pageName="Edit Formulir Mutu" />
      <ShowcaseSection title="Form Formulir Mutu">
        <form action={addFormulirMutu} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            required
            defaultValue={formulir?.id}
            name="id"
            placeholder="Id"
          />
          <InputGroup
            label="Subject"
            type="text"
            required
            defaultValue={formulir?.subject}
            name="subject"
            placeholder="Subject"
          />
          <InputGroup
            label="Link Doc"
            type="text"
            required
            defaultValue={formulir?.link_doc}
            name="link_doc"
            placeholder="Link Doc"
          />
          <InputGroup
            label="Tahun Dokumen"
            type="text"
            required
            defaultValue={formulir?.year_doc}
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

export default DetailFormulirMutuPage;
