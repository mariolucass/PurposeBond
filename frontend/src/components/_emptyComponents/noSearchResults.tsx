interface NoSearchResultsProps {
  typeSearch: string;
  search: string;
}

export const NoSearchResults = ({
  typeSearch,
  search,
}: NoSearchResultsProps) => (
  <div className="flex flex-col gap-4 items-center justify-center">
    <h1 className="text-2xl font-bold">
      No results for "{search}" in {typeSearch} results.
    </h1>

    <p className="text-center">
      Try searching for something else, or check your Search settings to see if
      they’re protecting you from potentially sensitive content.
    </p>
  </div>
);
