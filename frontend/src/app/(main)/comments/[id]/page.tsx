import { localURL } from "@/services/api";
import { notFound } from "next/navigation";

interface CommentPageProps {
  params: { id: string };
}

const fetchComment = async (id: string) => {
  const res = await fetch(`${localURL}/comments/${id}`);

  if (!res.ok) return undefined;

  return res.json();
};

const CommentPage = async ({ params: { id } }: CommentPageProps) => {
  const comment = await fetchComment(id);

  if (!comment) {
    notFound();
  }

  return (
    <main className="w-full h-full items-center justify-center">
      <div className="w-100 h-100">
        <h1>Hotel : {id}</h1>
      </div>
    </main>
  );
};

export default CommentPage;
