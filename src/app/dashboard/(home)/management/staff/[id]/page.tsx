"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addStaff, getStaffById } from "../actions";
import Image from "next/image";
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
          <div className="space-y-3">
            <label className="block font-medium text-black dark:text-white">
              Foto
            </label>
            {/* Pratinjau Gambar Sebelumnya */}
            {staff.photo && (
              <div className="dark:border-strokedark relative mb-3 inline-block overflow-hidden rounded-lg border border-stroke">
                <div className="bg-gray-100 p-2 text-xs font-semibold text-gray-500">
                  Foto Saat Ini:
                </div>
                <div className="relative h-40 w-64">
                  <Image
                    src={staff.photo}
                    alt={staff.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <InputGroup
              label="Ganti Foto"
              type="file"
              name="photo"
              required
            />
          </div>

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
