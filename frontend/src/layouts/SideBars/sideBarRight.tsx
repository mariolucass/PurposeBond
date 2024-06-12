import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { getFollowRecommendations } from "@/services/follow.services";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const SideBarRight = () => {
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
    <section className="side-bar-right flex flex-col justify-start items-center gap-16 fixed mt-8 mx-auto z-40">
      <form
        className="flex w-full max-w-sm items-center space-x-2 "
        onSubmit={handleSubmit(handleSearch)}
      >
        <Input type="search" placeholder="Search" {...register("search")} />
        <Button type="submit">Search</Button>
      </form>

      <div className="border-4 gap-4 flex w-full flex-col rounded-2xl h-96 justify-center p-4">
        <h1>Recommendations</h1>

        <ul className="space-y-4 w-full">
          {recommendations.map((user: any, index: any) => (
            <Fragment key={user.id}>
              <UserCard user={user} />
              {index != recommendations.length - 1 && <Separator />}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};
