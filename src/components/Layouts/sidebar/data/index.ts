import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/dashboard/calon-mahasiswa",
        items: [],
      },

      {
        title: "CMS",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Berita",
            url: "/dashboard/cms/news",
          },
          {
            title: "Dokumen Persyaratan",
            url: "/dashboard/calon-mahasiswa/forms/dokumen-persyaratan",
          },
          {
            title: "Aplikasi Beasiswa",
            url: "/dashboard/calon-mahasiswa/forms/aplikasi-beasiswa",
          },
          {
            title: "Daftar Ulang",
            url: "/dashboard/calon-mahasiswa/forms/daftar-ulang",
          },
        ],
      },
      {
        title: "Seleksi",
        icon: Icons.Alphabet,
        url: "/dashboard/calon-mahasiswa/seleksi",
        items: [],
      },
      {
        title: "Pengumuman",
        icon: Icons.Table,
        url: "/dashboard/calon-mahasiswa/pengumuman",
        items: [],
      },
    ],
  },

];



