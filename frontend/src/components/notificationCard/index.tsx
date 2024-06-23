import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";

interface NotificationProps {
  notification: any;
}

const notificationTitles = {
  NEW_FOLLOWER: "followed you.",
  POST_LIKED: "liked your post.",
  POST_REPOSTED: "reposted your post.",
  POST_COMMENTED: "commented on your post.",
};
type NotificationType = keyof typeof notificationTitles;

export const NotificationCard = ({ notification }: NotificationProps) => {
  const router = useRouter();

  const NotificationTitle = () => {
    const notificationType = notification.type as NotificationType;

    return (
      <h1>
        <span className="font-semibold">@{notification.author.username}</span>{" "}
        has {notificationTitles[notificationType] || "interacted with you."}
      </h1>
    );
  };

  const AvatarGroup = () => {
    return [{}, {}, notification.author].map((elem, index) => (
      <Avatar className="w-[48px] h-[48px]" key={index}>
        <AvatarImage
          src={
            elem.profileImage
              ? elem.profileImage
              : "https://static-00.iconduck.com/assets.00/profile-default-icon-512x511-v4sw4m29.png"
          }
        />
      </Avatar>
    ));
  };

  const handleNotificationClick = () => {
    const notificationType = notification.type as NotificationType;
    const notificationIsOnPost =
      notificationTitles[notificationType] !== "followed you.";

    if (notificationIsOnPost) {
      router.push(`/posts/${notification.postId}`);
    }
  };

  return (
    <li
      className="w-full flex p-4 justify-around shadow-lg rounded-xl cursor-pointer"
      onClick={handleNotificationClick}
    >
      <div className="w-1/3 flex items-center -space-x-8 ">
        <AvatarGroup />
      </div>

      <div className="w-2/3 flex flex-col gap-2 ">
        <NotificationTitle />

        <span className="seld-end">Check it now!</span>

        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
          <span className="text-xs text-muted-foreground">
            {handleDateWithMoment(notification.createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
};
