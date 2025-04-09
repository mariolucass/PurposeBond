import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { FollowService } from "@/services/follow.services";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const SideBarRight = () => {
  const [recommendations, setRecommendations] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const fetchedRecommendations = await FollowService.getRecommendations();
        setRecommendations(fetchedRecommendations as any);
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

  const isSearchPage = pathname.startsWith("/search");

  return (
    <section className="side-bar-right w-[320px] flex flex-col justify-start items-center gap-4 fixed mx-auto z-40">
      {!isSearchPage && (
        <form
          className="h-16 mt-4 flex w-full max-w-sm items-center space-x-2 "
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
      )}

      {recommendations.length > 0 && (
        <div
          className={`bg-background border border-border w-full flex flex-col rounded-xl shadow-sm p-4 ${
            isSearchPage ? "mt-6" : ""
          }`}
        >
          <h1 className="text-lg font-semibold mb-4 px-1">Recommendations</h1>

          <ul className="space-y-4 w-full">
            {recommendations.map((user: any, index: any) => (
              <Fragment key={user.id}>
                <UserCard user={user} />
                {index !== recommendations.length - 1 && <Separator />}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
