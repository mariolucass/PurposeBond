import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export const TabsCommunityPage = () => {
  const tabs = [
    {
      name: "my",
      label: "My",
      communities: [
        {
          key: "frontend",
          name: "Frontend Masters",
          description: "A space to share UI/UX, React and Tailwind ideas.",
        },
      ],
    },
    {
      name: "popular",
      label: "Popular",
      communities: [
        {
          key: "backend",
          name: "Backend Builders",
          description: "Discuss APIs, databases, architecture & performance.",
        },
        {
          key: "devops",
          name: "DevOps Minds",
          description: "Automation, infra, monitoring and pipelines.",
        },
      ],
    },
    {
      name: "recommended",
      label: "Recommended",
      communities: [
        {
          key: "ai",
          name: "AI Revolution",
          description: "Explore the rise of AI, LLMs and ML engineering.",
        },
      ],
    },
    {
      name: "explore",
      label: "Explore",
      communities: [
        {
          key: "cybersec",
          name: "Cybersecurity Watchers",
          description: "Network, vulnerabilities, ethical hacking and more.",
        },
        {
          key: "gamedev",
          name: "Game Dev Zone",
          description: "Unity, Unreal, pixel art, shaders and storytelling.",
        },
      ],
    },
  ];

  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommunities = (tabName: string) => {
    const tab = tabs.find((t) => t.name === tabName);
    return tab?.communities.filter((community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  return (
    <Tabs defaultValue="my" className="w-full">
      <TabsList className="w-full h-component bg-muted/50 flex justify-around items-center px-2 py-2 gap-2 border border-border shadow-sm rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger value={tab.name} key={tab.name} className="h-[44px]">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <Separator />

      {tabs.map((tab) => (
        <TabsContent value={tab.name} key={tab.name} className="w-full">
          <ul className="flex flex-col overflow-y-auto">
            {filteredCommunities(tab.name)?.map((community) => (
              <li
                key={community.key}
                className={cn(
                  "flex justify-between items-center gap-2 px-4 py-4 border-b-2 cursor-pointer text-sm hover:bg-muted transition-colors"
                )}
                onClick={() => setSelectedCommunity(community.key)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="font-medium">{community.name}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {community.description}
                    </span>
                  </div>
                </div>

                <ChevronRight className="text-muted-foreground" />
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
};
