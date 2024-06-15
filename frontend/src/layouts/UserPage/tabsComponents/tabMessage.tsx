import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const TabMessage = ({ userId }: { userId: string }) => {
  const sendMessage = () => {};

  return (
    <div className="w-9/12 flex flex-col self-center m-auto gap-6 p-6">
      <h1 className="text-2xl">Send a message!</h1>

      <div className="w-full grid gap-2">
        <Textarea placeholder="Type your message here." />
        <Button onClick={() => {}}>Send message</Button>
      </div>
    </div>
  );
};
