import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addGaleri, getGaleriById } from "../actions";
import Image from "next/image";
import RichTextEditor from "@/components/FormElements/Editor";
interface PageProps {
  params: Promise<{ id: string }>;
}
async function DetailGaleriPage({ params }: PageProps) {
  const { id } = await params;
  const galeri = await getGaleriById(id);

  return (
    <>
      <Breadcrumb pageName="Edit Galeri" />
      <ShowcaseSection title="Form galeri">
        <form action={addGaleri} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            required
            defaultValue={galeri.id}
            name="id"
            placeholder="Id"
          />
          <InputGroup
            label="Judul"
            type="text"
            required
            defaultValue={galeri.title}
            name="title"
            placeholder="Judul"
          />
          <InputGroup
            label="Type"
            type="date"
            required
            defaultValue={galeri.event_date}
            name="event_date"
            placeholder="Galeri"
          />
          <div className="space-y-3">
            <label className="block font-medium text-black dark:text-white">
              Gambar Galeri
            </label>

            {/* Pratinjau Gambar Sebelumnya */}
            {galeri.image && (
              <div className="dark:border-strokedark relative mb-3 inline-block overflow-hidden rounded-lg border border-stroke">
                <div className="bg-gray-100 p-2 text-xs font-semibold text-gray-500">
                  Gambar Saat Ini:
                </div>
                <div className="relative h-40 w-64">
                  <Image
                    src={galeri.image}
                    alt={galeri.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <InputGroup
              label="Ganti Gambar"
              type="file"
              name="image"
              required
            />
          </div>

          <TextAreaGroup
            label="Deskripsi"
            name="description"
            defaultValue={galeri.description}
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

export default DetailGaleriPage;
