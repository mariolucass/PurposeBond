"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { useChatSocket } from "@/hooks/socket.hook";
import { cn } from "@/lib/utils";
import { MessageService } from "@/services/messages.services";
import { MessageSquare, SquareUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { MessageItem } from "../../components/messages/message";
import { ContentTransition } from "../Animations/ContentTransition";
import { FormCreateMessage } from "../Forms/formCreateMessage";

export const SelectedChat = () => {
  const router = useRouter();
  const {
    currentChat,
    conversationWithUser,
    setConversationWithUser,
    shouldFetchMessages,
    setShouldFetchMessages,
  } = useMessageContext();
  const { authenticatedUser } = useAuthContext();

  const messagesEndRef = useRef<HTMLLIElement>(null);

  let roomId: string | undefined;

  if (authenticatedUser?.id && currentChat?.id) {
    roomId = [authenticatedUser.id, currentChat.id].sort().join("-");
  }

  useChatSocket(roomId, () => setShouldFetchMessages(true));

  useEffect(() => {
    const fetchConversationWithUser = async () => {
      if (!currentChat) return;

      try {
        setConversationWithUser([]);
        const conversation = await MessageService.getConversation(
          currentChat.id
        );
        setConversationWithUser(conversation);
        setShouldFetchMessages(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (shouldFetchMessages) {
      fetchConversationWithUser();
    }
  }, [currentChat, shouldFetchMessages]);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, 0);
  }, [conversationWithUser]);

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      {currentChat ? (
        <>
          <div className="h-component flex px-4 border-b-2 items-center py-4 justify-between">
            <div className="flex flex-col">
              <h1 className="text-base font-bold">{currentChat.name}</h1>

              <span className="text-sm">@{currentChat.username}</span>
            </div>

            <Button
              variant="ghost"
              onClick={() => router.push(`users/${currentChat.id}`)}
            >
              <SquareUser />
            </Button>
          </div>

          <ul
            className={cn(
              "h-screenMinus176 flex flex-col gap-2 p-4 overflow-y-auto",
              currentChat && ""
            )}
          >
            {conversationWithUser.length > 0 &&
              conversationWithUser.map((message: any, index: number) => (
                <MessageItem user={currentChat} message={message} key={index} />
              ))}{" "}
            <li ref={messagesEndRef} />
          </ul>

          <div className="flex gap-4 p-4 border-t-2 items-center h-component">
            {currentChat && <FormCreateMessage />}
          </div>
        </>
      ) : (
        <EmptySelectedChat />
      )}
    </section>
  );
};

export const EmptySelectedChat = () => (
  <Fragment key="empty">
    <div className="h-component flex gap-4 px-8 border-b-2 items-center py-6">
      <div className="flex flex-col">
        <h3 className="text-base font-bold">Chat</h3>

        <span className="text-sm">Select a chat or send a new message.</span>
      </div>
    </div>

    <ContentTransition>
      <div className="flex flex-col items-center pt-8 h-full text-center px-4 gap-4">
        <div className="bg-muted p-4 rounded-full">
          <MessageSquare className="w-8 h-8 text-muted-foreground" />
        </div>

        <h2 className="text-base font-semibold text-foreground">Chat</h2>
        <p className="text-sm max-w-sm text-muted-foreground">
          Select a conversation from the left or create a new one to start
          chatting.
        </p>
      </div>
    </ContentTransition>
  </Fragment>
);
