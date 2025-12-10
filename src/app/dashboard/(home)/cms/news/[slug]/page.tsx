import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";

import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";


interface News {
  params: {
    slug: string;
  };
}

function AddNewsPage({ params }: News) {
  const getNewsById = async () => {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value ?? "";
    try {
     const res =  await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/cms/detailNews/${params.slug}`,
        {
          headers: {
            accept: "application/json",
            Authorization: token,
          },
          cache: "no-store", // biar selalu fresh (SSR)
        },

        
      );
      const news = await res.json()
      console.log(news)
    } catch (error) {
      console.log(error)
    }
  };

  getNewsById()
  return (
    <>
      <Breadcrumb pageName="Berita" />

      <ShowcaseSection title="Data Berita" className="space-y-4">
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
          {/* <tbody>
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
          </tbody> */}
        </table>
      </ShowcaseSection>
    </>
  );
}

export default AddNewsPage;
