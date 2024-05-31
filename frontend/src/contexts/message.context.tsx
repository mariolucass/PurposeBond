import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { createContext, useContext, useState } from "react";

interface IMessageContext {}

const MessageContext = createContext<IMessageContext>({} as IMessageContext);

export const MessageProvider = ({ children }: ChildrenInterface) => {
  const [messageList, setMessageList] = useState();

  return (
    <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);
