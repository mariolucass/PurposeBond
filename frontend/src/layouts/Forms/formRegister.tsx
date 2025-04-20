"use client";

import { FormFields } from "@/components/common/formFields";
import { Button } from "@/components/ui/button";
import { RegisterType } from "@/interfaces/auth.interfaces";
import { registerSchema } from "@/lib/schemas/auth.schemas";
import { AuthService } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerFormMethods = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (form: RegisterType) => {
    setLoading(true);
    await AuthService.register(form);

    setLoading(false);
    router.push("/profile");
  };

  return (
    <FormProvider {...registerFormMethods}>
      <form
        onSubmit={registerFormMethods.handleSubmit(handleRegister)}
        className="flex flex-col gap-4 w-1/2 m-auto"
      >
        <FormFields control={registerFormMethods.control} type={"register"} />

        {loading ? (
          <Button type="submit" disabled>
            <div className="flex items-center space-x-2">
              <LoaderCircle className="animate-spin" />
              <span>Registering...</span>
            </div>
          </Button>
        ) : (
          <Button type="submit">Register</Button>
        )}
      </form>
    </FormProvider>
  );
};
