"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/contexts/authContext.context";
import { TabLikes } from "@/layouts/UserPage/tabLikes";
import { TabMedia } from "@/layouts/UserPage/tabMedia";
import { TabMessage } from "@/layouts/UserPage/tabMessage";
import { TabPosts } from "@/layouts/UserPage/tabPosts";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found or not logged in.</div>;
  }

  return (
    <section className="border-x-4 gap-4 min-w-4/6 w-4/6 flex flex-col justify-start">
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <h2 className="text-lg text-gray-600">{user.email}</h2>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p>{user.description || "No bio yet."}</p>
      </div>

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

        <TabsContent value="posts">
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

export default ProfilePage;
