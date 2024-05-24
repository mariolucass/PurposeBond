"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/services/api";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export const SideBarLeft = () => {
  return (
    <section className="w-2/6 min-h-full flex flex-col justify-start items-center">
      <div></div>
      <ul className="flex flex-col">
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
    <section className="w-2/6 min-h-full flex flex-col justify-start items-center">
      <div className="flex w-9/12 max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Search" />
        <Button type="submit">Pesquisar</Button>
      </div>

      <ul className="space-y-4 w-full p-4">
        {recommendations.slice(0, 4).map((user: any) => (
          <Fragment key={user.id}>
            <li key={user.id} className="flex items-center">
              <Link href={`/users/${user.id}`}>
                {/* <Image
              src={user.avatar}
              alt={`Avatar de ${user.username}`}
              width={40}
              height={40}
              className="rounded-full mr-4"
            /> */}

                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-gray-600">{user.username}</p>
                </div>
              </Link>
            </li>

            <Separator />
          </Fragment>
        ))}
      </ul>
    </section>
  );
};
