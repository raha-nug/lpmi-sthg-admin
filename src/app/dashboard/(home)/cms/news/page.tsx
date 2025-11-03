import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  type: string;
  content: string;
  image: string;
  slug: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface NewsResponse {
  first_page_url: string;
  last_page_url: string;
  current_page: number;
  data: NewsItem[];
  last_page: number;
}

async function getNews(page: number = 1): Promise<NewsResponse> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/listNews?page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
      cache: "no-store", // biar selalu fresh (SSR)
    },
  );

  const data = await res.json();

  return data;
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  if (!params?.page) {
    redirect(`/dashboard/cms/news?page=${page}`);
  }
  const news = await getNews(page);

  return (
    <>
      <Breadcrumb pageName="Berita" />

      <ShowcaseSection title="Data Berita" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/cms/news/add"}>
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
                  <button className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {news.data.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  Belum ada data berita
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ShowcaseSection>
    </>
  );
}
