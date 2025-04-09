import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { AuthProvider } from "./domains/AuthDomain/auth.context";
import { SettingProvider } from "./domains/AuthDomain/setting.context";
import { UserProvider } from "./domains/AuthDomain/user.context";
import { CommentProvider } from "./domains/PostDomain/comment.context";
import { LikeProvider } from "./domains/PostDomain/like.context";
import { PostProvider } from "./domains/PostDomain/post.context";
import { FollowProvider } from "./domains/SocialDomain/follow.context";
import { MessageProvider } from "./domains/SocialDomain/message.context";
import { ModalProvider } from "./domains/UiDomain/modal.context";
import { SearchProvider } from "./domains/UiDomain/search.context";

export const GlobalProvider = ({ children }: ChildrenInterface) => {
  return (
    <AuthProvider>
      <UserProvider>
        <FollowProvider>
          <PostProvider>
            <CommentProvider>
              <LikeProvider>
                <MessageProvider>
                  <SearchProvider>
                    <SettingProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </SettingProvider>
                  </SearchProvider>
                </MessageProvider>
              </LikeProvider>
            </CommentProvider>
          </PostProvider>
        </FollowProvider>
      </UserProvider>
    </AuthProvider>
  );
};
