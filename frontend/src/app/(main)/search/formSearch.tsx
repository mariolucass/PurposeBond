import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchContext } from "@/contexts/search.context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const SearchForm = ({ query }: { query: string | null }) => {
  const router = useRouter();

  const { setCurrentSearch, currentSearch } = useSearchContext();

  const { handleSubmit, register } = useForm<{ search: string | null }>({
    defaultValues: { search: query },
  });

  const handleSearch = (data: any) => {
    if (data.search.trim()) {
      router.push(`/search?q=${encodeURIComponent(data.search)}`);
    }

    setCurrentSearch(data.search);
  };

  console.log(currentSearch);

  return (
    <form
      className="w-full h-component flex items-center space-x-2 p-4"
      onSubmit={handleSubmit(handleSearch)}
    >
      <Input type="search" placeholder="Search" {...register("search")} />
      <Button type="submit">Search</Button>
    </form>
  );
};
