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

  isDialogFollowersOpen: boolean;
  setIsDialogFollowersOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: ChildrenInterface) => {
  const [isDialogMessagesOpen, setIsDialogMessagesOpen] = useState(false);

  const handleDialogMessagesOpen = () => {
    setIsDialogMessagesOpen(!isDialogMessagesOpen);
  };

  const [isDialogFollowersOpen, setIsDialogFollowersOpen] = useState(false);

  const handleDialogFollowersOpen = () => {
    setIsDialogMessagesOpen(!isDialogFollowersOpen);
  };

  const [isDialogFollowingOpen, setIsDialogFollowingOpen] = useState(false);

  const handleDialogFollowingOpen = () => {
    setIsDialogMessagesOpen(!isDialogFollowingOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        isDialogMessagesOpen,
        setIsDialogMessagesOpen,

        isDialogFollowersOpen,
        setIsDialogFollowersOpen,

        isDialogFollowingOpen,
        setIsDialogFollowingOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
