import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IModalContext {
  isDialogMessagesOpen: boolean;
  setIsDialogMessagesOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: ChildrenInterface) => {
  const [isDialogMessagesOpen, setIsDialogMessagesOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{ isDialogMessagesOpen, setIsDialogMessagesOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
