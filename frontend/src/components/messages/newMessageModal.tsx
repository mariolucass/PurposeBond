import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { Fragment } from "react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export const NewMessageModal = ({ modalOpen, setModalOpen }: any) => {
  const { authenticatedUser } = useAuthContext();

  return (
    <Dialog open={modalOpen} onOpenChange={() => setModalOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose a User to send message</DialogTitle>
        </DialogHeader>

        <Input
          type="search"
          placeholder="Search"
          className="h-full bg-muted/20 p-3"
        />

        <Separator />

        <div className="grid gap-4 py-4">
          <ul className="flex flex-col gap-4 h-96 overflow-y-auto">
            <Fragment>
              <Separator />
            </Fragment>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
