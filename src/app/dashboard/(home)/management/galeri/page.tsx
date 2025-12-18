import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { getGaleri } from "./actions";



export default async function GaleriPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  if (!params?.page) {
    redirect(`/dashboard/management/galeri?page=${page}`);
  }
  const galeri = await getGaleri(page);

  return (
    <>
      <Breadcrumb pageName="Galeri" />

      <ShowcaseSection title="Data Galeri" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/management/galeri/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ Galeri"
            />
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-lg border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Gambar</th>
              <th className="p-3 text-left">Deskripsi</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {galeri.data.map((galeri) => (
              <tr key={galeri.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{galeri.title}</td>
                <td className="p-3">
                  <Link className="text-blue-500 underline" href={galeri.image}>
                    View Image
                  </Link>
                </td>
                <td className="max-w-xs truncate p-3">{galeri.description}</td>
                <td className="p-3">{galeri.event_date}</td>
                
                <td className="flex justify-center gap-2 p-3">
                  <Link
                    href={`/dashboard/management/galeri/${galeri.id}`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Detail
                  </Link>
                  <DeleteButton id={galeri.id} deleteAction={deleteFunc} path="Galeri" folder="management" />
                </td>
              </tr>
            ))}
            {galeri.data.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ShowcaseSection>
    </>
  );
}
