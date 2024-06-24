"use client";

import { Navigator } from "@/components/navigator";
import { Separator } from "@/components/ui/separator";
import { UserInterface } from "@/interfaces/users.interfaces";
import { getUsersWhoHaveMessage } from "@/services/messages.services";
import React, { useEffect, useState } from "react";
import { UserMessageCard } from "./userMessageCard";

const MessagesPage = () => {
  const [usersWhoHaveMessage, setUsersWhoHaveMessage] = useState<
    UserInterface[]
  >([]);

  useEffect(() => {
    const fetchUsersThatHaveMessage = async () => {
      try {
        const fetchedUsers = await getUsersWhoHaveMessage();
        setUsersWhoHaveMessage(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersThatHaveMessage();
  }, []);

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <Navigator name={"Messages"} />

      <ul className="flex flex-col overflow-y-auto">
        {usersWhoHaveMessage.map((user: any) => (
          <React.Fragment key={user.id}>
            <UserMessageCard user={user} message={user.message} />
            <Separator />
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};

export default MessagesPage;
