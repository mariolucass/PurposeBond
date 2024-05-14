import { localURL } from "@/services/api";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: { id: string };
}

const fetchUser = async (id: string) => {
  const res = await fetch(`${localURL}/users/${id}`);

  if (!res.ok) return undefined;

  return res.json();
};

const UserPage = async ({ params: { id } }: UserPageProps) => {
  const user = await fetchUser(id);
  console.log(user);

  if (!user) {
    notFound();
  }

  return (
    <main className="w-full h-full items-center justify-center">
      <h1>user : {user.username} </h1>
      <h1>email: {user.email} </h1>

      <h1>posts: {user.posts} </h1>
      <h1>posts: {user.likes} </h1>
    </main>
  );
};

export default UserPage;
