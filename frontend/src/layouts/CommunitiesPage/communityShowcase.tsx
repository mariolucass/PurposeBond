import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { MapPin } from "lucide-react";
import { useState } from "react";

export const CommunityShowcase = ({
  currentCommunity,
}: {
  currentCommunity: any;
}) => {
  const [isMember, setIsMember] = useState(false);

  const handleMembership = () => setIsMember((prev) => !prev);

  return (
    <>
      <div className="relative w-full bg-background text-foreground overflow-hidden border-b-2 border-border">
        <div className="w-full h-40 bg-foreground dark:bg-slate-500" />

        <div className="relative z-10 flex flex-col items-center -mt-16 px-6">
          <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
            <AvatarFallback>F</AvatarFallback>
          </Avatar>

          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">Frontend Masters</h1>
            <p className="text-sm text-muted-foreground mt-1">
              A space to share UI/UX, React and Tailwind ideas.
            </p>
          </div>

          <Button
            variant={isMember ? "outline" : "default"}
            className="mt-4 px-6 py-2 text-sm self-end"
            onClick={handleMembership}
          >
            {isMember ? "Leave" : "Join"}
          </Button>
        </div>

        <div className="px-6 py-6 mt-6 text-sm text-muted-foreground flex gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Somewhere</span>
          </div>

          <div>
            <span className="hover:underline cursor-pointer font-semibold text-foreground">
              0 members
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
