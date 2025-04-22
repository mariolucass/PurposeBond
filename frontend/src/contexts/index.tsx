import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { AuthProvider } from "./domains/AuthDomain/auth.context";
import { SettingProvider } from "./domains/AuthDomain/setting.context";
import { PostProvider } from "./domains/PostDomain/post.context";
import { FollowProvider } from "./domains/SocialDomain/follow.context";
import { MessageProvider } from "./domains/SocialDomain/message.context";
import { ModalProvider } from "./domains/UiDomain/modal.context";

export const GlobalProvider = ({ children }: ChildrenInterface) => {
  return (
    <AuthProvider>
      <FollowProvider>
        <PostProvider>
          <MessageProvider>
            <SettingProvider>
              <ModalProvider>{children}</ModalProvider>
            </SettingProvider>
          </MessageProvider>
        </PostProvider>
      </FollowProvider>
    </AuthProvider>
  );
};
