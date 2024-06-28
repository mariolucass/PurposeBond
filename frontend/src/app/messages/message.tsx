import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";

const defaultDivClass =
  "min-w-[204px] max-w-[352px] py-4 px-8 flex flex-col gap-8 justify-end items-end rounded-sm border-2 border-b-8";

const defaultLiClass = "min-w-[204px] flex flex-row p-4 gap-4";

export const MessageItem = ({ message, user }: any) => (
  <li
    className={
      message.isSender
        ? `${defaultLiClass} self-end`
        : `${defaultLiClass} self-start`
    }
  >
    {!message.isSender && (
      <div className="flex self-end">
        <Avatar className="w-[48px] h-[48px]">
          <AvatarImage src={user.profileImage} />
        </Avatar>
      </div>
    )}

    <div
      className={
        message.isSender
          ? `${defaultDivClass} border-r-8 rounded-br-none`
          : `${defaultDivClass} border-l-8 rounded-bl-none`
      }
    >
      <p className="w-full">{message.content}</p>
      <span className="text-xs">{handleDateWithMoment(message.createdAt)}</span>
    </div>
  </li>
);
