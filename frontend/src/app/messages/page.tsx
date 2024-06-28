"use client";

import { Navigator } from "@/components/navigator";
import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/contexts/message.context";
import { getUsersWhoHaveMessage } from "@/services/messages.services";
import { useEffect } from "react";
import { UserMessageCard } from "./userMessageCard";

const MessagesPage = () => {
  const {
    usersWhoHaveMessage,
    setUsersWhoHaveMessage,
    sortUsersWhoHaveMessage,
  } = useMessageContext();

  useEffect(() => {
    const fetchUsersThatHaveMessage = async () => {
      try {
        const fetchedUsers: any = await getUsersWhoHaveMessage();
        setUsersWhoHaveMessage(sortUsersWhoHaveMessage(fetchedUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsersThatHaveMessage();
  }, []);

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <Navigator name={"Messages"} />

      <div className="h-component flex justify-center items-center border-b-2">
        <Button>Create New Message</Button>
      </div>

      <ul className="h-screenMinus176 flex flex-col overflow-y-auto ">
        {usersWhoHaveMessage.map((user: any) => (
          <UserMessageCard user={user} message={user.message} key={user.id} />
        ))}
      </ul>
    </section>
  );
};

export default MessagesPage;
