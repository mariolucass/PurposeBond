"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserReturnInterface } from "@/interfaces/users.interfaces";
import { TabLikes } from "@/layouts/UserPage/tabLikes";
import { TabMedia } from "@/layouts/UserPage/tabMedia";
import { TabMessage } from "@/layouts/UserPage/tabMessage";
import { TabPosts } from "@/layouts/UserPage/tabPosts";
import { UserSectionProfile } from "@/layouts/UserPage/userProfile";
import { getUser } from "@/services/users.services";
import { useEffect, useState } from "react";

interface UserPageProps {
  params: { id: string };
}

const UserPage = ({ params: { id } }: UserPageProps) => {
  const [user, setUser] = useState<UserReturnInterface>(
    {} as UserReturnInterface
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(id);
        setUser(fetchedUser);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found or not logged in.</div>;
  }

  return (
    <section className="gap-4 min-w-full w-full flex flex-col justify-start">
      <UserSectionProfile user={user} />

      <Separator />

      <Tabs
        defaultValue="posts"
        className="min-w-full flex flex-col items-center"
      >
        <TabsList className="w-11/12 flex justify-between p-4 mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="message">Message</TabsTrigger>
        </TabsList>

        <Separator />

        <TabsContent value="posts" className="w-full">
          <TabPosts userId={user.id} />
        </TabsContent>

        <TabsContent value="likes">
          <TabLikes userId={user.id} />
        </TabsContent>

        <TabsContent value="media">
          <TabMedia userId={user.id} />
        </TabsContent>

        <TabsContent value="message">
          <TabMessage userId={user.id} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default UserPage;
