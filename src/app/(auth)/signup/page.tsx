import AuthForm from "@/components/AuthForm";

export default async function SignUp() {
  return (
    <section className="flex-center max-sm:px-6 w-full xl:px-8">
      <AuthForm type="signup" />
    </section>
  );
}
