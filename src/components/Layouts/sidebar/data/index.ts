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
        title: "Management",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Berita",
            url: "/dashboard/management/news",
          },
          {
            title: "Galeri",
            url: "/dashboard/management/galeri",
          },
          {
            title: "Kontak",
            url: "/dashboard/management/kontak",
          },
          {
            title: "Profil",
            url: "/dashboard/management/profil",
          },
          {
            title: "Staff",
            url: "/dashboard/management/staff",
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



