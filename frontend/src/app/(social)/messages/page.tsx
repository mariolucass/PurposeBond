"use client";

import { Navigator } from "@/components/common/navigator";
import { ChatSection } from "@/components/messages/chatSection";
import { NewMessageModal } from "@/components/messages/newMessageModal";
import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { MessageService } from "@/services/messages.services";
import { useEffect, useState } from "react";
import { UserMessageCard } from "../../../components/messages/userMessageCard";

const MessagesPage = () => {
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

  const [modalNewMessage, setModalNewMessage] = useState(false);

  console.log(usersWhoHaveMessage);

  return (
    <>
      <div className="col-span-4 border-r-2">
        <section className="w-full min-w-full flex flex-col justify-start">
          <Navigator name={"Messages"} />

          <div className="h-component flex justify-center items-center border-b-2">
            <Button onClick={() => setModalNewMessage(true)}>
              Create New Message
            </Button>
          </div>

          <ul className="h-screenMinus176 flex flex-col overflow-y-auto ">
            {usersWhoHaveMessage.map((user: any) => (
              <UserMessageCard
                user={user}
                message={user.message}
                key={user.id}
              />
            ))}
          </ul>
        </section>
      </div>
      <div className="col-span-6 flex border-r-2 justify-start h-full">
        <ChatSection />
      </div>

      <NewMessageModal
        modalOpen={modalNewMessage}
        setModalOpen={setModalNewMessage}
      />
    </>
  );
};

export default MessagesPage;
