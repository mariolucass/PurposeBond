"use client";

import { MessageButton } from "@/components/messagesButton";
import { MessagesModal } from "@/components/messagesModal";
import { CommentProvider } from "@/contexts/comment.context";
import { ModalProvider } from "@/contexts/modal.context";
import { PostProvider } from "@/contexts/post.context";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { SideBarLeft, SideBarRight } from "@/layouts/SideBars";

const MainLayout = ({ children }: ChildrenInterface) => (
  <ModalProvider>
    <main className="w-full h-full items-center">
      <div className="grid grid-cols-12 min-h-screen max-w-7xl mx-auto relative">
        <div className="col-span-2 flex justify-end border-r-4">
          <SideBarLeft />
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-5 border-x-2 rounded-t-2xl">
          <CommentProvider>
            <PostProvider>{children}</PostProvider>
          </CommentProvider>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-3 flex justify-start h-full">
          <SideBarRight />
          <MessageButton />
          <MessagesModal />
        </div>
      </div>
    </main>
  </ModalProvider>
);

export default MainLayout;
