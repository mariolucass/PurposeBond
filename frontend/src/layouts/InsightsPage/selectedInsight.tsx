"use client";

import { BarChartBig } from "lucide-react";
import { Fragment } from "react";
import { ContentTransition } from "../Animations/ContentTransition";
import { AchievementsPanel } from "./achievementsPanel";
import { EngagementCharts } from "./engagementCharts";
import { OverviewCharts } from "./overviewCharts";
import { TopPosts } from "./topPosts";

type SelectedInsightProps = {
  currentInsight?: {
    key: string;
    label: string;
  };
};

export const SelectedInsight = ({ currentInsight }: SelectedInsightProps) => {
  const renderInsightComponent = () => {
    switch (currentInsight?.key) {
      case "overview":
        return <OverviewCharts />;
      case "engagement":
        return <EngagementCharts />;
      case "topPosts":
        return <TopPosts />;
      case "badges":
        return <AchievementsPanel />;
    }
  };

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      {currentInsight ? (
        <>
          <div className="h-component flex px-4 border-b-2 items-center py-4 justify-between">
            <div className="ml-4 flex flex-col">
              <h1 className="text-base font-bold">{currentInsight.label}</h1>
              <span className="text-sm">
                View your data and performance in this category.
              </span>
            </div>
          </div>

          <div className="h-screenMinus176 overflow-y-auto p-4">
            {renderInsightComponent()}
          </div>
        </>
      ) : (
        <EmptyCurrentInsight />
      )}
    </section>
  );
};

const EmptyCurrentInsight = () => (
  <Fragment key="empty">
    <div className="h-component flex px-4 border-b-2 items-center py-6 justify-between">
      <div className="flex flex-col ml-4">
        <h3 className="text-base font-bold">Insight</h3>

        <span className="text-sm">Select a insight to see.</span>
      </div>
    </div>

    <ContentTransition>
      <div className="flex flex-col items-center pt-8 h-full text-center px-4 gap-4">
        <div className="bg-muted p-4 rounded-full">
          <BarChartBig className="w-8 h-8 text-muted-foreground" />
        </div>

        <h2 className="text-base font-semibold text-foreground">Insights</h2>
        <p className="text-sm max-w-sm text-muted-foreground">
          Select a metric on the left to explore your account's performance.
        </p>
      </div>
    </ContentTransition>
  </Fragment>
);
