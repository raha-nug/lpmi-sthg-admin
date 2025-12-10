"use client";

import Swal from "sweetalert2";

export default function DeleteButton({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: (id: string) => void;
}) {
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Hapus berita?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    await deleteAction(id); // <- memanggil server action
  };

  return (
    <button
      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
      onClick={handleDelete}
    >
      Hapus
    </button>
  );
}
