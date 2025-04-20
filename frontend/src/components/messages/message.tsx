import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { motion } from "framer-motion";

export const MessageItem = ({ message, user }: any) => {
  const isSender = message.areSender;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-1 mb-4",
        isSender ? "items-end" : "items-start"
      )}
    >
      <li className="flex gap-3 items-end">
        {!isSender && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.profileImage} />
          </Avatar>
        )}

        <div
          className={cn(
            "max-w-sm px-4 py-3 rounded-xl shadow-sm text-sm",
            isSender
              ? "bg-primary/10 border-primary text-primary rounded-br-none"
              : "bg-muted border-border rounded-bl-none"
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
