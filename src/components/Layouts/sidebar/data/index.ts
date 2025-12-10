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
            title: "Galeri",
            url: "/dashboard/cms/galeri",
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



