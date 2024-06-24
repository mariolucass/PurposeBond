"use client";
import { useAuthContext } from "@/contexts/auth.context";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface NavigatorProps {
  name: string;
  description?: string;
}

export const Navigator = ({ name, description }: NavigatorProps) => {
  const router = useRouter();
  const { authenticatedUser } = useAuthContext();

  const descriptionShown = description
    ? description.trim()
    : authenticatedUser
    ? `@${authenticatedUser.username}`
    : name;

  return (
    <div className="flex gap-4 p-4 border-b-2 items-center">
      <Button
        onClick={() => router.back()}
        className="bg-white text-black hover:text-white"
      >
        <ArrowLeft />
      </Button>

      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{name}</h1>

        <span>{descriptionShown}</span>
      </div>
    </div>
  );
};
