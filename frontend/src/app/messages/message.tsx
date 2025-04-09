import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import clsx from "clsx";
import { motion } from "framer-motion";

export const MessageItem = ({ message, user }: any) => {
  const isSender = message.isSender;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={clsx(
        "flex flex-col gap-1 mb-4",
        isSender ? "items-start" : "items-end"
      )}
    >
      <li className="flex gap-3 items-end">
        {isSender && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.profileImage} />
          </Avatar>
        )}

        <div
          className={clsx(
            "max-w-sm px-4 py-3 rounded-xl shadow-sm text-sm",
            isSender
              ? "bg-muted border-border rounded-bl-none"
              : "bg-primary/10 border-primary text-primary rounded-br-none"
          )}
        >
          <p className="break-words">{message.content}</p>
        </div>
      </li>

      <span className="text-xs text-muted-foreground">
        {handleDateWithMoment(message.createdAt)}
      </span>
    </motion.div>
  );
};
