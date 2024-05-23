"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostReturnInterface } from "@/interfaces/posts.interfaces";
import { api } from "@/services/api";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Separator } from "../ui/separator";

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!posts.length) {
      const getPosts = async () => {
        const response: any = await api.get("/posts");
        setPosts(response.data);
      };
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postsRender = posts.map((e: PostReturnInterface) => (
    <Fragment key={e.id}>
      <div className="w-full p-6 bg-white rounded-lg">
        <li className="flex flex-col space-y-4">
          <Link href={{ pathname: `/posts/${e.id}` }}>
            <div className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">
                  {e && handleDateWithMoment(e.createdAt)}
                </h2>
                <p className="text-gray-600">{e.author.username}</p>
              </div>
            </div>
            <p className="text-gray-800">{e.content}</p>
          </Link>
        </li>
      </div>

      <Separator className="my-4" />
    </Fragment>
  ));

  return <ul className="flex flex-col w-full">{postsRender}</ul>;
};
