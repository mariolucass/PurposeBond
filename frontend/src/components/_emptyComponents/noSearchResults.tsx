import { SearchX } from "lucide-react"; // ícone elegante e leve

interface NoSearchResultsProps {
  typeSearch: string;
  search: string;
}

export const NoSearchResults = ({
  typeSearch,
  search,
}: NoSearchResultsProps) => (
  <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center gap-4">
    <div className="bg-muted p-4 rounded-full">
      <SearchX className="w-8 h-8 text-muted-foreground" />
    </div>

    <h1 className="text-xl md:text-2xl font-semibold text-foreground">
      Hmm… we couldn’t find anything for{" "}
      <span className="text-primary">"{search}"</span> in{" "}
      <span className="capitalize">{typeSearch}</span>.
    </h1>

    <p className="max-w-md text-sm md:text-base text-muted-foreground">
      Try something else, or check your search filters — they might be hiding
      some content.
    </p>
  </div>
);
