import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { getProfil } from "./actions";

export default async function ProfilPage() {
  const profil = await getProfil();

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <ShowcaseSection title="Data Profile" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/management/profil/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ profil"
            />
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-lg border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Visi</th>
              <th className="p-3 text-left">Misi</th>
              <th className="p-3 text-left">Tugas Fungsi</th>
              <th className="p-3 text-left">Struktur</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr key={profil?.visi} className="border-t hover:bg-gray-50">
              <td className="max-w-xs truncate p-3">{profil?.visi}</td>
              <td className="max-w-xs truncate p-3">{profil?.misi}</td>
              <td className="max-w-xs truncate p-3">{profil?.tugas_fungsi}</td>
              <td className="max-w-xs truncate p-3">{profil?.struktur}</td>
              

              <td className="flex justify-center gap-2 p-3">
                {profil?.visi && (
                  <Link
                    href={`/dashboard/management/profil/add`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Detail
                  </Link>
                )}
              </td>
            </tr>

            {!profil && (
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
