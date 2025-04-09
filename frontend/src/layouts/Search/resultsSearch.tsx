import { NoSearchResults } from "@/components/_emptyComponents/noSearchResults";
import { LoadingComponent } from "@/components/common/loading";
import { PostComponent } from "@/components/post";
import { UserCard } from "@/components/userCard";
import { useSearchContext } from "@/contexts/domains/UiDomain/search.context";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { UserInterface } from "@/interfaces/users.interfaces";
import { SearchService } from "@/services/search.services";
import Error from "next/error";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchResults = () => {
  const { results, setResults } = useSearchContext();
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("q") || "";
  const currentType = (searchParams.get("type") ||
    "popular") as keyof typeof results;
  const isUserSearch = currentType === "users";

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);

      try {
        const fetchedResults = await SearchService.search({
          query: currentSearch,
          type: currentType,
        });

        setResults((prev) => ({
          ...prev,
          [currentType]: fetchedResults,
        }));
      } catch (error: any) {
        setErrorCode(500); // exemplo
      } finally {
        setIsLoading(false);
      }
    };

    if (currentSearch) {
      fetchResults();
    }
  }, [searchParams.toString()]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!results[currentType] || !results[currentType].length) {
    return <NoSearchResults typeSearch={currentType} search={currentSearch!} />;
  }

  return (
    <ul className="flex flex-col w-full">
      {results[currentType].map((item: UserInterface | PostInterface) =>
        isUserSearch ? (
          <UserCard user={item as UserInterface} key={item.id} />
        ) : (
          <PostComponent post={item as PostInterface} key={item.id} />
        )
      )}
    </ul>
  );
};
