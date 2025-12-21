// app/dashboard/reset-password/ResetPasswordForm.tsx
"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import InputGroup from "@/components/FormElements/InputGroup";
import { Button } from "@/components/ui-elements/button";
import { resetPassword } from "./actions";

export default function ResetPasswordForm() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await resetPassword(formData);

    if (res?.success) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.message,
      });

      router.refresh(); // atau push
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: res?.message || "Terjadi kesalahan",
      });
    }
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <InputGroup
        required
        label="Password Lama"
        type="password"
        name="old_password"
        placeholder="***"
      />
      <InputGroup
        required
        label="Password Baru"
        type="password"
        name="password"
        placeholder="***"
      />
      <InputGroup
        required
        label="Konfirmasi Password Baru"
        type="password"
        name="password_confirmation"
        placeholder="***"
      />

      <div className="flex justify-end">
        <Button label="Simpan" shape="rounded" type="submit" />
      </div>
    </form>
  );
}
