import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { useAuthContext } from "@/contexts/auth.context";
import { getFollowRecommendations } from "@/services/follow.services";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const SideBarRight = () => {
  const { authenticatedUser } = useAuthContext();
  const [recommendations, setRecommendations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const fetchedRecommendations = await getFollowRecommendations();
        setRecommendations(fetchedRecommendations);
      } catch (error) {
        console.error("Erro ao buscar recomendações:", error);
      }
    };

    if (!recommendations.length) {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (data: any) => {
    if (data.search.trim()) {
      router.push(`/search?q=${encodeURIComponent(data.search)}`);
    }
  };

  const { handleSubmit, register } = useForm<{ search: string }>({});

  return (
    <section className="side-bar-right flex flex-col justify-start items-center gap-4 fixed mx-auto z-40">
      <form
        className="h-component flex w-full max-w-sm items-center space-x-2 p-4"
        onSubmit={handleSubmit(handleSearch)}
      >
        <Input
          type="search"
          placeholder="Search"
          {...register("search")}
          className="h-full"
        />
        <Button type="submit" className="h-full">
          Search
        </Button>
      </form>

      {recommendations.length > 0 && (
        <div className="h-[440px] border-2 flex w-full flex-col rounded-radius justify-around p-4">
          <h1 className="text-xl font-semibold">Recommendations</h1>

          <ul className="space-y-4 w-full">
            {recommendations.map((user: any, index: any) => (
              <Fragment key={user.id}>
                <UserCard user={user} />
                {index != recommendations.length - 1 && <Separator />}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
