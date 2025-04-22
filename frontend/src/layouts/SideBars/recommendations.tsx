import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { cn } from "@/lib/utils";
import { FollowService } from "@/services/follow.services";
import { Fragment, useEffect, useState } from "react";

export const Recommendations = ({ isSearchPage }: any) => {
  const [recommendations, setRecommendations] = useState([]);

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

  if (!recommendations.length) {
    return;
  }

  return (
    <div
      className={cn(
        "bg-background border border-border w-full flex flex-col rounded-xl shadow-sm p-4",
        isSearchPage && "mt-[4.4rem]"
      )}
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
  );
};
