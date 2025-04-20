import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const SearchForm = ({
  query,
  type,
}: {
  query: string | null;
  type: string | null;
}) => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<{ search: string | null }>({
    defaultValues: { search: query },
  });

  const handleSearch = (data: any) => {
    const searchValue = data.search?.toString().trim();

    if (searchValue) {
      const search = new URLSearchParams();
      search.set("q", searchValue);
      if (type) {
        search.set("type", type);
      }

      router.push(`/search?${search.toString()}`);
    }
  };

  return (
    <form
      className="w-full h-component flex items-center space-x-2 p-4"
      onSubmit={handleSubmit(handleSearch)}
    >
      <Input
        type="search"
        placeholder="Search"
        {...register("search")}
        className="bg-muted/20 p-3"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
