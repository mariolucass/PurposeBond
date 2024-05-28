import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { createContext, useContext, useEffect, useState } from "react";

interface IMessageContext {}

const MessageContext = createContext<IMessageContext>({} as IMessageContext);

export const MessageProvider = ({ children }: ChildrenInterface) => {
  const [messageList, setMessageList] = useState();

  const loadMessages = () => {};

  useEffect(() => {}, []);

  const sendMessage = (content: any) => {};

  return (
    <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);
