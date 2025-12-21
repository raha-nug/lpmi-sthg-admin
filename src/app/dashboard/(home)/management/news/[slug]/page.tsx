"use server";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import React from "react";
import { addNews, getNewsBySlug } from "../actions";
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
            type="text"
            defaultValue={news.type}
            name="type"
            placeholder="Berita"
            required
          />
          <InputGroup label="Gambar" type="file" name="image" required />

          <TextAreaGroup
            label="Konten"
            name="content"
            defaultValue={news.content}
            placeholder="Masukan konten.."
            required
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
