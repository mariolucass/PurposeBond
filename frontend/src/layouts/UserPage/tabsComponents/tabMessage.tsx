"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { TabProps } from "./interfaces";

export const TabMessage = ({ user }: TabProps) => {
  const [message, setMessage] = useState("");

  return (
    <div className="w-9/12 flex flex-col self-center m-auto gap-4 p-4">
      <h1 className="text-2xl">Send a message!</h1>

      <div className="w-full grid gap-4">
        <Textarea placeholder="Type your message here." />
        <Button onClick={() => {}}>Send message</Button>
      </div>
    </div>
  );
};
