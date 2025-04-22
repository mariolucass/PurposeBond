import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useMessageContext } from "@/contexts/domains/SocialDomain/message.context";
import { cn } from "@/lib/utils";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";

export const ChatCard = ({ user, message }: any) => {
  const { currentChat, setCurrentChat, setShouldFetchMessages } =
    useMessageContext();

  const handleChangeChat = () => {
    if (currentChat?.id !== user.id) {
      setCurrentChat(user);
      setShouldFetchMessages(true);
    }
  };

  return (
    <li
      onClick={handleChangeChat}
      className={cn(
        "w-full cursor-pointer border-b border-border transition-colors duration-150 hover:bg-muted px-4 py-4"
      )}
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center gap-4">
          <Avatar className="w-11 h-11">
            <AvatarImage src={user.profileImage} />
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              @{user.username}
            </span>
          </div>
        </div>

        <span className="text-xs text-muted-foreground whitespace-nowrap mt-2">
          {handleDateWithMoment(message.createdAt)}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground truncate ">
        {message.isSender ? "You" : user.username}:{" "}
        <span className="text-foreground font-medium">{message.content}</span>
      </p>
    </li>
  );
};
