import AuthForm from "@/components/auth/auth-form";

export const metadata = { title: "Log in – BitSpeech" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
