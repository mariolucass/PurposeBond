import { LoadingComponent } from "@/components/loading";
import { useSearchContext } from "@/contexts/search.context";
import Error from "next/error";
import { useState } from "react";

export const SearchResults = () => {
  const { results, setResults } = useSearchContext();
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { currentSearch, currentType } = useSearchContext();

  const isUserSearch = currentType === "users";

  // useEffect(() => {
  //   const fetchResults = async () => {
  //     try {
  //       const fetchedResults = await getSearch({
  //         query: currentSearch!,
  //         type: currentType!,
  //       });

  //       setResults((prev) => {
  //         return { ...prev, [currentType!]: fetchedResults };
  //       });
  //     } catch (error) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (!results[currentType!].length) {
  //     fetchResults();
  //   } else {
  //     setIsLoading(false);
  //   }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // });

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  console.log(currentType, "TYPE");
  console.log(currentSearch, "Search");

  // if (!results[currentType!].length) {
  //   return (
  //     <NoSearchResults typeSearch={currentType!} search={currentSearch!} />
  //   );
  // }

  // return (
  //   <ul className="flex flex-col w-full">
  //     {results[currentType!].map((item: UserInterface | PostInterface) =>
  //       isUserSearch ? (
  //         <UserCard user={item as UserInterface} key={item.id} />
  //       ) : (
  //         <PostComponent post={item as PostInterface} key={item.id} />
  //       )
  //     )}
  //   </ul>
  // );
};
