import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create Account"
      subtitle="Join PineUp and connect with ambitious people."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLink="/login"
    >
      <RegisterForm />
    </AuthShell>
  );
}