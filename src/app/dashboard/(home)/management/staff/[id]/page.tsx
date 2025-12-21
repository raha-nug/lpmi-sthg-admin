"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addStaff, getStaffById } from "../actions";
interface PageProps {
  params: Promise<{ id: string }>;
}
async function DetailStaff({ params }: PageProps) {
  const { id } = await params;
  const staff = await getStaffById(id);

  return (
    <>
      <Breadcrumb pageName="Edit Staff" />
      <ShowcaseSection title="Form Staff">
        <form action={addStaff} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            required
            defaultValue={staff.id}
            name="id"
            placeholder="Id"
          />
          <InputGroup
            label="Nama"
            type="text"
            required
            defaultValue={staff.name}
            name="name"
            placeholder="Nama"
          />
          <InputGroup
            label="Posisi"
            type="text"
            required
            defaultValue={staff.position}
            name="position"
            placeholder="Posisi"
          />
          <InputGroup label="Gambar" type="file" name="photo" required />

          <TextAreaGroup
            label="Konten"
            name="bio"
            defaultValue={staff.bio}
            placeholder="Masukan bio.."
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

export default DetailStaff;
