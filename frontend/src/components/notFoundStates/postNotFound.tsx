import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export const PostNotFound = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center text-center h-[80vh] px-6">
      <div className="bg-muted p-6 rounded-xl shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          Post not found
        </h2>
        <p className="text-muted-foreground mb-6">
          We couldn’t find the post you were looking for. It may have been
          removed or never existed.
        </p>
        <Button onClick={() => router.push("/")} className="w-full">
          Go back home
        </Button>
      </div>
    </section>
  );
};
