import { localURL } from "@/services/api";
import Image from "next/image";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: { id: string };
}

const fetchUser = async (id: string) => {
  const res = await fetch(`${localURL}/users/${id}/`);

  if (!res.ok) return undefined;

  return res.json();
};

const UserPage = async ({ params: { id } }: UserPageProps) => {
  const user = await fetchUser(id);

  if (!user) {
    notFound();
  }

  return (
    <main className="w-full h-full items-center justify-center flex">
      <div>
        <div></div>

        <span className="text-xl">{user.username}</span>
        <span className="text-xl">{user.email}</span>
      </div>

      <div>
        <div>
          <h1>Posts</h1>
        </div>

        <ul className="flex ">
          {user.posts.map((elem: any) => (
            <li key={elem.id}>
              <div>
                <div>
                  <Image src="" alt="" />
                </div>

                <div>
                  <span className="text-xl">{user.username}</span>
                  <span className="text-xl">{user.email}</span>
                </div>

                <div>
                  <p>{elem.content}</p>
                </div>
              </div>

              <div>{elem.posts}</div>
            </li>
          ))}
        </ul>
      </div>

      <div></div>
    </main>
  );
};

export default UserPage;
