import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";

export const ActivityRecapCard = () => {
  return (
    <div className="bg-background border border-border w-full flex flex-col rounded-xl shadow-sm p-4">
      <h1 className="text-lg font-semibold mb-4 px-1 flex items-center gap-2">
        <LineChart className="w-5 h-5 text-muted-foreground" />
        Your Highlights
      </h1>

      <ul className="text-sm space-y-2 text-muted-foreground">
        <li>📈 3 new followers this week</li>
        <li>❤️ 12 likes on your last post</li>
        <li>🔁 Top 10% in reposts this week</li>
      </ul>

      <Button
        variant="ghost"
        size="sm"
        className="mt-4 self-start px-0 text-sm text-primary"
      >
        View Insights →
      </Button>
    </div>
  );
};
