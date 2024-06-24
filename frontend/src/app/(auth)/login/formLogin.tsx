"use client";

import { FormFields } from "@/components/formFields";
import { Button } from "@/components/ui/button";
import { LoginType } from "@/interfaces/auth.interfaces";
import { loginSchema } from "@/lib/schemas/auth.schemas";
import { postLogin } from "@/services/auth.services";
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
    const formatedForm = form.email.includes("@")
      ? form
      : { username: form.email, password: form.password };

    const response = await postLogin(formatedForm);

    const token = response.accessToken;
    localStorage.setItem("tokenRedeSocial", token);

    const accountsString = localStorage.getItem("accounts");
    const accounts = accountsString ? JSON.parse(accountsString) : [];

    const { profileImage, username, name } = response.user;

    const accountInLocalStorage = accounts.find(
      (account: any) => account.username === username
    );

    const now = new Date();
    const expiresInTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const expiresIn = expiresInTime
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");

    if (accountInLocalStorage) {
      const accountIndex = accounts.indexOf(accountInLocalStorage);
      accounts[accountIndex] = {
        ...accountInLocalStorage,
        token,
        expiresIn,
      };

      localStorage.setItem("accounts", JSON.stringify(accounts));
    } else {
      accounts.push({
        profileImage,
        username,
        name,
        token,
        expiresIn,
      });

      localStorage.setItem("accounts", JSON.stringify(accounts));
    }

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
          <Button type="submit">
            <LoaderCircle />
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
      </form>
    </FormProvider>
  );
};
