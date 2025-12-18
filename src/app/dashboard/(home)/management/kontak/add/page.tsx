"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addContact, getContact } from "../actions";

async function AddContactPage() {
  const kontak = await getContact()
  return (
    <>
      <Breadcrumb pageName="Tambahkan berita" />
      <ShowcaseSection title="Form berita">
        <form action={addContact} className="space-y-3">

          <InputGroup
            required
            label="ID"
            type="text"
            name="id"
            defaultValue={kontak?.id}
            placeholder="ID"
            className="hidden"
          />
          <InputGroup
            required
            label="Email"
            type="email"
            name="email"
            defaultValue={kontak?.email}
            placeholder="Email"
          />
          <InputGroup
            required
            label="No Telepon"
            type="text"
            name="phone"
            defaultValue={kontak?.phone}
            placeholder="Phone"
          />

          <TextAreaGroup
            label="Alamat"
            name="address"
            defaultValue={kontak?.address}
            placeholder="Masukan alamat.."
            required
          />
          <InputGroup
            required
            label="Map url"
            type="text"
            name="map_url"
            defaultValue={kontak?.map_url}
            placeholder="Map url"
          />

          <div className="flex justify-end">
            <Button label="Simpan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default AddContactPage;
