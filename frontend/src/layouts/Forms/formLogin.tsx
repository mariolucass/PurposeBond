"use client";

import { FormFields } from "@/components/common/formFields";
import { Button } from "@/components/ui/button";
import { LoginType } from "@/interfaces/auth.interfaces";
import { loginSchema } from "@/lib/schemas/auth.schemas";
import { AuthService } from "@/services/auth.services";
import { saveAccountInLocalStorage } from "@/utils/saveAccountInLocal";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginFormMethods = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (form: LoginType) => {
    setLoading(true);

    const formattedForm = form.email.includes("@")
      ? form
      : { username: form.email, password: form.password };

    const response = await AuthService.login(formattedForm);

    saveAccountInLocalStorage(response);

    setLoading(false);
    router.push("/profile");
  };

  return (
    <FormProvider {...loginFormMethods}>
      <form
        onSubmit={loginFormMethods.handleSubmit(handleLogin)}
        className="flex flex-col gap-4 w-1/2 m-auto"
      >
        <FormFields control={loginFormMethods.control} type={"login"} />

        {loading ? (
          <Button type="submit" disabled>
            <div className="flex items-center space-x-2">
              <LoaderCircle className="animate-spin" />
              <span>Logging-in...</span>
            </div>
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
      </form>
    </FormProvider>
  );
};
