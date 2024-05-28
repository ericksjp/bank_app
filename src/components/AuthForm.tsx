"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { formSchemaByType } from "@/lib/utils";
import { login, signUp } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { PlaidLink } from "./PlaidLink";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = formSchemaByType(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "login"
        ? { email: "", password: "" }
        : {
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            email: "",
            password: "",
          },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (type === "signup") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "login") {
        const response = await login({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col justify-between items-center gap-0 sm:gap-2 md:gap-8 mt-10 md:mt-0 sm:flex-row">
        <Link
          href="/"
          className="cursor-pointer flex self-baseline items-center gap-3 sm:self-auto"
        >
          <Image src="/icons/logo.svg" height={40} width={40} alt="IAGM logo" />
          <h1 className="text-30 font-ibm-plex-serif font-bold text-black-1">
            Testnam
          </h1>
        </Link>

        <h1 className="font-bold self-end text-24 md:text-36 text-gray-900 sm:self-auto text-right">
          {user ? "Link Account" : type === "login" ? "Login" : "Sign Up"}
        </h1>
      </header>
      <p className="text-16 font-normal text-gray-600 text-end -mt-4">
        {user
          ? "Link your account to get startet"
          : "Please enter your details"}
      </p>

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-[-1.25rem]"
          >
            {type === "signup" && (
              <>
                <div className="flex gap-5">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    invalid={form.getFieldState("firstName").invalid}
                  />

                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    invalid={form.getFieldState("lastName").invalid}
                  />
                </div>

                <CustomInput
                  control={form.control}
                  name="address1"
                  label="Address"
                  placeholder="Enter your adress"
                  invalid={form.getFieldState("address1").invalid}
                />

                <CustomInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                  invalid={form.getFieldState("city").invalid}
                />

                <div
                  className="grid grid-cols-2 !mt-0"
                  style={{ columnGap: "1.25rem" }}
                >
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="ex: NY"
                    invalid={form.getFieldState("state").invalid}
                  />

                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="ex: 11101"
                    invalid={form.getFieldState("postalCode").invalid}
                  />

                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="yyyy-mm-dd"
                    invalid={form.getFieldState("dateOfBirth").invalid}
                  />

                  <CustomInput
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="ex: 1234"
                    invalid={form.getFieldState("ssn").invalid}
                  />
                </div>
              </>
            )}

            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              invalid={form.getFieldState("email").invalid}
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              invalid={form.getFieldState("password").invalid}
            />

            <Button
              type="submit"
              className="form-btn w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Loading...
                </>
              ) : type === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "login"
                ? "Don't have an account ?"
                : "Already have an account ?"}
            </p>
            <Link
              href={type === "login" ? "/signup" : "/login"}
              className="form-link"
            >
              {type === "login" ? "Sign Up" : "Login"}
            </Link>
          </footer>
        </Form>
      )}
    </section>
  );
}
