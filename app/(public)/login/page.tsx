import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to continue your PineUp journey."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLink="/register"
    >
      <LoginForm />
    </AuthShell>
  );
}