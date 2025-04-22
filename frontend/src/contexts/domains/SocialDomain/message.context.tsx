"use client";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { MessageInterface } from "@/interfaces/messages.interfaces";
import { UserInterface } from "@/interfaces/users.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IMessageContext {
  currentChat: UserInterface | null;
  setCurrentChat: Dispatch<SetStateAction<UserInterface | null>>;

  conversationWithUser: MessageInterface[];
  setConversationWithUser: Dispatch<SetStateAction<MessageInterface[]>>;

  usersWhoHaveMessage: UserInterface[];
  setUsersWhoHaveMessage: Dispatch<SetStateAction<UserInterface[]>>;

  shouldFetchMessages: boolean;
  setShouldFetchMessages: Dispatch<SetStateAction<boolean>>;

  sortUsersWhoHaveMessage: (fetchedUsers: any) => any;
}

const MessageContext = createContext<IMessageContext>({} as IMessageContext);

export const MessageProvider = ({ children }: ChildrenInterface) => {
  const [usersWhoHaveMessage, setUsersWhoHaveMessage] = useState<
    UserInterface[]
  >([]);

  const [shouldFetchMessages, setShouldFetchMessages] = useState(true);

  const [currentChat, setCurrentChat] = useState<UserInterface | null>(null);
  const [conversationWithUser, setConversationWithUser] = useState<
    MessageInterface[]
  >([]);

  const sortUsersWhoHaveMessage = (fetchedUsers: any) => {
    return fetchedUsers.sort((a: any, b: any) => {
      const dateA = new Date(a.message.createdAt).getTime();
      const dateB = new Date(b.message.createdAt).getTime();
      return dateB - dateA;
    });
  };

  return (
    <MessageContext.Provider
      value={{
        currentChat,
        setCurrentChat,

        shouldFetchMessages,
        setShouldFetchMessages,

        conversationWithUser,
        setConversationWithUser,

        usersWhoHaveMessage,
        setUsersWhoHaveMessage,

        sortUsersWhoHaveMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);
