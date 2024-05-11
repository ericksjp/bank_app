import AuthForm from "@/components/AuthForm";

export default function Login() {
  return (
    <section className="flex-center max-sm:px-6 w-full xl:px-8">
      <AuthForm type="login" />
    </section>
  );
}
