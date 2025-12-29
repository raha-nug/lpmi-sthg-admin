import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { getStandarMutu } from "./actions";
import Pagination from "@/components/ui-elements/Pagination";

export default async function StandarMutuPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  if (!params?.page) {
    redirect(`/dashboard/mutu/standar?page=${page}`);
  }
  const standar = await getStandarMutu(page);

  return (
    <>
      <Breadcrumb pageName="Standar" />

      <ShowcaseSection title="Data Standar" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/mutu/standar/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ Standar"
            />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-lg border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Link Doc</th>
                <th className="p-3 text-left">Tahun Dokumen</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {standar.data.map((standar) => (
                <tr key={standar.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{standar.subject}</td>
                  <td className="p-3">
                    <Link
                      className="text-blue-500 underline"
                      href={standar.link_doc}
                    >
                      View Doc
                    </Link>
                  </td>
                  <td className="p-3">{standar.year_doc}</td>

                  <td className="flex justify-center gap-2 p-3">
                    <Link
                      href={`/dashboard/mutu/standar/${standar.id}`}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Detail
                    </Link>
                    <DeleteButton
                      id={standar.id}
                      deleteAction={deleteFunc}
                      path="StandarMutu"
                      folder="mutu"
                    />
                  </td>
                </tr>
              ))}
              {standar.data.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {standar.data.length > 0 && (
          <Pagination
            currentPage={standar.current_page}
            lastPage={standar.last_page}
            path="/dashboard/mutu/standar"
          />
        )}
      </ShowcaseSection>
    </>
  );
}
