// app/dashboard/reset-password/page.tsx
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <Breadcrumb pageName="Reset Password" />
      <ShowcaseSection title="Form Reset Password">
        <ResetPasswordForm />
      </ShowcaseSection>
    </>
  );
}
