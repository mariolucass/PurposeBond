import { localURL } from "@/services/api";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: { id: string };
}

const fetchPost = async (id: string) => {
  const res = await fetch(`${localURL}/post/${id}`);

  if (!res.ok) return undefined;

  return res.json();
};

const PostPage = async ({ params: { id } }: PostPageProps) => {
  const post = await fetchPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-100 h-100">
      <h1>Hotel : {id}</h1>
    </div>
  );
};

export default PostPage;
