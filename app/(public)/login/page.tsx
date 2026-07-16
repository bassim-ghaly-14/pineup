import { AuthShell } from "src/features/auth/components/auth-shell";
import { LoginForm } from "src/features/auth/components/login-form";

type Props = {
  searchParams: Promise<{
    addAccount?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const isAddAccount =
    params.addAccount === "true";

  return (
    <AuthShell
      title={
        isAddAccount
          ? "Add another account"
          : "Welcome Back"
      }
      subtitle={
        isAddAccount
          ? "Sign in to add another PineUp account without removing your current one."
          : "Sign in to continue your PineUp journey."
      }
      isAddAccount={
        isAddAccount
      }
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLink="/register"
    >
      <LoginForm />
    </AuthShell>
  );
}