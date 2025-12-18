import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { getStaff } from "./actions";



export default async function StaffPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  if (!params?.page) {
    redirect(`/dashboard/management/staff?page=${page}`);
  }
  const staff = await getStaff(page);

  return (
    <>
      <Breadcrumb pageName="Staff" />

      <ShowcaseSection title="Data Staff" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/management/staff/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ Staff"
            />
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-lg border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Posisi</th>
              <th className="p-3 text-left">Bio</th>
              <th className="p-3 text-left">Foto</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {staff.data.map((staff) => (
              <tr key={staff.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{staff.name}</td>
                <td className="p-3">{staff.position}</td>
                <td className="max-w-xs truncate p-3">{staff.bio}</td>
                <td className="p-3">
                  <Link className="text-blue-500 underline" href={staff.photo}>
                    View Image
                  </Link>
                </td>
                
                <td className="flex justify-center gap-2 p-3">
                  <Link
                    href={`/dashboard/management/staff/${staff.id}`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Detail
                  </Link>
                  <DeleteButton id={staff.id} deleteAction={deleteFunc} path="Staff" folder="management" />
                </td>
              </tr>
            ))}
            {staff.data.length === 0 && (
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
