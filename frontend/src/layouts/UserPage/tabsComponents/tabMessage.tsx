"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageService } from "@/services/messages.services";
import { useState } from "react";
import { TabProps } from "./interfaces";

export const TabMessage = ({ user }: TabProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    if (message.trim().length) {
      try {
        MessageService.sendMessage(user.id, {
          content: message,
        });
      } catch (error) {
        console.log(error);
      }
    }
    setMessage("");
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 p-6 rounded-xl border border-border bg-card text-foreground shadow-sm">
      <h1 className="text-2xl font-semibold">Send a message</h1>

      <Textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[120px] bg-background border-border"
      />

      <Button
        onClick={handleSendMessage}
        disabled={loading || !message.trim()}
        className="self-end px-6"
      >
        {loading ? "Sending..." : "Send message"}
      </Button>

      {success && (
        <p className="text-green-500 text-sm text-end">
          Message sent successfully!
        </p>
      )}
    </div>
  );
};
