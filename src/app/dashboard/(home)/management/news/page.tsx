import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { getNews } from "./actions";



export default async function NewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  if (!params?.page) {
    redirect(`/dashboard/management/news?page=${page}`);
  }
  const news = await getNews(page);

  return (
    <>
      <Breadcrumb pageName="Berita" />

      <ShowcaseSection title="Data Berita" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/management/news/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ Berita"
            />
          </Link>
        </div>
        <table className="w-full overflow-hidden rounded-lg border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Konten</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Gambar</th>
              <th className="p-3 text-left">Dibuat Oleh</th>
              <th className="p-3 text-left">Dibuat</th>
              <th className="p-3 text-left">Diubah</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {news.data.map((news) => (
              <tr key={news.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{news.title}</td>
                <td className="max-w-xs truncate p-3">{news.content}</td>
                <td className="p-3">{news.slug}</td>
                <td className="p-3">
                  <Link className="text-blue-500 underline" href={news.image}>
                    View Image
                  </Link>
                </td>
                <td className="p-3">{news.created_by}</td>
                <td className="p-3">{news.created_at}</td>
                <td className="p-3">
                  {new Date(news.updated_at).toLocaleDateString()}
                </td>
                <td className="flex justify-center gap-2 p-3">
                  <Link
                    href={`/dashboard/management/news/${news.slug}`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Detail
                  </Link>
                  <DeleteButton id={news.id} deleteAction={deleteFunc} path="News" folder="management"/>
                </td>
              </tr>
            ))}
            {news.data.length === 0 && (
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
