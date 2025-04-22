import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";

export const CommunitySpotlight = () => {
  return (
    <div className="bg-background border border-border w-full flex flex-col rounded-xl shadow-sm p-4">
      <h1 className="text-lg font-semibold mb-4 px-1 flex items-center gap-2">
        <UsersRound className="w-5 h-5 text-muted-foreground" />
        Community Spotlight
      </h1>

      <div className="flex flex-col gap-2 text-sm">
        <div className="font-medium text-foreground">Frontend Masters</div>
        <p className="text-muted-foreground text-xs leading-snug">
          A space to share UI/UX ideas, React tips and Tailwind CSS techniques
          with other frontend devs.
        </p>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm">
            Join
          </Button>
          <Button variant="secondary" className="flex-1" size="sm">
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
