"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui-elements/button";

export function SubmitButton() {
  const { pending } = useFormStatus(); // Akan true saat form sedang diproses

  return (
    <Button label="Simpan" shape="rounded" type="submit" loading={pending} />
  );
}
