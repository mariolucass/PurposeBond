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

  isDialogFollowingOpen: boolean;
  setIsDialogFollowingOpen: Dispatch<SetStateAction<boolean>>;

  isDialogFollowedByOpen: boolean;
  setIsDialogFollowedByOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: ChildrenInterface) => {
  const [isDialogMessagesOpen, setIsDialogMessagesOpen] = useState(false);
  const [isDialogFollowedByOpen, setIsDialogFollowedByOpen] = useState(false);
  const [isDialogFollowingOpen, setIsDialogFollowingOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isDialogMessagesOpen,
        setIsDialogMessagesOpen,

        isDialogFollowedByOpen,
        setIsDialogFollowedByOpen,

        isDialogFollowingOpen,
        setIsDialogFollowingOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
