"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

const chartConfig = {
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-1))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-2))",
  },
  reposts: {
    label: "Reposts",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const mockData = [
  { week: "Week 1", likes: 120, comments: 30, reposts: 10 },
  { week: "Week 2", likes: 200, comments: 80, reposts: 25 },
  { week: "Week 3", likes: 180, comments: 60, reposts: 20 },
  { week: "Week 4", likes: 240, comments: 90, reposts: 30 },
];

const totals = {
  posts: 42,
  likes: 670,
  comments: 215,
  reposts: 95,
};

export const OverviewCharts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>
          Summary of your performance in the last 4 weeks.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Total Posts", data: totals.posts },
            { name: "Total Likes", data: totals.likes },
            { name: "Total Comments", data: totals.comments },
            { name: "Total Reposts", data: totals.reposts },
          ].map((e) => (
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">{e.name}</span>
              <span className="text-xl font-bold">{e.data}</span>
            </div>
          ))}
        </div>

        <RenderChart />
      </CardContent>

      <CardFooter>
        <div className="flex w-full justify-between items-center text-sm">
          <div className="grid gap-1">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">Week 1 - Week 4</div>
          </div>

          <div className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-500 font-medium">
            Top 5% most liked
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const RenderChart = () => (
  <ChartContainer config={chartConfig}>
    <AreaChart
      accessibilityLayer
      data={mockData}
      margin={{ left: 12, right: 12 }}
    >
      <CartesianGrid vertical={false} />

      <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />

      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="dot" />}
      />
      <Area
        dataKey="likes"
        type="natural"
        fill="var(--color-likes)"
        fillOpacity={0.4}
        stroke="var(--color-likes)"
        stackId="a"
      />
      <Area
        dataKey="comments"
        type="natural"
        fill="var(--color-comments)"
        fillOpacity={0.4}
        stroke="var(--color-comments)"
        stackId="a"
      />
      <Area
        dataKey="reposts"
        type="natural"
        fill="var(--color-reposts)"
        fillOpacity={0.4}
        stroke="var(--color-reposts)"
        stackId="a"
      />
    </AreaChart>
  </ChartContainer>
);
