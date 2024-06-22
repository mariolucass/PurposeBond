import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit2Icon } from "lucide-react";
import { FormEditProfile } from "./formEditProfile";

export const EditProfile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="self-end mb-4">
          <Button className="w-[48px] h-[48px]">
            <Edit2Icon />
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>

          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <FormEditProfile />
      </SheetContent>
    </Sheet>
  );
};
