"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface TabMessageProps {
  user: {
    id: string;
    username: string;
  };
}

export const TabMessage = ({ user }: TabMessageProps) => {
  const [message, setMessage] = useState("");

  return (
    <div className="w-9/12 flex flex-col self-center m-auto gap-4 p-6">
      <h1 className="text-2xl">Send a message!</h1>

      <div className="w-full grid gap-4">
        <Textarea placeholder="Type your message here." />
        <Button onClick={() => {}}>Send message</Button>
      </div>
    </div>
  );
};
