import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { getGaleriById } from "../actions";
import GaleriEditForm from "./GaleriEditForm"; // Kita buat komponen ini di bawah

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailGaleriPage({ params }: PageProps) {
  const { id } = await params;
  const galeri = await getGaleriById(id);

  return (
    <>
      <Breadcrumb pageName="Edit Galeri" />
      <ShowcaseSection title="Form Galeri">
        <GaleriEditForm galeri={galeri} />
      </ShowcaseSection>
    </>
  );
}
