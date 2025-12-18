"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addStaff } from "../actions";

async function AddStaffPage() {
  return (
    <>
      <Breadcrumb pageName="Tambahkan berita" />
      <ShowcaseSection title="Form berita">
        <form action={addStaff} className="space-y-3">
          <InputGroup
            required
            label="Nama"
            type="text"
            name="name"
            placeholder="Nama"
          />
          <InputGroup
            required
            label="Posisi"
            type="text"
            name="position"
            placeholder="Posisi"
          />
          <InputGroup label="Foto" type="file" name="photo" required />

          <TextAreaGroup
            label="Bio"
            name="bio"
            placeholder="Masukan Bio.."
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

export default AddStaffPage;
