"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/services/config/api";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export const SideBarLeft = () => {
  return (
    <section className="side-bar-left min-h-full flex flex-col justify-start items-center gap-16 fixed mt-8 mx-auto ">
      <div className="w-full  gap-4 flex flex-col justify-start rounded-2xl h-96 mt-24 p-4">
        <ul className="w-full space-y-4 p-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/followers">Followers</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export const SideBarRight = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const { data } = await api.get("/user/recommended");
        setRecommendations(data);
      } catch (error) {
        console.error("Erro ao buscar recomendações:", error);
      }
    };

    if (!recommendations.length) {
      getRecommendations();
    }
  });

  return (
    <section className="side-bar-right flex flex-col justify-start items-center gap-16 fixed mt-8 mx-auto z-40">
      <div className="flex w-full max-w-sm items-center space-x-2 ">
        <Input type="search" placeholder="Search" />
        <Button type="submit">Pesquisar</Button>
      </div>

      <div className="border-4 gap-4 flex w-full flex-col justify-start rounded-2xl h-96 ">
        <ul className="space-y-4 p-4 w-full">
          {recommendations.slice(0, 4).map((user: any) => (
            <Fragment key={user.id}>
              <li key={user.id} className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Link href={`/users/${user.id}`}>
                  <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>

                    <p className="text-bgmodal">@{user.username}</p>
                  </div>
                </Link>
              </li>
              <Separator />
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};
