import { ChildrenInterface } from "@/interfaces/global.interfaces";
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
}

const MessageContext = createContext<IMessageContext>({} as IMessageContext);

export const MessageProvider = ({ children }: ChildrenInterface) => {
  const [messageList, setMessageList] = useState();
  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);
  const [currentChat, setCurrentChat] = useState<UserInterface | null>(null);

  return (
    <MessageContext.Provider value={{ currentChat, setCurrentChat }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessageContext);
