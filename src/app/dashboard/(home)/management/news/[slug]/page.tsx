"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addNews, getNewsBySlug } from "../actions";
import RichTextEditor from "@/components/FormElements/Editor";
import Image from "next/image";
interface PageProps {
  params: Promise<{ slug: string }>;
}
async function DetailNewsPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  return (
    <>
      <Breadcrumb pageName="Edit berita" />
      <ShowcaseSection title="Form berita">
        <form action={addNews} className="space-y-3">
          <InputGroup
            className="hidden"
            label="Id"
            type="text"
            defaultValue={news.id}
            name="id"
            placeholder="Id"
            required
          />
          <InputGroup
            label="Judul"
            type="text"
            defaultValue={news.title}
            name="title"
            placeholder="Judul"
            required
          />
          <InputGroup
            label="Type"
            className="hidden"
            type="text"
            defaultValue={news.type}
            name="type"
            placeholder="Berita"
            required
          />
          <div className="space-y-3">
            <label className="block font-medium text-black dark:text-white">
              Gambar Berita
            </label>

            {/* Pratinjau Gambar Sebelumnya */}
            {news.image && (
              <div className="dark:border-strokedark relative mb-3 inline-block overflow-hidden rounded-lg border border-stroke">
                <div className="bg-gray-100 p-2 text-xs font-semibold text-gray-500">
                  Gambar Saat Ini:
                </div>
                <div className="relative h-40 w-64">
                  <Image
                    src={news.image}
                    alt={news.title}
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
              // Hilangkan 'required' karena saat edit user mungkin tidak ingin ganti foto
            />
          </div>
          <RichTextEditor
            label="Konten Berita"
            name="content"
            defaultValue={news.content}
            placeholder="Tulis detail berita di sini..."
          />

          <div className="flex justify-end">
            <Button label="Luncurkan" shape={"rounded"} type="submit" />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}

export default DetailNewsPage;
