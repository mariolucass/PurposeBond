import { NoSearchResults } from "@/components/_emptyComponents/noSearchResults";
import { LoadingComponent } from "@/components/loading";
import { PostComponent } from "@/components/post";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { useSearchContext } from "@/contexts/search.context";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { UserInterface } from "@/interfaces/users.interfaces";
import { getSearch } from "@/services/search.services";
import Error from "next/error";
import { Fragment, useEffect, useState } from "react";

type SearchType = "latest" | "popular" | "media" | "users";

interface SearchResultsProps {
  query: string;
  type: SearchType;
}

export const SearchResults = ({
  query,
  type = "latest",
}: SearchResultsProps) => {
  const { results, setResults } = useSearchContext();
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isUserSearch = type === "users";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const fetchedResults = await getSearch({ query, type });
        setResults((prev) => {
          return { ...prev, [type]: fetchedResults };
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    if (!results[type].length) {
      fetchResults();
    } else {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <ul className="flex flex-col gap-4 w-full p-4">
      {!results[type].length ? (
        <NoSearchResults typeSearch={type} search={query} />
      ) : (
        results[type].map((item: UserInterface | PostInterface, index) => (
          <Fragment key={item.id}>
            {isUserSearch ? (
              <UserCard user={item as UserInterface} />
            ) : (
              <PostComponent post={item as PostInterface} />
            )}

            {index < results[type].length - 1 && <Separator />}
          </Fragment>
        ))
      )}
    </ul>
  );
};
