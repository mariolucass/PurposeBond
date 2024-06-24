import { EmptyCurrentChat } from "@/components/_emptyComponents/emptyCurrentChat";
import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/contexts/message.context";
import { getConversationWithUser } from "@/services/messages.services";
import { SquareUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Message } from "./message";

export const ChatSection = () => {
  const { currentChat } = useMessageContext();
  const router = useRouter();

  const [conversationWithUser, setConversationWithUser] = useState<any>([]);

  useEffect(() => {
    const fetchConversationWithUser = async () => {
      console.log(currentChat);
      if (!currentChat) return;

      try {
        const messages = await getConversationWithUser(currentChat.id);
        console.log(messages);

        setConversationWithUser(messages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversationWithUser();
  }, [currentChat]);

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      {currentChat ? (
        <div className="flex px-8 border-b-2 items-center py-4 justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{currentChat.name}</h1>

            <span>@{currentChat.username}</span>
          </div>

          <Button
            className="bg-white text-black hover:text-white border-2 px-2"
            onClick={() => {
              router.push(`users/${currentChat.id}`);
            }}
          >
            <SquareUser />
          </Button>
        </div>
      ) : (
        <EmptyCurrentChat />
      )}

      <ul className="flex flex-col gap-2 p-4 bg-primary h-screenMinus172 overflow-y-auto">
        {conversationWithUser.length > 0 &&
          conversationWithUser.map((message: any) => {
            return <Message user={currentChat} message={message} />;
          })}
      </ul>

      <div className="flex gap-4 p-4 border-b-2 items-center h-[86px]"></div>
    </section>
  );
};
