"use client";

import { Navigator } from "@/components/common/navigator";
import { NewMessageModal } from "@/components/messages/newMessageModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectedChat } from "@/layouts/MessagesPage/selectedChat";
import { TabsMessagePage } from "@/layouts/MessagesPage/tabs";
import { MessageCircle, Users } from "lucide-react";
import { useState } from "react";

const MessagesPage = () => {
  const [modalNewMessage, setModalNewMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="col-span-4 border-r-2">
        <section className="w-full min-w-full flex flex-col justify-start">
          <Navigator name="Messages" />

          <div className="h-component flex items-center gap-4 justify-center border-b-2 px-4 py-3">
            <Button onClick={() => setModalNewMessage(true)}>
              <MessageCircle className="w-4 h-4 mr-2" /> New Message
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalNewMessage(true)}
            >
              <Users className="w-4 h-4 mr-2" /> New Group
            </Button>
          </div>

          <div className="p-4 border-b-2">
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-full bg-muted/20"
            />
          </div>
        </section>

        <TabsMessagePage />
      </div>

      <div className="col-span-6 flex border-r-2 justify-start h-full">
        <SelectedChat />
      </div>

      <NewMessageModal
        modalOpen={modalNewMessage}
        setModalOpen={setModalNewMessage}
      />
    </>
  );
};

export default MessagesPage;
