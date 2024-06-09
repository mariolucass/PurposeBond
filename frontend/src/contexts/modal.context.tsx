import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { createContext, useContext, useState } from "react";

interface IModalContext {
  isDialogMessagesOpen: boolean;
  handleMessagesDialog: () => void;

  isDialogFollowingOpen: boolean;
  handleFollowedByDialog: () => void;

  isDialogFollowedByOpen: boolean;
  handleFollowingDialog: () => void;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider = ({ children }: ChildrenInterface) => {
  const [isDialogMessagesOpen, setIsDialogMessagesOpen] = useState(false);
  const handleMessagesDialog = () => {
    setIsDialogMessagesOpen(!isDialogMessagesOpen);
  };

  const [isDialogFollowedByOpen, setIsDialogFollowedByOpen] = useState(false);
  const handleFollowedByDialog = () => {
    setIsDialogFollowedByOpen(!isDialogFollowedByOpen);
  };

  const [isDialogFollowingOpen, setIsDialogFollowingOpen] = useState(false);
  const handleFollowingDialog = () => {
    setIsDialogFollowingOpen(!isDialogFollowingOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        isDialogMessagesOpen,
        handleMessagesDialog,

        isDialogFollowedByOpen,
        handleFollowedByDialog,

        isDialogFollowingOpen,
        handleFollowingDialog,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
