import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";

export const Message = ({ message, user }: any) => {
  const defaultLiClass = "h-component2x flex flex-row p-4 gap-4";

  return message.areSender ? (
    <li className={`${defaultLiClass} self-end`}>
      <div className="max-w-56 py-4 px-8 flex flex-col bg-slate-500 gap-8 justify-end items-end rounded-2xl rounded-br-none border-r-4 border-b-4 border-gray-700 text-white">
        <p className="w-full">{message.content}</p>

        <span className="text-xs">
          {handleDateWithMoment(message.createdAt)}.
        </span>
      </div>
    </li>
  ) : (
    <li className={`${defaultLiClass} self-start`}>
      <div className="flex self-end">
        <Avatar className="w-[48px] h-[48px]">
          <AvatarImage src={user.profileImage} />
        </Avatar>
      </div>

      <div className="max-w-56 py-4 px-8 flex flex-col bg-slate-500 gap-8 justify-end items-end rounded-2xl rounded-bl-none border-l-4 border-b-4 border-gray-700 text-white">
        <p>{message.content}</p>

        <span className="text-xs">
          {handleDateWithMoment(message.createdAt)}.
        </span>
      </div>
    </li>
  );
};
