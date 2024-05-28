"use client";

import { FormFields } from "@/components/formFields";
import { Button } from "@/components/ui/button";
import { RegisterType } from "@/interfaces/auth.interfaces";
import { registerSchema } from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

export const RegisterForm = () => {
  const registerFormMethods = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = () => {};

  return (
    <FormProvider {...registerFormMethods}>
      <form
        onSubmit={registerFormMethods.handleSubmit(handleRegister)}
        className="flex flex-col gap-4 w-1/2 m-auto"
      >
        <FormFields control={registerFormMethods.control} type={"register"} />

        <div className="self-end flex gap-4">
          <Button type="submit">Register</Button>
        </div>

        <span className="self-center">
          Already have an account? <Link href="/login">Login</Link>
        </span>
      </form>
    </FormProvider>
  );
};
