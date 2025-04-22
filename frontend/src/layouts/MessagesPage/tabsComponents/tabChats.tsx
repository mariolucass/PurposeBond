import { ChatCard } from "@/components/chatCard";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { MessageService } from "@/services/messages.services";
import { useEffect } from "react";

export const TabChats = () => {
  const {
    usersWhoHaveMessage,
    setUsersWhoHaveMessage,
    sortUsersWhoHaveMessage,
  } = useMessageContext();

  useEffect(() => {
    const fetchUsersThatHaveMessage = async () => {
      try {
        const fetchedUsers: any = await MessageService.getAllContacts();
        setUsersWhoHaveMessage(sortUsersWhoHaveMessage(fetchedUsers));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersThatHaveMessage();
  }, []);

  return (
    <ul className="flex flex-col overflow-y-auto">
      {usersWhoHaveMessage.map((user: any) => (
        <ChatCard user={user} message={user.message} key={user.id} />
      ))}
    </ul>
  );
};
