import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { getKebijakanMutu } from "./actions";

export default async function KebijakanMutuPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  if (!params?.page) {
    redirect(`/dashboard/mutu/kebijakan?page=${page}`);
  }
  const kebijakan = await getKebijakanMutu(page);

  return (
    <>
      <Breadcrumb pageName="Kebijakan" />

      <ShowcaseSection title="Data Kebijakan" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/mutu/kebijakan/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ Kebijakan"
            />
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-lg border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Deskripsi</th>
              <th className="p-3 text-left">Link Doc</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kebijakan.data.map((kebijakan) => (
              <tr key={kebijakan.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{kebijakan.subject}</td>
                <td className="p-3">
                  <Link className="text-blue-500 underline" href={kebijakan.link_doc}>
                    View Doc
                  </Link>
                </td>
                <td className="max-w-xs truncate p-3">{kebijakan.description}</td>

                <td className="flex justify-center gap-2 p-3">
                  <Link
                    href={`/dashboard/mutu/kebijakan/${kebijakan.id}`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Detail
                  </Link>
                  <DeleteButton
                    id={kebijakan.id}
                    deleteAction={deleteFunc}
                    path="KebijakanMutu"
                    folder="mutu"
                  />
                </td>
              </tr>
            ))}
            {kebijakan.data.length === 0 && (
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
