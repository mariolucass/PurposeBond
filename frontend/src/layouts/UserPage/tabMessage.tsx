import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const TabMessage = ({ userId }: { userId: string }) => {
  const sendMessage = () => {
    console.log(userId);
  };

  return (
    <>
      <h1 className="text-2xl">Send a message!</h1>

      <div className="grid w-full gap-2">
        <Textarea placeholder="Type your message here." />
        <Button onClick={() => {}}>Send message</Button>
      </div>
    </>
  );
};
