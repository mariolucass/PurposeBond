"use client";

import { Navigator } from "@/components/common/navigator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectedCommunity } from "@/layouts/CommunitiesPage/selectedCommunity";
import { TabsCommunityPage } from "@/layouts/CommunitiesPage/tabs";
import { KeyRound, Plus } from "lucide-react";
import { useState } from "react";

const Communities = () => {
  const [currentCommunity, setCurrentCommunity] = useState(true);

  return (
    <>
      <div className="col-span-4 border-r-2 bg-background">
        <section className="w-full min-w-full flex flex-col justify-start">
          <Navigator name="Communities" />

          <div className="h-component flex items-center gap-4 justify-center border-b-2 px-4 py-3">
            <Button onClick={() => {}}>
              <Plus className="w-4 h-4 mr-2" /> Create Community
            </Button>

            <Button variant="secondary" onClick={() => {}}>
              <KeyRound className="w-4 h-4 mr-2" /> Join with Code
            </Button>
          </div>

          <div className="p-4 border-b-2">
            <Input
              placeholder="Search communities..."
              className="h-full bg-muted/20"
            />
          </div>

          <TabsCommunityPage />
        </section>
      </div>

      <div className="col-span-6 flex border-r-2 justify-start h-full">
        <SelectedCommunity currentCommunity={currentCommunity} />
      </div>
    </>
  );
};

export default Communities;
