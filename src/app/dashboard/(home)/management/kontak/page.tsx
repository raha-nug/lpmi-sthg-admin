import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { getContact } from "./actions";

export default async function kontakPage() {
  const kontak = await getContact();

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <ShowcaseSection title="Data kontak" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/management/kontak/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ kontak"
            />
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-lg border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Telepon</th>
              <th className="p-3 text-left">Alamat</th>
              <th className="p-3 text-left">Map URL</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr key={kontak.email} className="border-t hover:bg-gray-50">
              <td className="p-3">{kontak.email}</td>
              <td className="max-w-xs truncate p-3">{kontak.phone}</td>
              <td className="p-3">{kontak.address}</td>
              <td className="p-3">
                {kontak.map_url && (
                  <Link
                    className="text-blue-500 underline"
                    href={kontak.map_url}
                  >
                    View Location
                  </Link>
                )}
              </td>

              <td className="flex justify-center gap-2 p-3">
                {kontak.address && (
                  <Link
                    href={`/dashboard/management/kontak/add`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Detail
                  </Link>
                )}
              </td>
            </tr>

            {!kontak && (
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
