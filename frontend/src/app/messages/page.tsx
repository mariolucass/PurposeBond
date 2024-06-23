"use client";

import { Navigator } from "@/components/navigator";
import { useEffect } from "react";

const MessagesPage = () => {
  useEffect(() => {}, []);

  return (
    <section className="w-full min-w-full flex flex-col gap-4 justify-start">
      <Navigator name={"Messages"} />

      <ul></ul>
    </section>
  );
};

export default MessagesPage;
