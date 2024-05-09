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

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = formSchemaByType(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchemaByType(type)),
    defaultValues:
      type === "login"
        ? { email: "", password: "" }
        : {
            firstName: "",
            lastName: "",
            adress1: "",
            city: "",
            state: "",
            postalCode: "",
            dateBirth: "",
            ssn: "",
            email: "",
            password: "",
          },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      if (type === "signup") {
        // const newUser = await signIn(data);
        // setUser(newUser);
      }

      if (type === "login") {
        // const response = await login({
        //   email: data.email,
        //   password: data.password,
        // });
        //
        // if (response) router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8 justify-between">
        <Link href="/" className="cursor-pointer flex items-center gap-3">
          <Image src="/icons/logo.svg" height={40} width={40} alt="IAGM logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            IAGM
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="font-bold text-24 lg:text-36 text-gray-900">
            {user ? "Link Account" : type === "login" ? "Login" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get startet"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
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
                  name="adress1"
                  label="Adress"
                  placeholder="Enter your adress"
                  invalid={form.getFieldState("adress1").invalid}
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
                    name="dateBirth"
                    label="Date of Birth"
                    placeholder="yyyy-mm-dd"
                    invalid={form.getFieldState("dateBirth").invalid}
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
