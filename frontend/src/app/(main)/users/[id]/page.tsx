"use client";

import { Separator } from "@/components/ui/separator";
import { UserReturnInterface } from "@/interfaces/users.interfaces";
import { api } from "@/services/api";
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
    const getUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        console.log(response);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found or not logged in.</div>;
  }

  return (
    <section className="container mx-auto mt-8 p-4 bg-white rounded-lg ">
      <div className="flex flex-col md:flex-row items-center mb-6">
        {/* <IMAGE
          src={user.avatarUrl || "https://via.placeholder.com/150"} // Use placeholder if no avatar
          alt={`${user.name}'s avatar`}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mr-8 mb-4 md:mb-0"
        /> */}
        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <h2 className="text-lg text-gray-600">{user.email}</h2>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p>{user.description || "No bio yet."}</p>
      </div>

      {/* Add more sections for bookings, reviews, etc. */}

      <Separator />
    </section>
  );
};

export default UserPage;
