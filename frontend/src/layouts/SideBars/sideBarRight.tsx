import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ActivityRecapCard } from "./activityRecapCard";
import { CommunitySpotlight } from "./communitySpotlight";
import { Recommendations } from "./recommendations";

export const SideBarRight = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (data: any) => {
    if (data.search.trim()) {
      router.push(`/search?q=${encodeURIComponent(data.search)}`);
    }
  };

  const { handleSubmit, register } = useForm<{ search: string }>({});

  const isSearchPage = pathname.startsWith("/search");

  return (
    <section className="side-bar-right w-[320px] flex flex-col justify-start items-center gap-6 fixed mx-auto z-40 p-4">
      {!isSearchPage && (
        <form
          className="h-12  mb-2 flex w-full max-w-sm items-center space-x-2 "
          onSubmit={handleSubmit(handleSearch)}
        >
          <Input
            type="search"
            placeholder="Search"
            {...register("search")}
            className="h-full bg-muted/20"
          />
          <Button type="submit" className="h-full">
            Search
          </Button>
        </form>
      )}

      <Recommendations isSearchPage={isSearchPage} />

      <CommunitySpotlight />

      <ActivityRecapCard />
    </section>
  );
};
