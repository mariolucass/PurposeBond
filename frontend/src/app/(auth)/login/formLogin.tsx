"use client";

import { FormFields } from "@/components/formFields";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/userCard";
import { LoginType } from "@/interfaces/auth.interfaces";
import { loginSchema } from "@/lib/schemas/auth.schemas";
import { postLogin } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const LoginForm = () => {
  const router = useRouter();

  const [accounts, setAccounts] = useState([]);

  const loginFormMethods = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (form: LoginType) => {
    const response = await postLogin(form);
    localStorage.setItem("tokenRedeSocial", response.accessToken);
    router.push("/profile");
  };

  useEffect(() => {
    const accountsString = localStorage.getItem("accounts");
    const accounts = accountsString ? JSON.parse(accountsString) : null;

    console.log(typeof accounts);

    if (accounts) {
      setAccounts(accounts);
    }
  }, []);

  console.log(accounts);

  return (
    <section>
      <ul>
        {accounts.length &&
          accounts.map((account: any) => {
            return (
              <div
                key={account.username}
                onClick={() => {
                  localStorage.setItem("tokenRedeSocial", account.token);
                  router.push("profile");
                }}
              >
                <UserCard user={account} />
              </div>
            );
          })}
      </ul>

      <FormProvider {...loginFormMethods}>
        <form
          onSubmit={loginFormMethods.handleSubmit(handleLogin)}
          className="flex flex-col gap-4 w-1/2 m-auto"
        >
          <FormFields control={loginFormMethods.control} type={"login"} />

          <div className="self-end flex gap-4">
            <Button
              onClick={() => {
                router.push("/signup");
              }}
            >
              SignUp
            </Button>

            <Button type="submit">Login</Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
