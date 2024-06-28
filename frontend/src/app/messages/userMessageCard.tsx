import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useMessageContext } from "@/contexts/message.context";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";

export const UserMessageCard = ({ user, message }: any) => {
  const { setCurrentChat, setShouldFetchMessages } = useMessageContext();

  const handleChangeChat = () => {
    setShouldFetchMessages(true);
    setCurrentChat(user);
  };

  return (
    <li
      className="min-h-component2x relative w-full flex flex-col p-4 gap-2 cursor-pointer border-b-2"
      onClick={handleChangeChat}
    >
      <span className="self-end absolute text-gray-500 text-sm">
        {handleDateWithMoment(message.createdAt)}
      </span>
      <div className="flex">
        <Avatar className="mr-4 w-[48px] h-[48px] ">
          <AvatarImage src={user.profileImage} />
        </Avatar>

        <div>
          <h2 className="text-lg font-semibold ">{user.name}</h2>
          <p className="text-bgmodal text-gray-500 ">@{user.username}</p>
        </div>
      </div>
      <p className="flex items-center ml-14 max-w-64 text-ellipsis text-nowrap h-12 overflow-hidden">{`${
        message.areSender ? user.username : "You"
      }: ${message.content}`}</p>
    </li>
  );
};
