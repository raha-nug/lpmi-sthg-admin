import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { getFormulirMutu } from "./actions";

export default async function FormulirMutuPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  if (!params?.page) {
    redirect(`/dashboard/mutu/formulir?page=${page}`);
  }
  const formulir = await getFormulirMutu(page);

  return (
    <>
      <Breadcrumb pageName="Formulir" />

      <ShowcaseSection title="Data Formulir" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/mutu/formulir/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ Formulir"
            />
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-lg border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Link Doc</th>
              <th className="p-3 text-left">Year Doc</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {formulir.data.map((formulir) => (
              <tr key={formulir.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{formulir.subject}</td>
                <td className="p-3">
                  <Link
                    className="text-blue-500 underline"
                    href={formulir.link_doc}
                  >
                    View Doc
                  </Link>
                </td>
                <td className="p-3">{formulir.year_doc}</td>

                <td className="flex justify-center gap-2 p-3">
                  <Link
                    href={`/dashboard/mutu/formulir/${formulir.id}`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Detail
                  </Link>
                  <DeleteButton
                    id={formulir.id}
                    deleteAction={deleteFunc}
                    path="FormulirMutu"
                    folder="mutu"
                  />
                </td>
              </tr>
            ))}
            {formulir.data.length === 0 && (
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
