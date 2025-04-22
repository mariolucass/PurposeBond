import { Users } from "lucide-react";
import { Fragment } from "react";
import { ContentTransition } from "../Animations/ContentTransition";
import { CommunityShowcase } from "./communityShowcase";

export const SelectedCommunity = ({
  currentCommunity,
}: {
  currentCommunity: any;
}) => {
  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      {currentCommunity ? (
        <>
          <div className="h-component flex px-4 border-b-2 items-center py-4 justify-between">
            <div className="ml-4 flex flex-col">
              <h1 className="text-base font-bold">{currentCommunity.name}</h1>
              <span className="text-sm text-muted-foreground">
                {currentCommunity.description}
              </span>
            </div>
          </div>

          <CommunityShowcase currentCommunity={currentCommunity} />
        </>
      ) : (
        <EmptyCurrentCommunity />
      )}
    </section>
  );
};

const EmptyCurrentCommunity = () => (
  <Fragment key="empty">
    <div className="h-component flex px-4 border-b-2 items-center py-6 justify-between">
      <div className="flex flex-col ml-4">
        <h3 className="text-base font-bold">Community</h3>

        <span className="text-sm">Select a community to see.</span>
      </div>
    </div>

    <ContentTransition>
      <div className="flex flex-col items-center justify-start pt-8 h-full text-center px-4 gap-4 w-full">
        <div className="bg-muted p-4 rounded-full">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>

        <h2 className="text-base font-semibold text-foreground">Communities</h2>
        <p className="text-sm max-w-sm text-muted-foreground">
          Select a community on the left to explore its posts, members, and
          activities.
        </p>
      </div>
    </ContentTransition>
  </Fragment>
);
