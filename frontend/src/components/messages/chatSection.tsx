import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { MessageService } from "@/services/messages.services";
import { MessageSquare, SquareUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormCreateMessage } from "./formCreateMessage";
import { MessageItem } from "./message";

export const ChatSection = () => {
  const router = useRouter();
  const { currentChat, shouldFetchMessages, setShouldFetchMessages } =
    useMessageContext();

  const [conversationWithUser, setConversationWithUser] = useState<any>([]);

  useEffect(() => {
    const fetchConversationWithUser = async () => {
      if (!currentChat) return;

      try {
        const conversation = await MessageService.getConversation(
          currentChat.id
        );
        setConversationWithUser(conversation.messages);
        setShouldFetchMessages(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (shouldFetchMessages) {
      fetchConversationWithUser();
    }
  }, [currentChat, shouldFetchMessages]);

  if (!currentChat) {
    return (
      <section className="w-full min-w-full flex flex-col justify-start">
        <MessagesPlaceholder />
      </section>
    );
  }

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <div className="h-component flex px-8 border-b-2 items-center py-4 justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{currentChat.name}</h1>

          <span>@{currentChat.username}</span>
        </div>

        <Button
          variant="ghost"
          onClick={() => router.push(`users/${currentChat.id}`)}
        >
          <SquareUser />
        </Button>
      </div>

      {conversationWithUser.length > 0 && (
        <ul
          className={
            currentChat
              ? "h-screenMinus176 flex flex-col gap-2 p-4 overflow-y-auto"
              : "h-screenMinus176 flex flex-col gap-2 p-4"
          }
        >
          {conversationWithUser.map((message: any) => (
            <MessageItem user={currentChat} message={message} />
          ))}
        </ul>
      )}

      <div className="flex gap-4 p-4 border-t-2 items-center h-component">
        {currentChat && <FormCreateMessage />}
      </div>
    </section>
  );
};

export const MessagesPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
    <div className="bg-muted p-4 rounded-full">
      <MessageSquare className="w-8 h-8 text-muted-foreground" />
    </div>

    <h2 className="text-xl font-semibold text-foreground">Chat</h2>
    <p className="max-w-sm text-sm text-muted-foreground">
      Select a conversation from the left or create a new one to start chatting.
    </p>
  </div>
);
