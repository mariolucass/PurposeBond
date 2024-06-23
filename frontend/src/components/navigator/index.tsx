import { ArrowLeft } from "lucide-react";

interface NavigatorProps {
  name: string;
  description?: string;
}

export const Navigator = ({ name, description }: NavigatorProps) => {
  return (
    <div className="flex gap-4 p-4 border-b-2">
      <ArrowLeft />

      <div>
        <h1 className="text-xl font-bold">{name}</h1>

        <span>{description}</span>
      </div>
    </div>
  );
};
