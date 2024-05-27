import { RegisterType } from "@/interfaces/auth.interfaces";
import { loginSchema } from "@/lib/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({ resolver: zodResolver(loginSchema) });

  return <form action=""></form>;
};
