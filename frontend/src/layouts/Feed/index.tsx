"use client";

import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { PostReturnType } from "@/interfaces/posts.interfaces";
import { ApiError } from "@/services/config/apiError";
import { PostService } from "@/services/posts.services";
import { AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { PostComponent } from "../../components/post";
import { ContentTransition } from "../Animations/ContentTransition";
import { ItemTransitionWrapper } from "../Animations/ItemTransition";
import { FormCreatePost } from "./formCreatePost";
import { TabsFeed } from "./tabs";

type FeedTab = "forYou" | "following";

interface FeedData {
  data: PostReturnType[];
}

interface FeedState {
  selectedTab: FeedTab;
  content: Record<FeedTab, FeedData>;
}

export const Feed = () => {
  const { posts, setPosts, shouldFetchPosts, setShouldFetchPosts } =
    usePostContext();

  const [feedState, setFeedState] = useState<FeedState>({
    selectedTab: "forYou",
    content: {
      forYou: { data: [] },
      following: { data: [] },
    },
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const currentTab = feedState.selectedTab;

      try {
        const fetchedPosts =
          currentTab == "forYou"
            ? await PostService.getAll()
            : await PostService.getFollowingPosts();

        setFeedState((prev) => ({
          ...prev,
          content: {
            ...prev.content,
            [currentTab]: {
              data: fetchedPosts,
            },
          },
        }));
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error);
        }
      }
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedState.selectedTab]);

  return (
    <section className="min-w-full w-full flex flex-col justify-start">
      <div className="h-component flex  gap-4  border-b-2 items-center sticky top-0 z-20">
        <TabsFeed setFeedState={setFeedState} feedState={feedState} />
      </div>

      <FormCreatePost />

      {feedState.content[feedState.selectedTab]?.data?.length > 0 ? (
        <AnimatePresence mode="popLayout">
          <ul className="flex flex-col w-full">
            {feedState.content[feedState.selectedTab]?.data?.map(
              (e: PostReturnType) => (
                <ItemTransitionWrapper key={e.id}>
                  <PostComponent post={e} />
                </ItemTransitionWrapper>
              )
            )}
          </ul>
        </AnimatePresence>
      ) : (
        <EmptyFeedState />
      )}
    </section>
  );
};

const EmptyFeedState = () => (
  <ContentTransition>
    <div className="flex flex-col items-center justify-start pt-8 h-full text-center px-4 gap-4 w-full">
      <div className="bg-muted p-4 rounded-full">
        <Users className="w-8 h-8 text-muted-foreground" />
      </div>

      <h2 className="text-base font-semibold text-foreground">No Posts Yet</h2>
      <p className="text-sm max-w-sm text-muted-foreground">
        Follow other developers and communities to start seeing content here.
      </p>
    </div>
  </ContentTransition>
);
