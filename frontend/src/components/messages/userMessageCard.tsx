import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";

export const UserMessageCard = ({ user, message }: any) => {
  const { setCurrentChat, setShouldFetchMessages } = useMessageContext();

  const handleChangeChat = () => {
    setShouldFetchMessages(true);
    setCurrentChat(user);
  };

  return (
    <li
      onClick={handleChangeChat}
      className="w-full px-4 py-3 cursor-pointer border-b border-border hover:bg-muted transition-colors duration-150"
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.profileImage} />
          </Avatar>

          <div>
            <h2 className="text-base font-semibold text-foreground">
              {user.name}
            </h2>
            <p className="text-muted-foreground text-sm">@{user.username}</p>
          </div>
        </div>

        <span className="text-xs text-muted-foreground">
          {handleDateWithMoment(message.createdAt)}
        </span>
      </div>

      <p className="mt-2 ml-14 text-sm text-foreground truncate max-w-[80%]">
        {message.areSender ? user.username : "You"}: {message.content}
      </p>
    </li>
  );
};
