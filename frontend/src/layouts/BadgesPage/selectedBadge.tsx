"use client";

import { Medal } from "lucide-react";
import { Fragment } from "react";
import { ContentTransition } from "../Animations/ContentTransition";

type SelectedBadgeProps = {
  currentBadge?: {
    key: string;
    label: string;
  };
};

export const SelectedBadge = ({ currentBadge }: SelectedBadgeProps) => {
  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      {currentBadge ? (
        <>
          <div className="h-component flex px-4 border-b-2 items-center py-4 justify-between">
            <div className="ml-4 flex flex-col">
              <h1 className="text-base font-bold">{currentBadge.label}</h1>
              <span className="text-sm">
                View the badges you've earned in this category.
              </span>
            </div>
          </div>

          <div className="h-screenMinus176 overflow-y-auto p-4"></div>
        </>
      ) : (
        <EmptyCurrentBadge />
      )}
    </section>
  );
};

const EmptyCurrentBadge = () => (
  <Fragment key="empty">
    <div className="h-component flex px-4 border-b-2 items-center py-6 justify-between">
      <div className="flex flex-col ml-4">
        <h3 className="text-base font-bold">Achievements</h3>
        <span className="text-sm">Select a badge category to view.</span>
      </div>
    </div>

    <ContentTransition>
      <div className="flex flex-col items-center pt-8 h-full text-center px-4 gap-4">
        <div className="bg-muted p-4 rounded-full">
          <Medal className="w-8 h-8 text-muted-foreground" />
        </div>

        <h2 className="text-base font-semibold text-foreground">Badges</h2>
        <p className="text-sm max-w-sm text-muted-foreground">
          Browse categories on the left to see your unlocked and upcoming
          achievements.
        </p>
      </div>
    </ContentTransition>
  </Fragment>
);
